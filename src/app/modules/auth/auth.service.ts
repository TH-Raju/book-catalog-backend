/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwthelper } from '../../../helpers/jwtHelpers';
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
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'something went wrong');
  }
  return result;
};
const loginuser = async (data: any): Promise<any> => {
  const { email, password } = data;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not exist');
  }

  const decriptedPassword = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (isUserExist?.password && !decriptedPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'password is incorrect');
  }
  const accessToken = jwthelper.createToken(
    {
      userId: isUserExist?.id,
      email: isUserExist?.email,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  const refreshToken = jwthelper.createToken(
    {
      userId: isUserExist?.id,
      email: isUserExist?.email,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.refresh_expires_in,
    }
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const authservices = {
  createAuthUser,
  loginuser,
};
