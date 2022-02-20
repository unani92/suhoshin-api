import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StatusUpdateRepository } from './status-update.repository'
import { GroupsRepository } from '../groups/groups.repository'
import { FileUploadService } from '../FileUploadS3'
import { UserStatusCreateDto } from './dto/create.dto'
import { UserRepository } from "../auth/auth.repository";

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

    async createRequest({ user_id, content, group_id, thumbnail }) {
        const thumbUrl = thumbnail
            ? await this.fileUploadService.upload(thumbnail, 'status-update', `${user_id}_verify.jpg`)
            : null
        const group = await this.groupsRepository.findOne(group_id)
        const user = await this.userRepository.searchById(user_id)
        return await this.statusUpdateRepository.creteRequest({ user, content, thumbnail: thumbUrl, group })
    }

    async handleRequest(id: number, user_id: number, status: boolean) {
        try {
            // 기존 심사결과에서 이미지 삭제
            const user = await this.userRepository.searchById(user_id)
            const res = await this.statusUpdateRepository.handleRequest(id, user, status)
            if (res) await this.fileUploadService.deleteObject(`status-update/${user_id}_verify.jpg`)
            return res
        } catch (e) {
            throw new InternalServerErrorException('??')
        }
    }
}
