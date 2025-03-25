// // // import { sign } from "crypto";
// // // import { logInWithUsernameAndPassword, signUpWithUsernameAndPassword, ogInWtihUsernameAndPasswordError } from "../controller/authentication";
// // // import { SignUpWithUsernameAndPasswordError } from "../controller/authentication/+type";
// // // import { Hono } from "hono";

// // // export const hono = new Hono();
// // // hono.post("/authentication/signup", async (context) => {
// // //     const{ username,password} = await context.req.json();
// // //     try {
// // //     const result= await signUpWithUsernameAndPassword({
// // //         username,
// // //         password});
// // //         return context.json({
// // //             data: result,
// // //         },
// // //         201);
// // //     }
// // //     catch (e) {
// // //         if (e === SignUpWithUsernameAndPasswordError.UNKNOWN) {
// // //             return context.json({
// // //                 message: "Unknown error",
// // //             }, 500);
// // //         }

// // //     }


// // // });
// // // hono.post("/authentication/signin", async (context) => {
// // //   try{
// // //  const { username, password } = await context.req.json();
// // //   const result = await logInWithUsernameAndPassword({
// // //       username,
// // //       password,
// // //     });
// // //     return context.json({
// // //       data: result,
// // //     }, 201);
// // //   }catch(e){
// // //     // if (e === LogInWithUsernameAndPasswordError.UNKNOWN) {
// // //     //   return context.json({
// // //     //     message: "Unknown error",
// // //     //   }, 500);
// // //     // }
// // //     if (e === LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD) {
// // //       return context.json({
// // //         message: "Incorrect username or password",
// // //       }, 401);
// // //     }
// // //     return context.json({
// // //       message: "Unknown error",
// // //     }, 500);
// // //   }
// // // });
// // // hono.get("/health", (context) => {
// // //   return context.json(
// // //     {
// // //       message: "All Ok",
// // //     },
// // //     200
// // //   );
// // // });

// // import { Hono } from "hono";
// // import { logInWithUsernameAndPassword, signUpWithUsernameAndPassword } from "../controller/authentication";
// // import {
// //   LogInWtihUsernameAndPasswordError,
// //   SignUpWithUsernameAndPasswordError,
// // } from "../controller/authentication/+type";

// // export const hono = new Hono();

// // hono.post("/authentication/sign-up", async (context) => {
// //   const { username, password } = await context.req.json();

// //   try {
// //     const result = await signUpWithUsernameAndPassword({
// //       username,
// //       password,
// //     });

// //     return context.json(
// //       {
// //         data: result,
// //       },
// //       201
// //     );
// //   } catch (e) {
// //     if (e === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
// //       return context.json(
// //         {
// //           message: "Username already exists",
// //         },
// //         409
// //       );
// //     }

// //     return context.json(
// //       {
// //         mesage: "Unknown",
// //       },
// //       500
// //     );
// //   }
// // });

// // allR.post("/authentication/log-in", async (context) => {
// //   try {
// //     const { username, password } = await context.req.json();

// //     const result = await logInWithUsernameAndPassword({
// //       username,
// //       password,
// //     });

// //     return context.json(
// //       {
// //         data: result,
// //       },
// //       201
// //     );
// //   } catch (e) {
// //     if (e === LogInWtihUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD) {
// //       return context.json(
// //         {
// //           message: "Incorrect username or password",
// //         },
// //         401
// //       );
// //     }

// //     return context.json(
// //       {
// //         message: "Unknown",
// //       },
// //       500
// //     );
// //   }
// // });

// // hono.get("/health", (context) => {
// //   return context.json(
// //     {
// //       message: "All Ok",
// //     },
// //     200
// //   );
// // });

// import { Hono } from "hono";
// import { authenticationRoutes } from "./authentication-routes";
// import { prismaClient } from "../extras/prisma";

// export const allRoutes = new Hono();
// allRoutes.use(async (context, next) => {
//   console.log("HTTP Method: ", context.req.method);
//   console.log("HTTP URL: ", context.req.url);
//   console.log("HTTP Headers: ", context.req.header());
//   await next();
// }
// );

// authenticationRoutes.get("/users", async(c) => {
//   const user=  await prismaClient.user.findMany()
//   return c.json({data:user},200)
  
// })

// allRoutes.route("/authentication", authenticationRoutes);

// // allRoutes.get("/health", (context) => {
// //   return context.json(
// //     {
// //       message: "All Ok",
// //     },
// //     200
// //   );
// // });


// allRoutes.get("/health", async (context,next) => {
//   console.log("HTTP Method: context.req.method");
//   console.log("HTTP URL: context.req.url");
//   //console.log("Checking health");
//  const authorization = context.req.header("Authorization");
//   if (!authorization) {
//     return context.json(
//       {
//         message: "Unauthorized",
//       },
//       401
//     );
//   }
//   await next();
// },
// (context) => {
//   console.log("Health check done");
//   return context.json(
//     {
//       message: "All Ok",
//     },
//     200
//   );
// });
import { Hono } from "hono";
import {
  LogInWtihUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
} from "../controller/authentication/+type";
import { auth } from "hono/utils/basic-auth";
import { authenticationRoutes } from "./authentication-routes";
export const allRoutes = new Hono();
import { prismaClient } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
allRoutes.use(async (context, next) => {
console.log("HTTP Method ", context.req.method);
console.log("URL ", context.req.url);
console.log("Headers ", context.req.header());
await next()
});
allRoutes.route("/authentication", authenticationRoutes);
allRoutes.get("/health", async (c) => {
  console.log("Health checked");  return c.json({ status: "ok" });
});
allRoutes.get("/users", async (context, next) => {
  const token = context.req.header("token");
  if (!token) {
    return context.json({ error: "Unauthorized" }, 401);
  }  try {
    const verified = jwt.verify(token, jwtSecretKey);
    await next();
  } catch (err) {
    return context.json({ error: "Invalid Token" }, 401);
  }}, async (c) => {
  const users = await prismaClient.user.findMany();
  return c.json(users, 200);
});









