import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const getOneUser =async (req:NextApiRequest, res:NextApiResponse) => {
    const body = req.body
    const data = await prisma.user.findUnique({
        where:{
            id:2,
        },
        select:{
            id:true,
            name:true,
            email:true,
            password:true,
        }
    })

    return res.status(201).json(data);
}

export default getOneUser