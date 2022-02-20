import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Groups extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: null })
    logo_img: string

    @Column({ default: null })
    intro_shorten: string

    @Column({ type: 'mediumtext', default: null })
    intro: string

    @Column({ default: null })
    sns: string

    @Column({ default: null })
    homepage: string

    @Column({ default: 1 })
    enabled: number

    @CreateDateColumn()
    created_at: Date
}
