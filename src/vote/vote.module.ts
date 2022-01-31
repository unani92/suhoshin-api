import { Module } from '@nestjs/common'
import { VoteController } from './vote.controller'
import { VoteService } from './vote.service'
import { FileUploadService } from '../FileUploadS3'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VoteRepository } from './vote.repository'
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
    imports: [
        TypeOrmModule.forFeature([VoteRepository]),
        NestjsFormDataModule,
    ],
    controllers: [VoteController],
    providers: [VoteService, FileUploadService],
})
export class VoteModule {}
