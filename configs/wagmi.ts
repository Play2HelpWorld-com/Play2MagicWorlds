import { http, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [bsc],
  connectors: [metaMask()],
  transports: {
    [bsc.id]: http(),
  },
});
