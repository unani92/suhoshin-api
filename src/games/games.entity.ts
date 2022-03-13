import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Games extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    match_day: Date

    @Column({ default: null })
    other: string

    @Column({ type: 'tinyint', default: 0 })
    home_away: number

    @Column({ default: 0 })
    match_type: number

    @Column({ default: null })
    score_us: number

    @Column({ default: null })
    score_other: number

    @Column({ default: null })
    scorer: string

    @CreateDateColumn()
    created_at: Date
}
