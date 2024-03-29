import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { User } from './auth.entity'
import { JwtService } from '@nestjs/jwt'
import axios from 'axios'
import { ResInterface } from '../res.interface'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async testSignIn({ uuid, nickname, email, thumbnail }) {
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
            thumbnail: user.thumbnail,
            nickname: user.nickname,
        }
        const jwtToken = this.jwtService.sign(payload)
        return { jwtToken, me: payload }
    }

    async signIn(accessCode) {
        try {
            const apiUrl = 'https://kauth.kakao.com/oauth/token'
            const requestBody = new URLSearchParams()
            requestBody.append('grant_type', 'authorization_code')
            requestBody.append('client_id', process.env.NEST_KAKAO_KEY)
            // requestBody.append('redirect_uri', 'http://192.168.0.6:8080/front');
            requestBody.append('code', accessCode)

            const {
                data: { access_token: authToken },
            } = await axios.post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
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
            const user: User = await this.userRepository.signIn({
                uuid,
                nickname,
                email,
                thumbnail,
            })

            const payload = {
                id: user.id,
                email: user.email,
                user_status: user.user_status,
                thumbnail: user.thumbnail,
                nickname: user.nickname,
            }
            const jwtToken = this.jwtService.sign(payload)
            return { jwtToken, me: payload }
        } catch (e) {
            console.log(e)
        }
    }
    async getAll(page: number): Promise<User[]> {
        return this.userRepository.getAll(page)
    }
    async searchByNick(nickname: string): Promise<User[]> {
        return this.userRepository.searchByNick(nickname)
    }
    async searchById(id: number): Promise<User> {
        return this.userRepository.searchById(id)
    }
    async updateStatus(id: number): Promise<Object> {
        return this.userRepository.updateStatus(id)
    }
    async editNickname(uid: number, nick: string): Promise<Object> {
        const { id, email, user_status, thumbnail, nickname } = await this.userRepository.editNickname(uid, nick)
        const payload = { id, email, user_status, thumbnail, nickname }

        const jwtToken = this.jwtService.sign(payload)
        return { jwtToken, me: payload }
    }
}
