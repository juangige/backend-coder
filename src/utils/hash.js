import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function createHash(password) {
  const hashPw = await bcrypt.hash(password, bcrypt.genSaltSync(saltRounds));
  return hashPw;
}

export async function compareHash(password, hash) {
  const isPw = await bcrypt.compare(password, hash);
  return isPw;
}
