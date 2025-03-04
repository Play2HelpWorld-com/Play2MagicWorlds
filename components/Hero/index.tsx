"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wallet2,
  ArrowRight,
  Info,
  RefreshCw,
  CheckCircle2,
  XCircle,
  User,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { bsc } from "viem/chains";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import { truncateAddress } from "../../utils/lib/truncateAddress";
import { RegenerateMerkleTree } from "@/utils/lib/generateMerkleDataStructure";
import TokenDistributorAbi from "@/abi/TokenDistributor.json";
import { ethers, keccak256 } from "ethers";
import axios from "axios";
import { toast } from "sonner";

const contractAddress =
  process.env.NEXT_PUBLIC_TOKEN_DISTRIBUTOR_ADDRESS || "0x";

interface ClaimData {
  walletAddress: string;
  tokenType: string;
  amount: number;
  tokenAddress: string;
}

type ModalStep = "input" | "summary" | "claiming" | "status";
type StatusType = "success" | "error" | "pending" | null;

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userTag, setUserTag] = useState("");
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [modalStep, setModalStep] = useState<ModalStep>("input");
  const [claimArgs, setClaimArgs] = useState<
    readonly [string, bigint, `0x${string}`[]] | undefined
  >(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<StatusType>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState<any>(null);

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);

  const {
    writeContract,
    isPending,
    isError,
    isSuccess,
    data: hash,
  } = useWriteContract();

  // Monitor transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash as `0x${string}`,
      // enabled: !!hash,
    });

  // Contract simulation
  const { error: simulateError } = useSimulateContract(
    claimArgs
      ? {
          address: contractAddress as `0x${string}`,
          abi: TokenDistributorAbi,
          functionName: "claimTokens",
          args: claimArgs,
        }
      : undefined,
  );

  // Watch transaction status
  useEffect(() => {
    if (isPending || isConfirming) {
      setStatus("pending");
      setModalStep("status");
    } else if (isConfirmed) {
      const updateTokenStatus = async () => {
        try {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens`,
            {
              user_tag: userTag,
              wallet_address: address,
              token_type: claimData?.tokenType,
              token_address: claimData?.tokenAddress,
            },
          );
        } catch (error) {
          console.error("Failed to update token status:", error);
        }
      };
      updateTokenStatus();
      setStatus("success");
      setModalStep("status");
    } else if (isError) {
      setStatus("error");
      setErrorMessage("Transaction failed. Please try again.");
      setModalStep("status");
    }
  }, [
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    claimData,
    userTag,
    address,
  ]);

  useEffect(() => {
    if (isConnected && address && claimData) {
      // Check if connected wallet matches registered address
      if (address.toLowerCase() !== claimData.walletAddress.toLowerCase()) {
        setStatus("error");
        setErrorMessage(
          "Connected wallet address doesn't match your registered address",
        );
        setModalStep("status");
        disconnect();
        return;
      }
      // If addresses match, stay on summary step
      setModalStep("summary");
    }
  }, [isConnected, address, claimData, disconnect]);

  useEffect(() => {
    if (isConnected && chainId !== bsc.id) {
      setStatus("error");
      setErrorMessage("Please switch to BSC network to continue");
      setModalStep("status");
      disconnect();
    }
  }, [chainId, isConnected, disconnect]);

  useEffect(() => {
    if (simulateError) {
      setStatus("error");
      setErrorMessage(`Transaction would fail: ${simulateError.message}`);
      setModalStep("status");
    }
  }, [simulateError]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalStep("input");
    setClaimData(null);
    setUserTag("");
    setClaimArgs(undefined);
    setIsProcessing(false);
    setStatus(null);
    setErrorMessage("");
    setTransactionHash(null);
    disconnect();
  };

  const handleRetry = () => {
    setModalStep("input");
    setStatus(null);
    setErrorMessage("");
    setClaimArgs(undefined);
    setTransactionHash(null);
  };

  const fetchClaimData = async (tag: string) => {
    setIsProcessing(true);
    try {
      const queryParams = new URLSearchParams({ user_tag: tag }).toString();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens?${queryParams}`,
      );

      if (!response.data?.data?.length) {
        throw new Error("User tag not found");
      }

      const userData = response.data.data[0];
      setClaimData({
        walletAddress: userData.wallet_address,
        tokenType: userData.token_type,
        amount: userData.amount,
        tokenAddress: userData.token_address,
      });
      setModalStep("summary");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to fetch claim data");
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      setStatus("error");
      setErrorMessage("Please install MetaMask to continue");
      setModalStep("status");
      return;
    }

    try {
      setIsSwitchingNetwork(true);
      // First connect the wallet
      await connect({ connector: metaMask() });

      // Add a small delay to ensure chainId is updated
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if we're on BSC
      if (chainId !== bsc.id) {
        try {
          // First try to switch to BSC
          await switchChain({ chainId: bsc.id });

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Verify the switch was successful
          const newChainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          const currentChainId = parseInt(newChainId, 16);

          if (currentChainId !== bsc.id) {
            throw new Error("Failed to switch to BSC");
          }
        } catch (switchError: any) {
          console.error("Switch error:", switchError);

          if (switchError.message.includes("rejected")) {
            setStatus("error");
            setErrorMessage("Please switch to BSC network to continue");
            setModalStep("status");
            disconnect();
            return;
          }

          // If switch failed, try to add the network

          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${bsc.id.toString(16)}`,
                  chainName: "BNB Smart Chain",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com"],
                },
              ],
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Check if we're now on BSC
            const finalChainId = await window.ethereum.request({
              method: "eth_chainId",
            });
            if (parseInt(finalChainId, 16) !== bsc.id) {
              throw new Error("Network switch failed after adding BSC");
            }
          } catch (addError: any) {
            console.error("Add network error:", addError);
            setStatus("error");
            setErrorMessage(
              addError.message ||
                "Failed to add BSC network. Please add it manually to your wallet",
            );
            setModalStep("status");
            disconnect();
            return;
          }
        }
      }

      // If we made it here, we're connected to BSC

      setIsSwitchingNetwork(false);
    } catch (error: any) {
      console.error("Connection error:", error);
      setIsSwitchingNetwork(false);
      if (error.message.includes("rejected")) {
        setStatus("error");
        setErrorMessage("Wallet connection rejected");
        setModalStep("status");
      } else {
        setStatus("error");
        setErrorMessage(error.message || "Failed to connect wallet");
        setModalStep("status");
      }
    }
  };

  // Add an effect to monitor chain changes
  useEffect(() => {
    if (isConnected && !isSwitchingNetwork && chainId !== bsc.id) {
      setStatus("error");
      setErrorMessage("Please switch to BSC network to continue");
      setModalStep("status");
      disconnect();
    }
  }, [chainId, isConnected, isSwitchingNetwork, disconnect]);
  const prepareClaim = async () => {
    if (!claimData || !address) return;
    setIsProcessing(true);

    try {
      const leaf = keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ["address", "address", "uint256"],
          [
            address.toLowerCase(),
            claimData.tokenAddress,
            ethers.parseUnits(claimData.amount.toString(), 5),
          ],
        ),
      );

      const merkelDataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens/merkle-leaves`,
      );
      const merkelData = await merkelDataResponse.json();

      if (!merkelData.data) {
        throw new Error("Failed to fetch merkle data");
      }

      const { merkleTree } = RegenerateMerkleTree(
        merkelData.data.serialized_leaves,
      );
      const proof = merkleTree.getHexProof(leaf);

      const args = [
        claimData.tokenAddress,
        ethers.parseUnits(claimData.amount.toString(), 5),
        proof as `0x${string}`[],
      ] as const;

      setClaimArgs(args);
      setModalStep("claiming");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to prepare claim");
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  const executeClaim = async () => {
    if (!claimArgs) return;
    setIsProcessing(true);

    try {
      const result = await writeContract({
        address: contractAddress as `0x${string}`,
        abi: TokenDistributorAbi,
        functionName: "claimTokens",
        args: claimArgs,
      });

      setTransactionHash(result);
      setModalStep("status");
      setStatus("pending");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message.includes("rejected")
          ? "Transaction rejected by user"
          : "Failed to execute claim transaction",
      );
      setModalStep("status");
    } finally {
      setIsProcessing(false);
    }
  };

  // const simulateSuccessfulClaim = async () => {
  //   try {
  //     setIsProcessing(true);
  //     setStatus("pending");
  //     setModalStep("status");

  //     // Simulate processing time
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Mock transaction hash
  //     const mockTxHash =
  //       "0x" +
  //       Array(64)
  //         .fill("0123456789ABCDEF"[Math.floor(Math.random() * 16)])
  //         .join("");
  //     setTransactionHash(mockTxHash);

  //     // Simulate transaction confirmation
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Call the update API
  //     if (claimData && address) {
  //       try {
  //         const response = await axios.patch(
  //           `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/game-tokens`,
  //           {
  //             user_tag: userTag,
  //             wallet_address: address,
  //             token_type: claimData.tokenType,
  //             token_address: claimData.tokenAddress,
  //           },
  //         );
  //         console.log("API update response:", response.data);
  //       } catch (error) {
  //         console.error("Failed to update token status:", error);
  //       }
  //     }

  //     // Set success state
  //     setStatus("success");
  //   } catch (error) {
  //     console.error("Simulation error:", error);
  //     setStatus("error");
  //     setErrorMessage("Simulation failed");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const renderStatusStep = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-16 w-16 animate-spin text-meta" />
            <h3 className="mt-4 text-2xl font-bold text-black dark:text-white">
              Processing Transaction
            </h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
              Please wait while your transaction is being processed...
            </p>
            {transactionHash && (
              <p className="mt-4 text-sm text-gray-500">
                Transaction Hash: {truncateAddress(transactionHash, 8, 8)}
              </p>
            )}
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="mt-4 text-2xl font-bold text-green-500">Success!</h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
              Your tokens have been successfully claimed.
            </p>
            {transactionHash && (
              <p className="mt-4 text-sm text-gray-500">
                Transaction Hash: {truncateAddress(transactionHash, 8, 8)}
              </p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-6 rounded-lg bg-meta px-6 py-2 text-white hover:bg-opacity-90"
            >
              Close
            </button>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <XCircle className="h-16 w-16 text-red-500" />
            <h3 className="mt-4 text-2xl font-bold text-red-500">Error</h3>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
              {errorMessage}
            </p>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 rounded-lg bg-meta px-6 py-2 text-white hover:bg-opacity-90"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </button>
              <button
                onClick={handleCloseModal}
                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case "input":
        return (
          <div className="py-8">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                Claim Your Tokens
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your user tag to start the claim process
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (userTag.trim()) fetchClaimData(userTag);
              }}
            >
              <div className="mb-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    value={userTag}
                    onChange={(e) => setUserTag(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-black focus:border-meta focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your user tag"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-lg bg-meta py-4 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        );

      case "summary":
        return claimData ? (
          <div className="py-8">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                Claim Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review your claim details and connect your wallet
              </p>
            </div>

            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Token Type
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    {claimData.tokenType}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Token Address
                  </span>
                  <span className="font-mono font-bold text-black dark:text-white">
                    {truncateAddress(claimData.tokenAddress, 5, 8)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Amount
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    {claimData.amount} Tokens
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Registered Address
                  </span>
                  <span className="font-mono font-bold text-black dark:text-white">
                    {truncateAddress(claimData.walletAddress, 5, 8)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-yellow-700 dark:text-yellow-500" />
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Please ensure you connect with your registered wallet address
                </p>
              </div>
            </div>

            {isConnected ? (
              <button
                onClick={prepareClaim}
                disabled={isProcessing}
                className="w-full rounded-lg bg-meta py-4 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Preparing Claim...
                  </span>
                ) : (
                  "Proceed with Claim"
                )}
              </button>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-meta py-4 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
              >
                <Wallet2 className="h-5 w-5" />
                Connect Wallet
              </button>
            )}
          </div>
        ) : null;

      case "claiming":
        return claimData ? (
          <div className="py-8">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                Confirm Claim
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review and confirm your claim transaction
              </p>
            </div>

            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Connected Wallet
                  </span>
                  <span className="font-mono font-bold text-black dark:text-white">
                    {truncateAddress(address || "", 5, 8)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Amount to Claim
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    {claimData.amount} Tokens
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={executeClaim}
                disabled={isProcessing || !claimArgs}
                className="w-full rounded-lg bg-meta py-4 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Processing Transaction...
                  </span>
                ) : (
                  "Confirm Transaction"
                )}
              </button>
              {/* {process.env.NODE_ENV === "development" && (
                <button
                  onClick={simulateSuccessfulClaim}
                  className="w-full rounded-lg border border-meta py-4 font-medium text-meta hover:bg-meta/10"
                >
                  Simulate Successful Claim
                </button>
              )} */}
            </div>
          </div>
        ) : null;

      case "status":
        return renderStatusStep();
    }
  };

  //simulate the transaction before sending it to the blockchain
  //this is to check if the transaction would fail
  //if claimArgs is not defined, then don't simulate

  useEffect(() => {
    const updateClaimedTokens = async () => {
      if (isSuccess) {
        //update the table here after a succesful claim
        //amount_claimed: increment by the number of tokens claimed
        //display claimable tokens =.> amount - token_claimed
        try {
        } catch (error) {
          console.error(
            "Error while updating claimed tokens at score.tsx",
            error,
          );
        }
      }
    };
    updateClaimedTokens();
  }, [hash, isSuccess]);

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                🔥 Play2MagicWorld - A Complete Gaming Experience
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Free Gaming Platform
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  &nbsp;
                </span>
              </h1>
              <p>
                Play2MagicWorld is a free gaming platform where users can play
                games to earn coupons. These coupons can be converted into real
                money, which users can either withdraw or donate to charitable
                organizations, blending entertainment with a meaningful cause.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
                >
                  Claim Tokens
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="mt-5 text-black dark:text-white">
                  Free to play. No credit card required.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/banner.jpg"
                    alt="Hero"
                    width={1200}
                    height={1244}
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/banner.jpg"
                    alt="Hero"
                    width={1200}
                    height={1244}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
          >
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {renderModalContent()}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Hero;
