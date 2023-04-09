import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';

@Injectable()
export class FtpService {
  private client: ftp.Client;

  constructor(private configService: ConfigService) {
    this.client = new ftp.Client();
    this.client.ftp.verbose = configService.get('NODE_DEV') === 'production' ? false : true;
  }

  private async connect() {
    this.client.access({
      host: this.configService.get('FTP_HOST'),
      user: this.configService.get('FTP_USER'),
      password: this.configService.get('FTP_PASSWORD'),
      port: this.configService.get<number>('FTP_PORT'),
      secure: this.configService.get<boolean>('FTP_SECURE')
    });
  }

  async uploadFile(file: Readable, remotePath: string) {
    if (this.client.closed) await this.connect();
    const result = await this.client.uploadFrom(file, remotePath);
    return result;
  }

  async list(path: string) {
    if (this.client.closed) await this.connect();
    const result = await this.client.list(path);
    return result;
  }

  async rename(srcPath: string, newPath: string) {
    if (this.client.closed) await this.connect();
    const result = await this.client.rename(srcPath, newPath);
    return result;
  }

  async removeFile(path: string) {
    if (this.client.closed) await this.connect();
    const result = await this.client.remove(path);
    return result;
  }

  async removeDir(path: string) {
    if (this.client.closed) await this.connect();
    const result = await this.client.removeDir(path);
    return result;
  }
}
