import { EntityRepository, Repository } from 'typeorm'
import { StatusUpdate } from './status-update.entity'
import { User } from '../auth/auth.entity'
import { UserStatusCreateDto } from './dto/create.dto'
import { NotFoundException } from '@nestjs/common'
import { ResInterface } from '../res.interface'

@EntityRepository(StatusUpdate)
export class StatusUpdateRepository extends Repository<StatusUpdate> {
    async getAll(page: number): Promise<StatusUpdate[]> {
        return await this.find({
            where: { confirmed: 0 },
            relations: ['group', 'user'],
            order: { created_at: 'DESC', id: 'DESC' },
            skip: 10 * page,
            take: 10,
        })
    }

    async getByUserId(user: User): Promise<StatusUpdate> {
        return await this.findOne({ user })
    }

    async creteRequest({ user, content, thumbnail = null, group }: UserStatusCreateDto): Promise<ResInterface> {
        const request = await this.create({ user, content, thumbnail, group })
        this.save(request)

        return { status: 200, msg: '심사가 제출되어 관리자가 심사 예정입니다.' }
    }

    async handleRequest(id: number, status: boolean, declined_reason?: string): Promise<ResInterface> {
        const request = await this.findOne({ id }, { relations: ['group'] })
        if (!request) throw new NotFoundException('no record')

        request.confirmed = status ? 1 : -1
        request.thumbnail = null
        request.declined_reason = declined_reason
        await this.save(request)

        return { status: request.group.id === 0 ? 202 : 200, msg: `심사를 ${status ? '승인' : '반려'}했어요` }
    }
}
