import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const updUser =async (req:NextApiRequest, res:NextApiResponse) => {
    const data = await prisma.user.update({
        where : {
            id : 7,
        },
        data : {
            name :'Viola',
            email : 'nabilaviola@gmail.com,'
        }
    })

    res.status(201).json({success:true})
}

export default updUser 