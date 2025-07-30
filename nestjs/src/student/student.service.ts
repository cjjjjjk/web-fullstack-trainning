import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { NumericType, Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { error } from 'console';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepo: Repository<Student>,
    ) { }

    async createNewStudent(newStudent: CreateStudentDto): Promise<any> {
        try {
            // check duplicate
            const newMssv = newStudent.mssv;
            const newMail = newStudent.email
            const isMssvExist = await this.studentRepo.findOneBy({ mssv: newMssv })
            const isMailExist = await this.studentRepo.findOneBy({ email: newMail })

            if (isMailExist || isMssvExist) {
                const errors: string[] = [];
                const fieldErrors: { [key: string]: string } = {};

                if (isMailExist) {
                    errors.push('email');
                    fieldErrors.email = 'email existed';
                }

                if (isMssvExist) {
                    errors.push('mssv');
                    fieldErrors.mssv = 'mssv existed';
                }

                return {
                    isSuccess: false,
                    errors,
                    ...fieldErrors,
                    message: 'create student fail'
                };
            }

            // create
            const repoRes = await this.studentRepo.save(newStudent);

            return {
                isSuccess: true,
                data: repoRes
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                message: 'Create new student Error',
                error: error.message || error
            };
        }
    }

    // Gets
    async getAllStudent(pagination: { page: number; limit: number }): Promise<{
        isSuccess: boolean;
        data: Student[];
        totalStudent?: number,
        totalPage?: number,
        error?: any;
        message?: string;
    }> {
        const { page, limit } = pagination;

        try {
            const [allStudents, totalStudent] = await Promise.all([
                this.studentRepo.find({
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                this.studentRepo.count()
            ]);

            const totalPage = Math.ceil(totalStudent / limit);

            return {
                isSuccess: true,
                data: allStudents,
                totalStudent,
                totalPage
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                data: [],
                message: 'get all students Error',
                error: error.message || error,
            };
        }
    }


    async getStudentByMssv(mssv: string): Promise<{
        isSuccess: boolean,
        data: Student | {},
        error?: any,
        message?: string
    }> {
        try {
            const student = await this.studentRepo.findOneBy({ mssv });

            if (student) {
                return {
                    isSuccess: true,
                    data: student,
                    message: 'Successfully'
                };
            } else {
                return {
                    isSuccess: false,
                    data: {},
                    message: 'Student not found'
                };
            }
        } catch (error: any) {
            return {
                isSuccess: false,
                data: {},
                message: 'Get student by mssv error',
                error: error.message || error
            };
        }
    }

    async updateStudent(mssv: string, updateStudent: UpdateStudentDto): Promise<any> {
        try {
            const student = await this.studentRepo.findOneBy({ mssv });

            if (!student) {
                return {
                    isSuccess: false,
                    data: {},
                    message: 'Student not found',
                };
            }

            const newMail = updateStudent.email;
            if (newMail && newMail !== student.email) {
                const isMailExist = await this.studentRepo.findOneBy({ email: newMail });
                if (isMailExist) {
                    return {
                        isSuccess: false,
                        errors: ['email'],
                        email: 'email existed',
                        message: 'create student fail'
                    };
                }
            }

            const updated = this.studentRepo.merge(student, updateStudent);
            const result = await this.studentRepo.save(updated);

            return {
                isSuccess: true,
                data: result,
                message: 'updated successfully',
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                data: {},
                message: 'Update student error',
                error: error.message || error,
            };
        }
    }

    async filterStudents(
        filters: { name?: string; mssv?: string; address?: string; email?: string },
        pagination: { page: number; limit: number },
        sort: {
            sortField: 'name' | 'mssv' | 'address' | 'email';
            sortType: 'asc' | 'desc';
        } = {
                sortField: 'name',
                sortType: 'asc'
            }
    ): Promise<{
        isSuccess: boolean;
        data: Student[];
        totalStudent: number;
        totalPage: number;
        error?: any;
        message?: string;
    }> {
        const { page, limit } = pagination;
        const { sortField, sortType } = sort;
        try {
            const query = this.studentRepo.createQueryBuilder('student');

            if (filters.name) {
                query.andWhere('student.name LIKE :name', { name: `%${filters.name}%` });
            }
            if (filters.mssv) {
                query.andWhere('student.mssv LIKE :mssv', { mssv: `%${filters.mssv}%` });
            }
            if (filters.address) {
                query.andWhere('student.address LIKE :address', { address: `%${filters.address}%` });
            }
            if (filters.email) {
                query.andWhere('student.email LIKE :email', { email: `%${filters.email}%` });
            }

            const allowedFields = ['name', 'mssv', 'address', 'email'];
            const field = allowedFields.includes(sortField) ? sortField : 'name';
            const order = sortType.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            if (field == 'name') {
                query.orderBy(`SUBSTRING_INDEX(student.name, ' ', -1)`, order);
            } else {
                query.orderBy(`student.${field}`, order);
            }

            const [students, totalStudent] = await Promise.all([
                query.skip((page - 1) * limit).take(limit).getMany(),
                query.getCount()
            ]);

            const totalPage = Math.ceil(totalStudent / limit);

            return {
                isSuccess: true,
                data: students,
                message: "filter and sort",
                totalStudent,
                totalPage
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                data: [],
                totalStudent: 0,
                totalPage: 0,
                message: 'filter students error',
                error: error.message || error
            };
        }
    }


    async deleteStudent(mssv: string) {
        try {
            const result = await this.studentRepo.delete({ mssv });
            if (result.affected === 0) {
                return {
                    isSuccess: false,
                    message: 'student not found!'
                }
            }
            return {
                isSuccess: true,
                message: 'student deleted successfully'
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                message: error.message
            }
        }
    }
}
