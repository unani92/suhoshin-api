import { Module } from '@nestjs/common'
import { StatusUpdateController } from './status-update.controller'
import { StatusUpdateService } from './status-update.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatusUpdateRepository } from './status-update.repository'
import { NestjsFormDataModule } from 'nestjs-form-data'
import { AuthModule } from '../auth/auth.module'
import { FileUploadService } from '../FileUploadS3'
import { GroupsRepository } from '../groups/groups.repository'

@Module({
    imports: [TypeOrmModule.forFeature([StatusUpdateRepository, GroupsRepository]), NestjsFormDataModule, AuthModule],
    controllers: [StatusUpdateController],
    providers: [StatusUpdateService, FileUploadService],
})
export class StatusUpdateModule {}
