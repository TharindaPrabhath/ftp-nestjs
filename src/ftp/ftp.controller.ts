import { Controller, Post, UploadedFile, UseInterceptors, Query, Get, Patch, Body, Delete } from '@nestjs/common';
import { FtpService } from './ftp.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RenameFileDto } from './dto';

@Controller('ftp')
export class FtpController {
  constructor(private ftpService: FtpService) {}

  //   @Get('/download')
  //   async downloadFile(@Query('remote_path') remotePath: string) {
  //     const result = await this.ftpService.downloadFile(remotePath);
  //     return result;
  //   }

  @Get('/list')
  async list(@Query('path') path: string) {
    const result = await this.ftpService.list(path);
    return result;
  }

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('remote_path') remotePath: string) {
    await this.ftpService.uploadFile(file, remotePath);
  }

  @Patch('/rename-file')
  async renameFile(@Body() dto: RenameFileDto) {
    await this.ftpService.rename(dto.srcPath, dto.newPath);
  }

  @Delete('/remove-file')
  async removeFile(@Query('path') path: string) {
    await this.ftpService.removeFile(path);
  }

  @Delete('/remove-dir')
  async removeDir(@Query('path') path: string) {
    await this.ftpService.removeDir(path);
  }
}
