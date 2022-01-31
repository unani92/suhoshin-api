import { Module } from '@nestjs/common'
import { VoteController } from './vote.controller'
import { VoteService } from './vote.service'
import { FileUploadService } from '../FileUploadS3'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VoteRepository } from './vote.repository'

@Module({
    imports: [TypeOrmModule.forFeature([VoteRepository])],
    controllers: [VoteController],
    providers: [VoteService, FileUploadService],
})
export class VoteModule {}
