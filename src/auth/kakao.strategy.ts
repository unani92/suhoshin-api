import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-kakao'

export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.NEST_KAKAO_KEY,
            callbackURL: 'http://localhost:8080/front',
        })
    }

    async validate(accessToken, refreshToken, profile, done) {
        console.log(profile)
    }
}
