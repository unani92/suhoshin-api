import { Module } from '@nestjs/common'
import { StatusUpdateController } from './status-update.controller'
import { StatusUpdateService } from './status-update.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatusUpdateRepository } from './status-update.repository'
import { NestjsFormDataModule } from 'nestjs-form-data'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([StatusUpdateRepository]), NestjsFormDataModule, AuthModule],
    controllers: [StatusUpdateController],
    providers: [StatusUpdateService],
})
export class StatusUpdateModule {}
