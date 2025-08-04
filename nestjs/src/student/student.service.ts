import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { NumericType, Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { error } from 'console';
import { Class } from 'src/class/class.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepo: Repository<Student>,
    ) { }

    async createNewStudent(newStudent: CreateStudentDto): Promise<any> {
        try {
            const { name, mssv, email, address } = newStudent;

            const errors: string[] = [];
            const fieldErrors: { [key: string]: string } = {};

            //  name,address
            if (!name || name.trim().length === 0) {
                errors.push('name');
                fieldErrors.name = 'name is required';
            } else if (name.length > 14) {
                errors.push('name');
                fieldErrors.name = 'name must be less than 14 characters';
            }
            if (address.length > 20) {
                errors.push('address');
                fieldErrors.address = 'address must be less than 20 characters';
            }

            // mssv
            if (!mssv || mssv.trim().length === 0) {
                errors.push('mssv');
                fieldErrors.mssv = 'mssv is required';
            } else {
                const isMssvExist = await this.studentRepo.findOneBy({ mssv });
                if (isMssvExist) {
                    errors.push('mssv');
                    fieldErrors.mssv = 'mssv existed';
                }
            }

            // Validate: email format + duplicate
            if (!email || email.trim().length === 0) {
                errors.push('email');
                fieldErrors.email = 'email is required';
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                errors.push('email');
                fieldErrors.email = 'invalid email format';
            } else {
                const isEmailExist = await this.studentRepo.findOneBy({ email });
                if (isEmailExist) {
                    errors.push('email');
                    fieldErrors.email = 'email existed';
                }
            }

            if (errors.length > 0) {
                return {
                    isSuccess: false,
                    errors,
                    ...fieldErrors,
                    message: 'Create student failed due to validation errors'
                };
            }

            // Create student
            const repoRes = await this.studentRepo.save(newStudent);

            return {
                isSuccess: true,
                data: repoRes
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                message: 'Create new student error',
                error: error.message || error
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
        filters: { name?: string; mssv?: string; classId?: string; address?: string; email?: string },
        pagination: { page: number; limit: number },
        sort: {
            sortField: 'name' | 'mssv' | 'class' | 'address' | 'email';
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
            const query = this.studentRepo.createQueryBuilder('student')
                .leftJoinAndSelect('student.class', 'class');

            // Filters
            if (filters.name) {
                query.andWhere('student.name LIKE :name', { name: `%${filters.name}%` });
            }
            if (filters.mssv) {
                query.andWhere('student.mssv LIKE :mssv', { mssv: `%${filters.mssv}%` });
            }
            if (filters.classId) {
                query.andWhere('student.class = :classId ', { classId: filters.classId })
            }
            if (filters.address) {
                query.andWhere('student.address LIKE :address', { address: `%${filters.address}%` });
            }
            if (filters.email) {
                query.andWhere('student.email LIKE :email', { email: `%${filters.email}%` });
            }

            const allowedFields = ['name', 'mssv', 'address', 'email', 'class'];
            const field = allowedFields.includes(sortField) ? sortField : 'name';
            const order = sortType.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

            if (field === 'name') {
                query.addSelect("SUBSTRING_INDEX(student.name, ' ', -1)", 'lastName');
                query.orderBy('lastName', order);
            } else if (field === 'class') {
                query.orderBy('class.name', order);
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
