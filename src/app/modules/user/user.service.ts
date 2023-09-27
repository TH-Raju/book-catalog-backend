import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
// get all user
const getallUser = async (): Promise<User[] | null> => {
    const result = await prisma.user.findMany({
        include:{
            orders:true,
            reviews:true
        }
    })
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'something went wrong')
    }
    return result
  }
  
//   get single user 
const getSingleUser = async (id: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where:{
            id
        },
        include:{
            orders:true,
            reviews:true
        }
     })
    return result
  }

//   update
const updateUser = async (
    id: string,
    data: Partial<User>
  ): Promise<User | null> => {
    const result = await prisma.user.update({
           where:{
            id
           },
           include:{
            orders:true,
            reviews:true
           },
           data
    })
    return result
  }
  
//   delete 
const deleteUser = async (id: string): Promise<User | null> => {

  await prisma.$transaction(async(tx)=>{
    const findOrder  =  await tx.order.findMany({
      where:{
        userId:id
      }
    })
 


await Promise.all(
  findOrder.map(async(order)=>{
    await tx.orderedBook.deleteMany({
          where:{
               orderId:order?.id
          }
        })
  })
 
)
await tx.order.deleteMany({
  where:{
    userId:id
  }
})
    
  })
    const result = await prisma.user.delete({
        where:{
            id
        },
        include:{
            orders:true,
            reviews:true
        }
    })
    return result
  }

const userservice ={
      getallUser,
      getSingleUser,
      updateUser,
      deleteUser 
}
export default userservice