import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VoteContentRepository, VoteRepository, VoteUserRepository } from './vote.repository'
import { VoteCreateDto, VoteUserCreateDto } from './dto/create.dto'
import { FileUploadService } from '../FileUploadS3'

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(VoteRepository)
        @InjectRepository(VoteContentRepository)
        @InjectRepository(VoteUserRepository)
        private voteRepository: VoteRepository,
        private voteContentRepository: VoteContentRepository,
        private voteUserRepository: VoteUserRepository,
    ) {}

    async getAll(page: number) {
        return await this.voteRepository.getAllVotes(page)
    }

    async getUserVote(voteId, userId) {
        return await this.voteUserRepository.getUserVote(voteId, userId)
    }

    async create({ title, content, thumbnail, expire_at, voteContents }: VoteCreateDto) {
        const fileUpload = new FileUploadService()
        const thumbUrl = await fileUpload.upload(thumbnail, 'vote')
        const vote = await this.voteRepository.createVote({
            title,
            content,
            thumbnail: thumbUrl,
            expire_at,
        })

        return await this.voteContentRepository.createContent(voteContents, vote)
    }

    async createUserVote({ user_id, vote_id, vote_content_id }: VoteUserCreateDto) {
        return await this.voteUserRepository.createUserVote({ user_id, vote_id, vote_content_id })
    }

    async fixUserVote({ id, user_id, vote_content_id }) {
        return this.voteUserRepository.fixUserVote({ id, user_id, vote_content_id })
    }
}
