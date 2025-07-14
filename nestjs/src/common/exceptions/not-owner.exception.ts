import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDelOther extends HttpException {
    constructor(message = 'You are not allowed to delete other users') {
        super(
            {
                statusCode: HttpStatus.FORBIDDEN,
                message,
                error: 'Forbidden',
            },
            HttpStatus.FORBIDDEN,
        );
    }
}
