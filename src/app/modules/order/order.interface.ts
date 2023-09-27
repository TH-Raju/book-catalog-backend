export type Order = {
  id: string;
  userId: string;
  status: 'pending' | 'shipped' | 'delivered';
  orderedBooks: [
    {
      bookId: string;
      quantity: number;
    }
  ];
};
