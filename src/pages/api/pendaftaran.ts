import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body
        const data = await prisma.user.create({
            data:JSON.parse(body)
        })
        res.status(201).json({ success: true })
    }
}

export default createUser