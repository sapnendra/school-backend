import { Router } from "express";
import multer from "multer";
import {
  fetchSchool,
  login,
  signup,
  updateSchool,
  uploadImage,
} from "../controller/school.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
const SchoolRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/school/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.png`);
  },
});

const upload = multer({ storage: storage });

SchoolRouter.post("/signup", signup);
SchoolRouter.post("/login", login);
SchoolRouter.post(
  "/upload-image",
  AuthMiddleware,
  upload.single("image"),
  uploadImage
);
SchoolRouter.get("/", AuthMiddleware, fetchSchool);
SchoolRouter.put("/", AuthMiddleware, updateSchool);

export default SchoolRouter;
