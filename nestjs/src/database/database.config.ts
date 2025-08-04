import { Student } from '../student/student.entity';
import { AdminContent } from '../admin-content/admin-content.entity';
import { User } from '../user/user.entity';
import { Class } from '../class/class.entity';
import 'dotenv/config';

export const databaseConfig = {
    type: 'mysql' as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, AdminContent, Student, Class],
    synchronize: false,
};