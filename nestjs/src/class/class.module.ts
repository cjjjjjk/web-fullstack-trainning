import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from './class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassService],
  controllers: [ClassController],
  exports: [ClassService]
})
export class ClassModule { }
