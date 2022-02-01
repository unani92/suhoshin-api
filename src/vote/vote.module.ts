import { Module } from '@nestjs/common'
import { VoteController } from './vote.controller'
import { VoteService } from './vote.service'
import { FileUploadService } from '../FileUploadS3'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VoteContentRepository, VoteRepository, VoteUserRepository } from "./vote.repository";
import { NestjsFormDataModule } from "nestjs-form-data";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([VoteRepository, VoteContentRepository, VoteUserRepository]),
        NestjsFormDataModule,
        AuthModule,
    ],
    controllers: [VoteController],
    providers: [VoteService, FileUploadService],
})
export class VoteModule {}
