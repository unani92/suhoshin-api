import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { CreateDto } from './dto/create.dto'
import { User } from './auth.entity'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signIn({
        uuid,
        nickname,
        email,
    }: CreateDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.signIn({ uuid, nickname, email })

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
