//create order
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

export const orderServices = {
  createOrder,
};
