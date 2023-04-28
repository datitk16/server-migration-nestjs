import { Injectable, Logger } from "@nestjs/common";
import { TemplateService } from "../templates/service";
import { TemplateRepository } from "../templates/repository";
import { PreviewEmployeeDto } from "./dto";
import { EmployeeHtml } from "../templates/html/employee/html";
const ejs = require('ejs');

@Injectable()
export class EmployeeTemnplateSerivce {

    private logger = new Logger();

    constructor(
        // private readonly templateRepository: TemplateRepository,
        private readonly templateService: TemplateService,
    ) { }

    async preview(input: PreviewEmployeeDto) {
        try {
            const renderedHtml = this.renderHtml(EmployeeHtml, {
            });

            return this.templateService.convertHtmlToPdf(renderedHtml);
        } catch (error) {
            this.logger.error(`Render pdf failed. Input: ${JSON.stringify(input)}. Error: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    // TODO: define type of data base on type template( invoice, ...)
    private renderHtml(html: string, data) {
        return ejs.render(html, data);
    }
}


