import { Hono } from "hono";
import { prismaClient } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleware, async (context) => {
  const userId = context.get("userId");

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    return context.json(user, 200);
  } else {
    return context.json(
      {
        message: "Missing /me User",
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