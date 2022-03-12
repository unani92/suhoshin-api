import { Module } from '@nestjs/common'
import { MatchesController } from './matches.controller'
import { MatchesService } from './matches.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MatchesRepository } from './matches.repository'
import { UserRepository } from '../auth/auth.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([MatchesRepository, UserRepository]), AuthModule],
    controllers: [MatchesController],
    providers: [MatchesService],
})
export class MatchesModule {}
