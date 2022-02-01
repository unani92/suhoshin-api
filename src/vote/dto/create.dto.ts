import { IsNotEmpty } from 'class-validator'

// @ts-ignore
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
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    vote_id: number

    @IsNotEmpty()
    vote_content_id: number
}
