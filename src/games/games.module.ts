import { Module } from '@nestjs/common'
import { GamesController } from './games.controller'
import { GamesService } from './games.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../auth/auth.repository'
import { GamesRepository } from './games.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([GamesRepository, UserRepository]), AuthModule],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}
