import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers?.authorization;

    if (!authorization) throw next(new Error("Unauthorized User"));

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") throw next(new Error("Unauthorized User"));

    const school = jwt.verify(token, process.env.JWT_SECRET);
    req.school = school;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export default AuthMiddleware;
