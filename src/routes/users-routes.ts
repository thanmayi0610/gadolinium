import { Hono } from "hono";
import { prismaClient } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { getMe } from "../controller/users/users-controller";
import { GetMeError } from "../controller/users/users-types";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleware, async (context) => {
  const userId = context.get("userId");

  try {
    const user = await getMe({
      userId,
    });

    return context.json(
      {
        data: user,
      },
      200
    );
  } catch (e) {
    if (e === GetMeError.BAD_REQUEST) {
      return context.json(
        {
          error: "User not found",
        },
        400
      );
    }

    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});

usersRoutes.get("/all", tokenMiddleware, async (context) => {
  const users = await prismaClient.user.findMany();
if (users) {
  return context.json(users, 200);
} else {
  return context.json(
    {
      message: "Missing Users",
    },
    404
  );
}
});




usersRoutes.get("", tokenMiddleware, async (context) => {
  const users = await prismaClient.user.findMany();

  return context.json(users, 200);
});

// userRoutes.get("/", async (context, next) => {
//     const token = context.req.header("token");
//     if (!token) {
//       return context.json({ error: "Unauthorized" }, 401);
//     }  try {
//       const verified = jwt.verify(token, jwtSecretKey);
//       if (!verified) {
//         return context.json({ error: "Invalid Token" }, 401);
//       }
//       await next();
//     } catch (err) {
//       return context.json({ error: "Invalid Token" }, 401);
//     }}, async (c) => {
//     const users = await prismaClient.user.findMany();
//     return c.json(users, 200);
//   });