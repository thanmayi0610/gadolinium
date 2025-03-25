import {Hono } from "hono";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { prismaClient } from "../extras/prisma";

export const userRoutes = new Hono();

userRoutes.get("/", async (context, next) => {
    const token = context.req.header("token");
    if (!token) {
      return context.json({ error: "Unauthorized" }, 401);
    }  try {
      const verified = jwt.verify(token, jwtSecretKey);
      if (!verified) {
        return context.json({ error: "Invalid Token" }, 401);
      }
      await next();
    } catch (err) {
      return context.json({ error: "Invalid Token" }, 401);
    }}, async (c) => {
    const users = await prismaClient.user.findMany();
    return c.json(users, 200);
  });