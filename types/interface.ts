import { useRouter } from "next/navigation";

export enum UserRole {
  buyer = "buyer",
  freelancer = "freelancer",
  administrator = "administrator",
  itAdmin = "itAdmin",
  engineeringAdmin = "engineeringAdmin",
  managementAdmin = "managementAdmin",
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string | null;
  role: UserRole;
  isVerified?: boolean;
}

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {
  customMethod: () => void;
}
