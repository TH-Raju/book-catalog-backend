import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getallUser = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({});
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'something went wrong');
  }
  return result;
};

export const userservice = {
  getallUser,
};
