import { Role } from "@prisma/client"

export type user =  {
    id:string,
    name:string
    email:string,
    role:Role
    contactNo:string
    address:string 
    profileImg:string 
    password?:string
}