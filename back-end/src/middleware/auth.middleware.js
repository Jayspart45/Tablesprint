// import jwt from "jsonwebtoken";

// import { ApiError } from "../utils/ApiError.js";

// import { asyncHandler } from "../utils/asyncHandler.js";

// import { promisify } from "util";

// const verifyToken = promisify(jwt.verify);

// const verifyJWT = asyncHandler(async (req, res, next) => {
//   const token =
//     req.cookies?.accessToken ||
//     req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     throw new ApiError(401, "Unauthorized request");
//   }

//   try {
//     const decodedToken = await verifyToken(
//       token,
//       process.env.ACCESS_TOKEN_SECRET
//     );

//     req.user = decodedToken;
//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       throw new ApiError(401, "Expired token");
//     } else {
//       throw new ApiError(401, "Invalid token");
//     }
//   }
// });

// export default verifyJWT;
