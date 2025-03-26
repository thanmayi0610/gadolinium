import { prismaClient } from "../../extras/prisma";
import { GetMeError, type GetMeResult } from "./users-types";
import { GetUsersError, type GetAllUsersResult  } from "./users-types";

export const getMe = async (parameters: { userId: string }): Promise<GetMeResult> => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: parameters.userId,
    },
  });

  if (!user) {
    throw GetMeError.BAD_REQUEST;
  }

  return {
    user,
  };
};
export const getAllUsers = async (): Promise<GetAllUsersResult> => {
  const users = await prismaClient.user.findMany();

  if (!users || users.length === 0) {
    throw new Error(GetUsersError.NO_USERS_FOUND);
  }

  return { users };
};

