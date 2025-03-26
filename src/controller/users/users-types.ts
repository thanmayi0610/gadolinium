import type { User } from "@prisma/client";

export type GetMeResult = {
  user: User;
};

export enum GetMeError {
  BAD_REQUEST,
}

export enum GetUsersError {
  NO_USERS_FOUND = "No users found",
}

export type GetAllUsersResult = {
  users: Array<User>; // Ensure `User` type is correctly imported
};

