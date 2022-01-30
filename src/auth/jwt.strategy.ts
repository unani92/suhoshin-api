import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { User } from './auth.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            secretOrKey: 'suhoshin12',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload) {
        const { nickname } = payload
        const user: User = await this.userRepository.findOne({ nickname })

        if (!user) throw new UnauthorizedException('11111')
        return user
    }
}
