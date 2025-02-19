import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "ADMIN" | "USER";
    };
  }

  interface User {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
  }
}
