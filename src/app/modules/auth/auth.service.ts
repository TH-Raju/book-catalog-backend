import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAuthUser = async (data: User): Promise<User | null> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const authservices = {
  createAuthUser,
};
