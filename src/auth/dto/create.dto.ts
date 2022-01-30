import { IsNotEmpty } from 'class-validator'

export class CreateDto {
    @IsNotEmpty()
    uuid: number
    @IsNotEmpty()
    nickname: string

    thumbnail: string
    email: string | null
}
