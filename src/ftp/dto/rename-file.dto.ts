import { IsNotEmpty, IsString } from 'class-validator';

export class RenameFileDto {
  @IsString()
  @IsNotEmpty()
  srcPath: string;

  @IsString()
  @IsNotEmpty()
  newPath: string;
}
