import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { CreateDto } from './dto/create.dto'
import { User } from './auth.entity'
import { JwtService } from '@nestjs/jwt'
import axios from 'axios'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signIn(authToken) {
        const { data } = await axios.post(
            'https://kapi.kakao.com/v2/user/me',
            {},
            { headers: { Authorization: `Bearer ${authToken}` } },
        )
        const {
            id: uuid,
            kakao_account: {
                profile: { nickname, thumbnail_image_url: thumbnail },
                email,
            },
        } = data
        const user = await this.userRepository.signIn({
            uuid,
            nickname,
            email,
            thumbnail,
        })

        const payload = {
            id: user.id,
            email: user.email,
            user_status: user.user_status,
            nickname: user.nickname,
        }
        const accessToken = this.jwtService.sign(payload)
        return { accessToken }
    }
    async getAll(page: number): Promise<User[]> {
        return this.userRepository.getAll(page)
    }
    async searchByNick(nickname: string): Promise<User[]> {
        return this.userRepository.searchByNick(nickname)
    }
    async updateStatus(id: number): Promise<Object> {
        return this.userRepository.updateStatus(id)
    }
}
