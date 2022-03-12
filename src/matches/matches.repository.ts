import { EntityRepository, MoreThan, Repository } from 'typeorm'
import { Matches } from './matches.entity'
import { CreateDto } from './dto/create.dto'

@EntityRepository(Matches)
export class MatchesRepository extends Repository<Matches> {
    async getAll(day?: Date): Promise<Matches[]> {
        return await this.find({
            where: day ? { match_day: MoreThan(day) } : {},
            order: { id: 'ASC' },
        })
    }

    async createMatch({
        match_day,
        home_away,
        match_type,
        score_home,
        score_away,
        scorer,
    }: CreateDto): Promise<Matches> {
        const match = await this.create({
            match_day,
            home_away,
            match_type,
            score_home,
            score_away,
            scorer,
        })

        this.save(match)
        return match
    }

    async fixMatch(matchObj): Promise<Matches> {
        const match = await this.findOne({ id: matchObj.id })
        Object.keys(matchObj).forEach((key) => {
            match[key] = matchObj[key]
        })

        await this.save(match)
        return match
    }
}
