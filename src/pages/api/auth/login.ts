import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../../../lib/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

// export default withIronSessionApiRoute(loginRoute, ironOptions);

// function loginRoute(req:NextApiRequest, res:NextApiResponse<User>) {
//     const {username, password} = await req.body;
//     // check db

//     const sessionUser = {username:username, isLoggedIn:true} as User req.session.user = sessionUser;

//     await req.session.save();
//     return res.json(sessionUser);
// }

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body
    const data = await prisma.user.findFirst({
        where: {
            AND: {
                email: body.email,
                password: body.password
            }
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })

    if(data) return res.status(201).json(data)
    return res.status(204).end()
}

export default login
