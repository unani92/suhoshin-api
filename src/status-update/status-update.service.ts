import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StatusUpdateRepository } from './status-update.repository'
import { GroupsRepository } from '../groups/groups.repository'
import { FileUploadService } from '../FileUploadS3'
import { UserStatusCreateDto } from './dto/create.dto'

@Injectable()
export class StatusUpdateService {
    constructor(
        @InjectRepository(StatusUpdateRepository)
        @InjectRepository(GroupsRepository)
        private statusUpdateRepository: StatusUpdateRepository,
        private groupsRepository: GroupsRepository,
        private fileUploadService: FileUploadService,
    ) {}

    async getAll(page: number) {
        return await this.statusUpdateRepository.getAll(page)
    }

    async createRequest({ user_id, content, group_id, thumbnail }) {
        // const fileUpload = new FileUploadService()
        const thumbUrl = await this.fileUploadService.upload(thumbnail, 'status-update')
        const group = await this.groupsRepository.findOne(group_id)

        return await this.statusUpdateRepository.creteRequest({ user_id, content, thumbnail: thumbUrl, group })
    }

    async handleRequest(id: number, user_id: number, status: boolean) {
        const res = await this.statusUpdateRepository.handleRequest(id, user_id, status)
        try {
            // 기존 심사결과에서 이미지 삭제
            return res
        } catch (e) {
            throw new InternalServerErrorException('??')
        }
    }
}
