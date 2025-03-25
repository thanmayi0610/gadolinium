// import { sign } from "crypto";
// import { logInWithUsernameAndPassword, signUpWithUsernameAndPassword, ogInWtihUsernameAndPasswordError } from "../controller/authentication";
// import { SignUpWithUsernameAndPasswordError } from "../controller/authentication/+type";
// import { Hono } from "hono";

// export const hono = new Hono();
// hono.post("/authentication/signup", async (context) => {
//     const{ username,password} = await context.req.json();
//     try {
//     const result= await signUpWithUsernameAndPassword({
//         username,
//         password});
//         return context.json({
//             data: result,
//         },
//         201);
//     }
//     catch (e) {
//         if (e === SignUpWithUsernameAndPasswordError.UNKNOWN) {
//             return context.json({
//                 message: "Unknown error",
//             }, 500);
//         }

//     }


// });
// hono.post("/authentication/signin", async (context) => {
//   try{
//  const { username, password } = await context.req.json();
//   const result = await logInWithUsernameAndPassword({
//       username,
//       password,
//     });
//     return context.json({
//       data: result,
//     }, 201);
//   }catch(e){
//     // if (e === LogInWithUsernameAndPasswordError.UNKNOWN) {
//     //   return context.json({
//     //     message: "Unknown error",
//     //   }, 500);
//     // }
//     if (e === LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD) {
//       return context.json({
//         message: "Incorrect username or password",
//       }, 401);
//     }
//     return context.json({
//       message: "Unknown error",
//     }, 500);
//   }
// });
// hono.get("/health", (context) => {
//   return context.json(
//     {
//       message: "All Ok",
//     },
//     200
//   );
// });

import { Hono } from "hono";
import { logInWithUsernameAndPassword, signUpWithUsernameAndPassword } from "../controller/authentication";
import {
  LogInWtihUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
} from "../controller/authentication/+type";

export const hono = new Hono();

hono.post("/authentication/sign-up", async (context) => {
  const { username, password } = await context.req.json();

  try {
    const result = await signUpWithUsernameAndPassword({
      username,
      password,
    });

    return context.json(
      {
        data: result,
      },
      201
    );
  } catch (e) {
    if (e === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
      return context.json(
        {
          message: "Username already exists",
        },
        409
      );
    }

    return context.json(
      {
        mesage: "Unknown",
      },
      500
    );
  }
});

hono.post("/authentication/log-in", async (context) => {
  try {
    const { username, password } = await context.req.json();

    const result = await logInWithUsernameAndPassword({
      username,
      password,
    });

    return context.json(
      {
        data: result,
      },
      201
    );
  } catch (e) {
    if (e === LogInWtihUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD) {
      return context.json(
        {
          message: "Incorrect username or password",
        },
        401
      );
    }

    return context.json(
      {
        message: "Unknown",
      },
      500
    );
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