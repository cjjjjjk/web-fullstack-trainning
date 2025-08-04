// src/entities/class.entity.ts
import { Student } from '../student/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    // Lazy: không tự load khi gọi entity class, cần relations: [students] để load quan hệ student
    @OneToMany(() => Student, (student) => student.class)
    students: Student[];
}
