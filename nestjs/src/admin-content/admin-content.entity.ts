import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;
}
