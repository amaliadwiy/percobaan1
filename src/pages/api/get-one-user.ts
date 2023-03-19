import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const getUser =async (req:NextApiRequest, res:NextApiResponse) => {
    const data = await prisma.user.findUnique({
        where:{
            id:7,
        },
    })

    res.status(200).json(req.body)
}

export default getUser