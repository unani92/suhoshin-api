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
        await fileUpload.upload(thumbnail)
        return this.voteRepository.createVote({ title, content, expire_at })
    }
}
