import { EntityRepository, MoreThan, Repository } from 'typeorm'
import { Games } from './games.entity'
import { CreateDto } from './dto/create.dto'

@EntityRepository(Games)
export class GamesRepository extends Repository<Games> {
    async getAll(day?: Date): Promise<Games[]> {
        return await this.find({
            where: day ? { match_day: MoreThan(day) } : {},
            order: { id: 'ASC' },
        })
    }

    async createMatch({
        match_day,
        other,
        home_away,
        match_type,
        score_us,
        score_other,
        scorer,
    }: CreateDto): Promise<Games> {
        const match = await this.create({
            match_day,
            other,
            home_away,
            match_type,
            score_us,
            score_other,
            scorer,
        })
        this.save(match)
        return match
    }

    async fixMatch(id, matchObj): Promise<Games> {
        const match = await this.findOne({ id })
        Object.keys(matchObj).forEach((key) => {
            match[key] = matchObj[key]
        })

        await this.save(match)
        return match
    }
}
