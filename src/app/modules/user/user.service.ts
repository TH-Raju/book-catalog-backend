/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getallUser = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  const usersWithoutPassword = result.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  if (!usersWithoutPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'something went wrong');
  }
  return usersWithoutPassword;
};

export const userservice = {
  getallUser,
};
