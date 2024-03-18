/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class UserWishList {
  @ApiProperty()
  customer_id: number;
  @ApiProperty()
  product_id: number;
}
