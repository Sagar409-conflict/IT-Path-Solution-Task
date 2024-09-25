import bcrypt from "bcryptjs";
export const passwordEncryption = async (text) => {
  return await bcrypt.hash(text, 10);
};
