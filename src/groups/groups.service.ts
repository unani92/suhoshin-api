import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GroupsRepository } from './groups.repository'

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(GroupsRepository)
        private groupsRepository: GroupsRepository,
    ) {}

    async getAllGroups() {
        return await this.groupsRepository.getAllGroups()
    }
}
