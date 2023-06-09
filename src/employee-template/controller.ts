import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { EmployeeTemnplateSerivce } from "./service";
import { Response } from 'express';
import { PreviewEmployeeDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('employee')
export class EmployeeTemplateControler {
    constructor(private readonly service: EmployeeTemnplateSerivce) { }


    @ApiOkResponse()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiTags('Templates')
    @Post('preview')
    async previewInvoice(@Body() input: PreviewEmployeeDto, @Res() res: Response) {
        try {
            const result = await this.service.preview(input);
            res.header('Content-type', 'application/pdf').send(result);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.stack);
        }
    }
}
