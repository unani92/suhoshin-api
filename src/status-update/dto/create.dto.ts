import { IsNotEmpty } from 'class-validator'
import { Groups } from '../../groups/groups.entity'

export class UserStatusCreateDto {
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    group: Groups

    thumbnail?: string
}
