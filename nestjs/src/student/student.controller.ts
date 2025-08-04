import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Class } from 'src/class/class.entity';

@Controller('student')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Post()
    async create(@Body() createStudenDto: CreateStudentDto) {
        const res = await this.studentService.createNewStudent(createStudenDto);
        return res
    }

    @Get('all')
    getAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.studentService.filterStudents({}, { page, limit });
    }


    @Get(':mssv')
    async getStudentByMssv(@Param('mssv') mssv: string): Promise<any> {
        return await this.studentService.getStudentByMssv(mssv);
    }

    @Patch('update')
    async updateStudent(@Query('mssv') mssv: string, @Body() updateStudent: UpdateStudentDto): Promise<any> {
        return await this.studentService.updateStudent(mssv, updateStudent)
    }

    @Roles('admin')
    @Delete('')
    async deleteStudent(@Query('mssv') mssv: string): Promise<any> {
        return this.studentService.deleteStudent(mssv)
    }

    @Get()
    async filterStudents(
        @Query('name') name?: string,
        @Query('mssv') mssv?: string,
        @Query('address') address?: string,
        @Query('email') email?: string,
        @Query('classId') classId?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sortField') sortField: 'name' | 'mssv' | 'class' | 'address' | 'email' = 'name',
        @Query('sortType') sortType: 'asc' | 'desc' = 'asc'
    ): Promise<any> {
        const filters = { name, mssv, classId, address, email };
        return await this.studentService.filterStudents(filters, { page, limit }, { sortField, sortType });
    }

}
