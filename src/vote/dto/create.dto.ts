import { IsNotEmpty } from 'class-validator'

export class VoteCreateDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    expire_at: Date

    thumbnail?: string

    voteContents?: any
}

export class VoteContentCreateDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string
}

export class VoteUserCreateDto {
    user_id?: number

    @IsNotEmpty()
    vote_id: number

    @IsNotEmpty()
    vote_content_id: number
}

export class VoteUserFixDto {
    id: number
    vote_id: number
    vote_content_id: number
}
