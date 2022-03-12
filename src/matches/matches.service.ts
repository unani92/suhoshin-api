import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MatchesRepository } from './matches.repository'
import { Matches } from './matches.entity'
import { CreateDto } from './dto/create.dto'
import { ResInterface } from '../res.interface'

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(MatchesRepository)
        private matchesRepository: MatchesRepository,
    ) {}

    async getAll(day?: Date): Promise<Matches[]> {
        return this.matchesRepository.getAll(day)
    }

    async createMatch({
        match_day,
        home_away,
        match_type,
        score_home,
        score_away,
        scorer,
    }: CreateDto): Promise<ResInterface> {
        try {
            await this.matchesRepository.createMatch({
                match_day,
                home_away,
                match_type,
                score_home,
                score_away,
                scorer,
            })
            return { status: 200, msg: '매치가 생성되었어요' }
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async fixMatch(matchObj): Promise<ResInterface> {
        try {
            await this.matchesRepository.fixMatch(matchObj)
            return { status: 200, msg: '매치가 수정되었어요' }
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
}
