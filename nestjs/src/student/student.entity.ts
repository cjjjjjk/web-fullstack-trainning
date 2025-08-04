import { Class } from '../class/class.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@Unique(['mssv'])
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mssv: string

    @Column()
    address: string;

    @Column()
    email: string

    @ManyToOne(() => Class, (cls) => cls.students, { eager: true })
    class: Class; // -> classID trong mysql
}
