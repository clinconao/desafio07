import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../../models/user.js";

const cookieExtractor = req => {
    console.log(req.cookies)

    const token = req.cookies ? req.cookies.jwtCookie : {}
    console.log(token)
    return token
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "myXy6WqAvNAJy3Kb"
}



export const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        console.log(payload)
        const user = await userModel.findById(payload.user._id)
        console.log(user)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    } catch (e) {
        return done(e, null)
    }
})