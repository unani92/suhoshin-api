import { EntityRepository, Repository } from "typeorm";
import { User } from "./auth.entity";
import { CreateDto } from "./dto/create.dto";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp({ uuid, nickname, email }: CreateDto): Promise<Object> {
        const user = await this.create({
            uuid,
            nickname,
            email: email || `${uuid}@suhoshin.com`,
        })
        await this.save(user)

        return { msg: 'ok' }
    }

    async signIn({ uuid, nickname, email }: CreateDto): Promise<User> {
        let user = await this.findOne({ uuid })
        if (!user) {
            this.signUp({ uuid, nickname, email })
                .then(async () => {
                    user = await this.findOne({ uuid, nickname })
                })
                .catch(e => {
                    throw new InternalServerErrorException();
                })
        }

        return user
    }
    // 유저 전부조회
    async getAll(page: number): Promise<User[]> {
        const users = await this.find({
            order: { id: "DESC" },
            skip: 10 * page,
            take: 10,
            cache: true,
        })

        return users
    }


    // 유저 검색
    async searchByNick(nickname: string): Promise<User[]> {
        const user = await this.find({ where: [ nickname ] })

        return user
    }

    // 등업
    async updateStatus(id: number): Promise<Object> {
        const user = await this.findOne({ id })
        if (!user) throw new NotFoundException('no user found')

        user.user_status = 1
        this.save(user)

        return { status: 200, msg: 'ok' }
    }

}
