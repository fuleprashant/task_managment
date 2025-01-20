import jwt from "jsonwebtoken";

export const useMiddleware = (req, res, next) => {
  const token = req.cookies.jwttoken;

  if (!token) {
    return res.status(400).json({ message: "user is not authenticated" });
  }

  try {
    // verify token using the JWT secret
    const decode = jwt.verify(token, process.env.JWT_ECRET_KEY);
    // req object ma apde user ni information attach karishu
    req.user = decode;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    // If token verification fails, return a forbidden response
    return responde(res, 500, "user is required");
  }
};
