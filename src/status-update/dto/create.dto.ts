import { IsNotEmpty } from 'class-validator'
import { Groups } from '../../groups/groups.entity'
import { User } from '../../auth/auth.entity'

export class UserStatusCreateDto {
    @IsNotEmpty()
    user: User

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    group: Groups

    thumbnail?: string
}
