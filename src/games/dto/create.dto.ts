import { IsNotEmpty } from 'class-validator'

export class CreateDto {
    @IsNotEmpty()
    match_day: string

    @IsNotEmpty()
    home_away: number

    @IsNotEmpty()
    other: string

    @IsNotEmpty()
    match_type: number

    score_us: number

    score_other: number

    scorer: string
}
