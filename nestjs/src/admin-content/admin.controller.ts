import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('admin')
// Bắt buộc phải có jwt, role check để sử dụng controller
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {

    constructor(private adminService: AdminService) { }
    @Get('get-content')
    @Roles('admin') // role admin flag
    async getAdminContent(): Promise<any> {
        return this.adminService.getContentADmin();
    }
}
