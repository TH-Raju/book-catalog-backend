/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '@prisma/client';

export type IUser = {
  name: string;
  email: string;
  password: any;
  role: Role;
  contactNo: string;
  address: string;
  profileImg: string;
};
export type ILoginuser = {
  email: string;
  password: string;
};
