import jwt from "jsonwebtoken";

// export const useMiddleware = (req, res, next) => {
//   const token = req.cookies.jwttoken;

//   if (!token) {
//     return res.status(400).json({ message: "user is not authenticated" });
//   }

//   try {
//     // verify token using the JWT secret
//     const decode = jwt.verify(token, process.env.JWT_ECRET_KEY);
//     // req object ma apde user ni information attach karishu
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     // If token verification fails, return a forbidden response
//     return responde(res, 500, "user is required");
//   }
// };

export const useMiddleware = (req, res, next) => {
  // with cookies is below
  // const token = req.cookies.jwttoken;
  // with headers are below
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ECRET_KEY);
    req.user = decoded; // Attach decoded user data to the request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(500).json({ message: "User is required" });
  }
};
