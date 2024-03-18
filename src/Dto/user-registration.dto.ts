/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class userRegistrationDto {
  @ApiProperty()
  user_name: string;
  @ApiProperty()
  user_email_id: string;
  @ApiProperty()
  user_phone_number: number;
  @ApiProperty()
  user_password: string;
}
