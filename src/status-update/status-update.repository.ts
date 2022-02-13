import { EntityRepository, Repository } from 'typeorm'
import { StatusUpdate } from './status-update.entity'

@EntityRepository(StatusUpdate)
export class StatusUpdateRepository extends Repository<StatusUpdate> {

}
