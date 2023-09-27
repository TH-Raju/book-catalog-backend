/* eslint-disable @typescript-eslint/no-explicit-any */
//create book

import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { booksSearchableFields } from './book.constant';

const createBooks = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getallbooks = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[] | null>> => {
  const { search, minPrice, maxPrice, category } = filters;

  const { limit, skip, page } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: booksSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    const minPrices = parseFloat(minPrice);

    if (!isNaN(minPrices)) {
      andConditions.push({
        price: {
          gte: minPrices,
        },
      });
      console.log('MinPrice is used');
    }
  }

  if (maxPrice !== undefined) {
    const maxPrices = parseFloat(maxPrice);

    if (!isNaN(maxPrices)) {
      andConditions.push({
        price: {
          lte: maxPrices,
        },
      });
      console.log('MaxPrice is used');
    }
  }

  if (category !== undefined) {
    andConditions.push({
      categoryId: {
        equals: category,
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const count = await prisma.book.count({
    where: whereConditions,
  });
  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: limit,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'something went wrong');
  }
  return {
    meta: {
      total: count,
      page,
      limit,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[] | null>> => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);
  const total = await prisma.book.count({
    where: {
      categoryId: {
        equals: id,
      },
    },
  });
  const result = await prisma.book.findMany({
    where: {
      categoryId: {
        equals: id,
      },
    },
    skip,
    take: limit,
    include: {
      category: true,
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get single book
const getsingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
//   update single books
const updateSingleBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    include: {
      category: true,
    },
    data,
  });
  return result;
};

// delete
const deleteBook = async (id: string): Promise<Book | null> => {
  let deletedBook: Book | null = null;

  await prisma.$transaction(async prismaClient => {
    const ordersWithBook = await prismaClient.order.findMany({
      where: {
        orderedBooks: {
          some: {
            bookId: id,
          },
        },
      },
    });

    await Promise.all(
      ordersWithBook.map(async order => {
        await prismaClient.orderedBook.deleteMany({
          where: {
            orderId: order.id,
            bookId: id,
          },
        });
      })
    );
    deletedBook = await prismaClient.book.delete({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  });

  return deletedBook;
};

export const booksServices = {
  createBooks,
  getallbooks,
  getBooksByCategoryId,
  getsingleBook,
  updateSingleBook,
  deleteBook,
};
