import { EntityRepository, Repository } from 'typeorm'
import { StatusUpdate } from './status-update.entity'
import { UserStatusCreateDto } from './dto/create.dto'
import { NotFoundException } from '@nestjs/common'
import { ResInterface } from '../res.interface'

@EntityRepository(StatusUpdate)
export class StatusUpdateRepository extends Repository<StatusUpdate> {
    async getAll(page: number): Promise<StatusUpdate[]> {
        return await this.find({
            where: { confirmed: 0 },
            order: { created_at: 'DESC', id: 'DESC' },
            skip: 10 * page,
            take: 10,
        })
    }

    async creteRequest({ user_id, content, thumbnail = null, group }: UserStatusCreateDto): Promise<ResInterface> {
        await this.create({ user_id, content, thumbnail, group })

        return { status: 200, msg: '심사가 제출되어 관리자가 심사 예정입니다.' }
    }

    async handleRequest(id: number, user_id: number, status: boolean): Promise<ResInterface> {
        const request = await this.findOne({ id, user_id })
        if (!request) throw new NotFoundException('no record')

        request.confirmed = status ? 1 : -1
        request.thumbnail = null
        await this.save(request)

        return { status: 200, msg: `심사를 ${status ? '승인' : '반려'}했어요` }
    }
}
