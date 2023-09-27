import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';

const createAuthUser = async (data: User): Promise<User | null> => {
  const password = await bcrypt.hash(
    data?.password,
    Number(config.bycrypt_salt_rounds)
  );
  data.password = password;
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const authservices = {
  createAuthUser,
};
