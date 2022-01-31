import { EntityRepository, Repository } from 'typeorm'
import { Vote, VoteContent, VoteUser } from './vote.entity'
import { User } from '../auth/auth.entity'
import { UnauthorizedException } from '@nestjs/common'
import { VoteCreateDto } from './dto/create.dto'

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
    async createVote({ title, content, expire_at }: VoteCreateDto) {
        const vote = await this.create({
            title,
            content,
            expire_at,
        })

        this.save(vote)
        return {
            content: vote,
            status: 200,
            msg: 'ok',
        }
    }
}

@EntityRepository(VoteContent)
export class VoteContentRepository extends Repository<VoteContent> {}

@EntityRepository(VoteUser)
export class VoteUserRepository extends Repository<VoteUser> {}
