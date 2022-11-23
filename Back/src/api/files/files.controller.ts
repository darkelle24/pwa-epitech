import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, StreamableFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '@Roles/roles';
import { Auth } from '@User/auth/other/auth.decorator';
import { AddDescription } from '@Helper/add-description.decorator';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get('download/:id')
  @AddDescription('Download file')
  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  async download(@Param('id') id: string, @Res({ passthrough: true }) response: Express.Response) {
    let file = await this.filesService.findOne(id);
    const fileStream = this.filesService.fileStream(file.path);
    (response as any).attachment(file.name);
    return new StreamableFile(fileStream, {type: file.mimetype});
  }

  @Get('show/:id')
  @AddDescription('Show file')
  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  async show(@Param('id') id: string, @Res({ passthrough: true }) response: Express.Response) {
    let file = await this.filesService.findOne(id);
    const fileStream = this.filesService.fileStream(file.path);
    return new StreamableFile(fileStream, {type: file.mimetype});
  }

  @Post()
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Delete(':id')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
