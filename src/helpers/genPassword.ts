import bcrypt from 'bcrypt';

interface IPasswordPair {
  hashedPasssword: string;
  salt: string;
}

const genPassword = async (plainPassword: string): Promise<IPasswordPair> => {
  const salt = await bcrypt.genSalt();
  const hashedPasssword = await bcrypt.hash(plainPassword, salt);

  return { hashedPasssword, salt };
}

export { genPassword, IPasswordPair };
