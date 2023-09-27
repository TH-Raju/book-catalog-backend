/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { jwthelper } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { user } from './auth.interface';

const createAuthUser = async (data: User): Promise<User | null> => {
  const password = await bcrypt.hash(
    data?.password,
    Number(config.bycrypt_salt_rounds)
  );
  data.password = password;
  const result = await prisma.user.create({
    data,
    include: {
      orders: true,
      reviews: true,
    },
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

const refreshToken = async (token: string) => {
  let verifyToken = null;
  try {
    verifyToken = jwthelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(404, 'invalid token');
  }
  // step 2 cheek if user exists or not

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: verifyToken?.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not exist');
  }

  // const { email } = isUserExist

  // step 3 generate new token
  const accessToken = jwthelper.createToken(
    { id: isUserExist?.id, email: isUserExist?.email, role: isUserExist?.role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in,
    }
  );
  return {
    accessToken,
  };
};

// profile

const getUserProfile = async (token: any): Promise<user | null> => {
  const { role, userId } = token;
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      role,
    },

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
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  return result;
};

const authservices = {
  createAuthUser,
  loginuser,
  refreshToken,
  getUserProfile,
};
export default authservices;
