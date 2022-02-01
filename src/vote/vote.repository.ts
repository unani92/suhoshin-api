import { EntityRepository, Repository } from "typeorm";
import { Vote, VoteContent, VoteUser } from "./vote.entity";
import { VoteCreateDto } from "./dto/create.dto";

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

    async getAllVotes(page: number): Promise<Vote[]> {
        return await this.find({
            relations: ['vote_content'],
            order: { id: 'DESC' },
            skip: 10 * page,
            take: 10,
        })
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
            msg: '투표가 등록되었어요',
        }
    }
}

@EntityRepository(VoteUser)
export class VoteUserRepository extends Repository<VoteUser> {
    async getUserVote(voteId, userId) {
        return await this.find({
            user_id: userId,
            vote_id: voteId,
        })
    }

    async createUserVote(voteId, userId, contentId) {
        const userVote = await this.create({
            user_id: userId,
            vote_id: voteId,
            vote_content_id: contentId,
        })

        this.save(userVote)

        return { msg: '투표를 완료했습니다. 추후 변경 가능합니다', status: 200 }
    }
}
