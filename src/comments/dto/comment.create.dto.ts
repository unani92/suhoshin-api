import { IsNotEmpty } from 'class-validator'
import { Posts } from '../../post/post.entity'
import { User } from '../../auth/auth.entity'

export class CommentCreateDto {
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    secret: number

    @IsNotEmpty()
    post: Posts

    @IsNotEmpty()
    user: User
}
