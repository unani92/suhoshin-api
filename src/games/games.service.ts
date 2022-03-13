import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GamesRepository } from './games.repository'
import { Games } from './games.entity'
import { ResInterface } from '../res.interface'
import { CreateDto } from './dto/create.dto'

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GamesRepository)
        private gamesRepository: GamesRepository,
    ) {}

    async getAll(day?: Date): Promise<Games[]> {
        return this.gamesRepository.getAll(day)
    }

    async createMatch({
        match_day,
        other,
        home_away,
        match_type,
        score_us,
        score_other,
        scorer,
    }: CreateDto): Promise<ResInterface> {
        try {
            await this.gamesRepository.createMatch({
                match_day,
                other,
                home_away,
                match_type,
                score_us,
                score_other,
                scorer,
            })
            return { status: 200, msg: '매치가 생성되었어요' }
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async fixMatch(id, matchObj): Promise<ResInterface> {
        try {
            await this.gamesRepository.fixMatch(id, matchObj)
            return { status: 200, msg: '매치가 수정되었어요' }
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
}
