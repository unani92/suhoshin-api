import { Module } from '@nestjs/common'
import { GroupsController } from './groups.controller'
import { GroupsService } from './groups.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupsRepository } from './groups.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([GroupsRepository]), AuthModule],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {}
