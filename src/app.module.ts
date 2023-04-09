import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { FtpModule } from './ftp/ftp.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FtpModule],
  controllers: [AppController]
})
export class AppModule {}
