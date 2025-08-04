import { Injectable } from '@nestjs/common';
import { Class } from './class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'


export interface CreateClassDto {
    name: string,
    code: string
}

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepo: Repository<Class>,
    ) { }

    async createClass(newClass: CreateClassDto): Promise<any> {
        try {
            const { name, code } = newClass;
            const errors: string[] = [];
            const fieldErrors: { [key: string]: string } = {};

            // name
            if (!name || name.trim().length === 0) {
                errors.push('name');
                fieldErrors.name = 'name is required';
            } else if (name.length > 20) {
                errors.push('name');
                fieldErrors.name = 'name must be less than 20 characters';
            }

            // code
            if (!code || code.trim().length === 0) {
                errors.push('code');
                fieldErrors.code = 'code is required';
            } else if (code.length > 6) {
                errors.push('code');
                fieldErrors.code = 'code must be less than 6 characters';
            } else {
                const isCodeExist = await this.classRepo.findOneBy({ code });
                if (isCodeExist) {
                    errors.push('code');
                    fieldErrors.code = 'code already exists';
                }
            }

            if (errors.length > 0) {
                return {
                    isSuccess: false,
                    errors,
                    ...fieldErrors,
                    message: 'Create class failed due to validation errors'
                };
            }

            const result = await this.classRepo.save(newClass);

            return {
                isSuccess: true,
                data: result
            };
        } catch (error: any) {
            return {
                isSuccess: false,
                message: 'Create class error',
                error: error.message || error
            };
        }
    }


    async getAllClass(): Promise<{
        isSuccess: boolean,
        classes: {
            id: number,
            name: string,
            code: string
        }[]
    }> {
        try {
            const result = await this.classRepo
                .createQueryBuilder('class')
                .select([
                    'class.id AS id',
                    'class.name AS name',
                    'class.code AS code'
                ])
                .getRawMany();

            return {
                isSuccess: true,
                classes: result.map(row => ({
                    id: row.id,
                    name: row.name,
                    code: row.code
                }))
            };
        } catch (error) {
            return {
                isSuccess: false,
                classes: []
            };
        }
    }


    async getClassesByFilter(
        filters: { name?: string; code?: string },
        pagination: { page: number; limit: number } = { page: 1, limit: 10 },
        sort: {
            sortField: 'name' | 'code';
            sortType: 'asc' | 'desc';
        } = {
                sortField: 'name',
                sortType: 'asc'
            }
    ): Promise<{
        isSuccess: boolean,
        classes: {
            id: number,
            name: string,
            code: string,
            totalStudent: number
        }[],
        pagination: {
            totalPage: number,
            totalClass: number
        }
    }> {
        try {
            const query = this.classRepo.createQueryBuilder('class')
                .leftJoin('class.students', 'student')
                .select([
                    'class.id AS id',
                    'class.name AS name',
                    'class.code AS code',
                    'COUNT(student.id) AS totalStudent'
                ])
                .groupBy('class.id');

            if (filters.name) {
                query.andWhere('class.name LIKE :name', { name: `%${filters.name}%` });
            }

            if (filters.code) {
                query.andWhere('class.code LIKE :code', { code: `%${filters.code}%` });
            }

            query.orderBy(`class.${sort.sortField}`, sort.sortType.toUpperCase() as 'ASC' | 'DESC');

            // Clone query to get total count
            const totalClass = await query.getCount();

            const result = await query
                .offset((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .getRawMany();

            return {
                isSuccess: true,
                classes: result.map(row => ({
                    id: row.id,
                    name: row.name,
                    code: row.code,
                    totalStudent: parseInt(row.totalStudent, 10)
                })),
                pagination: {
                    totalPage: Math.ceil(totalClass / pagination.limit),
                    totalClass
                }
            };
        } catch (error) {
            return {
                isSuccess: false,
                classes: [],
                pagination: {
                    totalPage: 0,
                    totalClass: 0
                }
            };
        }
    }

    async deleteClassByCode(code: string): Promise<{
        isSuccess: boolean,
        message: string
    }> {
        try {

            const classEntity = await this.classRepo.findOne({ where: { code }, relations: ['students'] });
            if (classEntity && classEntity.students.length > 0) {
                return {
                    isSuccess: false,
                    message: `Cannot delete class "${code}" because it has students.`
                };
            }

            const result = await this.classRepo.delete({ code });

            if (result.affected && result.affected > 0) {
                return {
                    isSuccess: true,
                    message: `Class with code "${code}" has been deleted successfully.`
                };
            } else {
                return {
                    isSuccess: false,
                    message: `No class found with code "${code}".`
                };
            }
        } catch (err: any) {
            return {
                isSuccess: false,
                message: `Failed to delete class: ${err.message || 'Unknown error'}`
            };
        }
    }

}
