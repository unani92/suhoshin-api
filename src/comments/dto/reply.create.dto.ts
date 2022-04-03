import { IsNotEmpty } from 'class-validator'
import { Comments } from '../comments.entity'
import { User } from '../../auth/auth.entity'

export class ReplyCreateDto {
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    secret: number

    @IsNotEmpty()
    comment: Comments

    @IsNotEmpty()
    user: User
}
