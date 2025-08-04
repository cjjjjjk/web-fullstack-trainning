import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ClassService, CreateClassDto } from './class.service';

@Controller('class')
export class ClassController {

    constructor(private classService: ClassService) { }

    @Post()
    async createNewClass(
        @Body() newClass: CreateClassDto
    ) {
        return await this.classService.createClass(newClass)
    }

    @Get()
    async filterStudents(
        @Query('name') name?: string,
        @Query('code') code?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sortField') sortField: 'name' | 'code' = 'name',
        @Query('sortType') sortType: 'asc' | 'desc' = 'asc'
    ): Promise<any> {
        const filters = { name, code };
        return await this.classService.getClassesByFilter(filters, { page, limit }, { sortField, sortType });
    }

    @Get('all')
    async getAllClass() {
        return await this.classService.getAllClass()
    }

    @Delete()
    async deleteClassByCode(
        @Query('code') code: string
    ) {
        return await this.classService.deleteClassByCode(code)
    }
}
