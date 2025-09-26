import SchoolModel from "../model/school.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    await SchoolModel.create(req.body);
    res.json({ message: "Signup Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password)
      return res.status(400).json({ message: "Invalid Request" });

    const school = await SchoolModel.findOne({ email }).lean();
    if (!school)
      return res
        .status(404)
        .json({ message: "User not found, try to siugnup." });

    const isLogin = await bcrypt.compare(password, school.password);
    if (!isLogin)
      return res.status(404).json({ message: "Incorrect Password." });

    delete school.password;

    const token = jwt.sign(school, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login Success", token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchSchool = async (req, res) => {
  try {
    const school = await SchoolModel.findById(req.school._id, { password: 0 });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSchool = async (req, res) => {
  try {
    const school = await SchoolModel.findByIdAndUpdate(
      req.school._id,
      req.body,
      {
        new: true,
      }
    ).lean();

    if (!school)
      return res.status(404).json({ message: "School id not found." });

    delete school.password;
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    await SchoolModel.updateOne(
      { _id: req.school._id },
      { $set: { image: req.file.path } }
    );
    res.json({ message: "Image uploaded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
