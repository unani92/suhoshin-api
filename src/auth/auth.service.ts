import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { CreateDto } from "./dto/create.dto";
import { User } from "./auth.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signIn({ uuid, nickname, email }: CreateDto) {
        return this.userRepository.signIn({ uuid, nickname, email })
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
