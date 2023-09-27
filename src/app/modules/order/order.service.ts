//create order
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (token: any, data: any): Promise<any> => {
  const { userId, role } = token;

  if (role !== 'customer') {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Only customers can create an order'
    );
  }

  const orderedBooks = data.orderedBooks; // Get the ordered books data

  const orders = await prisma.$transaction(async prismaClient => {
    const createdOrder = await prismaClient.order.create({
      data: {
        userId,
      },
      include: {
        orderedBooks: true,
      },
    });

    const orderedBooksData = orderedBooks.map((orderedBook: any) => {
      const { bookId, quantity } = orderedBook;
      return {
        orderId: createdOrder.id,
        bookId,
        quantity,
      };
    });

    await prismaClient.orderedBook.createMany({
      data: orderedBooksData,
    });

    const { id } = createdOrder;
    const showOrder = await prismaClient.order.findFirst({
      where: {
        id, // Replace with the actual order ID you want to retrieve
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    return showOrder;
  });

  return orders;
};

// get all orders

const getAllOrders = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });
  return result;
};

const getSingleOrder = async (token: any): Promise<Order | null> => {
  const { role, userId } = token;

  let result: any;
  if (role && role === 'admin') {
    result = await prisma.order.findMany({
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  } else if (role && role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  }
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

// bonus part get specific order
const getspecificOrder = async (
  id: string,
  token: any
): Promise<Order | null> => {
  const { role, userId } = token;

  let result: any;
  if (role && role === 'admin') {
    result = await prisma.order.findMany({
      where: {
        id,
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  } else if (role && role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        id,
        userId: {
          equals: userId,
        },
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  }
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

export const orderServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getspecificOrder,
};
