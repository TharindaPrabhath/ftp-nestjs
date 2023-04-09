import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ftp from 'basic-ftp';

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

  async uploadFile() {
    //
  }
}
