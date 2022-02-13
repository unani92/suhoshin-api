import { EntityRepository, Repository } from 'typeorm'
import { Groups } from './groups.entity'

@EntityRepository(Groups)
export class GroupsRepository extends Repository<Groups> {
    async getAllGroups() {
        return await this.find({ enabled: 1 })
    }
}
