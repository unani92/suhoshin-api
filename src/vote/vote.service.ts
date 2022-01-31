import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VoteRepository } from './vote.repository'
import { VoteCreateDto } from './dto/create.dto'
import { FileUploadService } from "../FileUploadS3";

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(VoteRepository)
        private voteRepository: VoteRepository,
    ) {}

    async create({ title, content, thumbnail, expire_at }: VoteCreateDto) {
        const fileUpload = new FileUploadService()
        const thumbUrl = await fileUpload.upload(thumbnail, 'vote')
        return this.voteRepository.createVote({ title, content, thumbnail: thumbUrl, expire_at })
    }
}
