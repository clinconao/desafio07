import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../../models/user.js";

const cookieExtractor = req => {
    console.log(req.cookies)
    const token = req.cookies ? req.cookies.jwtCookie : {}
    return token
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ""
}



export const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await userModel.findById(payload.user._id)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    } catch (e) {
        return done(e, null)
    }
})