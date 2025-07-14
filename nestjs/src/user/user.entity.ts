import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ nullable: false })
    phone: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false, default: 'user' })
    role: string
}
