import { IsNotEmpty } from 'class-validator'

export class ReadDto {
    @IsNotEmpty()
    uuid: number
}
