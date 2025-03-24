import { sign } from "crypto";
import { signUpWithUsernameAndPassword } from "../controller/authentication";
import { SignUpWithUsernameAndPasswordError } from "../controller/authentication/+type";
import { Hono } from "hono";

export const hono = new Hono();
hono.post("/authentication/signup", async (context) => {
    const{ username,password} = await context.req.json();
    try {
    const result= await signUpWithUsernameAndPassword({
        username,
        password});
        return context.json({
            data: result,
        },
        201);
    }
    catch (e) {
        if (e === SignUpWithUsernameAndPasswordError.UNKNOWN) {
            return context.json({
                message: "Unknown error",
            }, 500);
        }

    }


});

hono.get("/health", (context) => {
  return context.json(
    {
      message: "All Ok",
    },
    200
  );
});