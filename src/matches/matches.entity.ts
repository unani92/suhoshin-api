import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Matches extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    match_day: Date

    @Column({ type: 'tinyint', default: 0 })
    home_away: number

    @Column({ default: null })
    match_type: string

    @Column({ default: null })
    score_home: number

    @Column({ default: null })
    score_away: number

    @Column({ default: null })
    scorer: string

    @CreateDateColumn()
    created_at: Date
}
