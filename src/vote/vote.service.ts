import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VoteContentRepository, VoteRepository } from './vote.repository'
import { VoteCreateDto } from './dto/create.dto'
import { FileUploadService } from '../FileUploadS3'

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(VoteRepository)
        @InjectRepository(VoteContentRepository)
        private voteRepository: VoteRepository,
        private voteContentRepository: VoteContentRepository,
    ) {}

    async getAll(page: number) {
        return await this.voteRepository.getAllVotes(page)
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

    async createUserVote() {

    }
}
