export type UserRole = "admin" | "user" | "guest" | "all" | "All";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  claimTitle?: string;
  role: UserRole;
  image?: string;
  date?: string;
  location?: string;
}
