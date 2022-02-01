import { EntityRepository, Repository } from 'typeorm'
import { Vote, VoteContent, VoteUser } from './vote.entity'
import { User } from '../auth/auth.entity'
import { UnauthorizedException } from '@nestjs/common'
import { VoteCreateDto } from './dto/create.dto'

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
    async createVote({ title, content, expire_at, thumbnail }: VoteCreateDto): Promise<Vote> {
        const vote = await this.create({
            title,
            content,
            expire_at,
            thumbnail,
        })
        await this.save(vote)

        return vote
    }
}

@EntityRepository(VoteContent)
export class VoteContentRepository extends Repository<VoteContent> {
    async createContent(voteContent, vote: Vote) {
        for (const item of voteContent) {
            const voteContentItem = await this.create({
                content: item,
                vote,
            })
            await this.save(voteContentItem)
        }

        return {
            status: 200,
            msg: 'ok',
        }
    }
}

@EntityRepository(VoteUser)
export class VoteUserRepository extends Repository<VoteUser> {}
