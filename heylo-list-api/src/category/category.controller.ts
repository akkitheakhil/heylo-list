import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
    @Get("/all")
    getAllList(): Array<any> {
        return [];
    }
}
