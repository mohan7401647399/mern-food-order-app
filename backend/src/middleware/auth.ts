import { auth } from "express-oauth2-jwt-bearer";
import Jwt from "jsonwebtoken";
import User from "../model/User";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string
        }
    }
}

//  Auth0 config details
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

//  jwt decoded token 
export const jwtParse = async (req: any, res: any, next: any) => {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authorization.split(' ')[1]

    try {
        const decoded = Jwt.decode(token) as Jwt.JwtPayload
        const auth0Id = decoded.sub
        const user = await User.findOne({ auth0Id })

        if (!user) return res.sendStatus(401)
        req.auth0Id = auth0Id as string
        req.userId = user._id
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
}