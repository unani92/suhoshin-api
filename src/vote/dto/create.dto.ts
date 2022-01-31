import { IsNotEmpty } from 'class-validator'

export class VoteCreateDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    expire_at: Date

    thumbnail?: string | Blob
}

export class VoteContentCreateDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string
}

export class VoteUserCreateDto {
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    vote_id: number

    @IsNotEmpty()
    vote_content_id: number
}
