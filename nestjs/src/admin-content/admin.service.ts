import { Injectable } from '@nestjs/common';
import { GetADminContentDto } from './get-admincontent.dto';
import { AdminContent } from './admin-content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminContent)
        private adminContentRepo: Repository<AdminContent>,
    ) { }



    async getContentADmin(): Promise<GetADminContentDto> {
        const contentList: GetADminContentDto[] = await this.adminContentRepo.find()
        return contentList[Math.floor(Math.random() * contentList.length)];
    }
}
