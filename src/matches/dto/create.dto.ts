import { IsNotEmpty } from 'class-validator'

export class CreateDto {
    @IsNotEmpty()
    match_day: string

    @IsNotEmpty()
    home_away: number

    @IsNotEmpty()
    match_type: string

    @IsNotEmpty()
    score_home: number

    @IsNotEmpty()
    score_away: number

    @IsNotEmpty()
    scorer: string
}
