import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('List')
@ApiBearerAuth()
@Controller('list')
export class ListController {

    @Get("/all")
    getAllList(): Array<any> {
        return [];
    }

    @Get("/today")
    getListToday(): Array<any> {
        return [];
    }
}
