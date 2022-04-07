import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StatusUpdateRepository } from './status-update.repository'
import { GroupsRepository } from '../groups/groups.repository'
import { FileUploadService } from '../FileUploadS3'
import { UserRepository } from '../auth/auth.repository'
import { StatusUpdate } from './status-update.entity'

@Injectable()
export class StatusUpdateService {
    constructor(
        @InjectRepository(StatusUpdateRepository)
        @InjectRepository(GroupsRepository)
        @InjectRepository(UserRepository)
        private statusUpdateRepository: StatusUpdateRepository,
        private groupsRepository: GroupsRepository,
        private userRepository: UserRepository,
        private fileUploadService: FileUploadService,
    ) {}

    async getAll(page: number) {
        return await this.statusUpdateRepository.getAll(page)
    }

    async getByUserId(user_id: number): Promise<StatusUpdate[]> {
        const user = await this.userRepository.findOne({ id: user_id })

        return await this.statusUpdateRepository.getByUserId(user)
    }

    async createRequest({ user_id, content, group_id, thumbnail }) {
        const thumbUrl = thumbnail
            ? await this.fileUploadService.upload(thumbnail, 'status-update', `${user_id}_verify.jpg`)
            : null
        const group = await this.groupsRepository.findOne(group_id)
        const user = await this.userRepository.searchById(user_id)
        return await this.statusUpdateRepository.creteRequest({ user, content, thumbnail: thumbUrl, group })
    }

    async handleRequest(id: number, user_id: number, status: boolean, declined_reason?: string) {
        try {
            // 기존 심사결과에서 이미지 삭제
            const user = await this.userRepository.searchById(user_id)
            const res = await this.statusUpdateRepository.handleRequest(id, status, declined_reason)

            if (res.status === 202) await this.fileUploadService.deleteObject(`status-update/${user_id}_verify.jpg`)
            user.user_status = status ? 1 : -1
            user.group_id = res.request.group.id

            this.userRepository.save(user)

            return res
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException('??')
        }
    }
}
