import { hashSync, compareSync } from "bcrypt";

export const hashPassword = async (password) => {
  return hashSync(password, 10);
};

export const checkPassword = async (password, hash) => {
  return compareSync(password, hash);
};

export const generateToken = async (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};
