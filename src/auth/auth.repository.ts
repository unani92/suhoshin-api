import { EntityRepository, Repository } from 'typeorm'
import { User } from './auth.entity'
import { CreateDto } from './dto/create.dto'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ResInterface } from '../res.interface'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp({ uuid, nickname, email, thumbnail }: CreateDto): Promise<object> {
        const user = await this.create({
            uuid,
            nickname,
            thumbnail,
            email: email || `${uuid}@suhoshin.com`,
        })
        await this.save(user)

        return { msg: 'ok' }
    }

    async signIn({ uuid, nickname = null, email = null, thumbnail = null }: CreateDto): Promise<User> {
        let user = await this.findOne({ uuid })
        if (!user) {
            try {
                await this.signUp({ uuid, nickname, email, thumbnail })
                user = await this.findOne({ uuid, nickname })
            } catch (e) {
                throw new InternalServerErrorException()
            }
        }

        return user
    }
    // 유저 전부조회
    async getAll(page: number): Promise<User[]> {
        return await this.find({
            order: { id: 'DESC' },
            skip: 10 * page,
            take: 10,
            cache: true,
        })
    }

    // 유저 검색
    async searchByNick(nickname: string): Promise<User[]> {
        return await this.find({ where: [nickname] })
    }
    async searchById(id: number): Promise<User> {
        return await this.findOne({ id })
    }

    // 등업
    async updateStatus(id: number): Promise<Object> {
        const user = await this.findOne({ id })
        if (!user) throw new NotFoundException('no user found')

        user.user_status = 1
        this.save(user)

        return { status: 200, msg: 'ok' }
    }

    // 회원정보 수정
    async editNickname(id: number, nickname: string): Promise<User> {
        const alreadyHasNick = await this.find({ nickname })
        if (alreadyHasNick.length) throw new InternalServerErrorException('already_submit')

        const user = await this.findOne({ id })
        user.nickname = nickname
        await this.save(user)

        return user
    }
}
