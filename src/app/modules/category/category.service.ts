import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

// create category
const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

export const categoryServices = {
  createCategory,
};
