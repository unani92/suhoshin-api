import { EntityRepository, Repository } from 'typeorm'
import { Vote, VoteContent, VoteUser } from './vote.entity'
import { VoteCreateDto, VoteUserCreateDto } from './dto/create.dto'
import { NotFoundException } from '@nestjs/common'

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
    async getVoteById(voteId) {
        return await this.findOne({ id: voteId }, { relations: ['vote_content'] })
    }
    async getAllVotes(page: number): Promise<Vote[]> {
        return await this.find({
            relations: ['vote_content'],
            order: { expire_at: 'DESC', id: 'DESC' },
            skip: 10 * page,
            take: 10,
        })
    }
}

@EntityRepository(VoteContent)
export class VoteContentRepository extends Repository<VoteContent> {
    async getContent(vote: Vote) {
        return this.find({ vote })
    }
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
            msg: '투표가 등록되었어요',
        }
    }
}

@EntityRepository(VoteUser)
export class VoteUserRepository extends Repository<VoteUser> {
    async getAllUserVote(voteId: number): Promise<VoteUser[]> {
        return await this.find({ vote_id: voteId })
    }

    async getUserVote(userId: number, voteId: number) {
        let res
        res = await this.findOne({
            user_id: userId,
            vote_id: voteId,
        })

        if (!res) res = false
        return res
    }

    async createUserVote({ vote_id, user_id, vote_content_id }: VoteUserCreateDto) {
        const userVote = await this.create({
            user_id,
            vote_id,
            vote_content_id,
        })

        this.save(userVote)

        return { msg: '투표를 완료했습니다. 추후 변경 가능합니다', status: 200 }
    }

    async fixUserVote({ id, user_id, vote_content_id }) {
        const userVote = await this.findOne({
            vote_id: id,
            user_id,
        })
        if (!userVote) throw new NotFoundException()

        userVote.vote_content_id = vote_content_id
        this.save(userVote)

        return { msg: '투표가 수정되었어요', status: 200 }
    }
}
