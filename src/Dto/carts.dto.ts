/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCart {
  @ApiProperty()
  customer_id: number;
  @ApiProperty()
  product_id: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  total_price: number;
}

export class UpdateCart {
  @ApiProperty()
  customer_id: number;
  @ApiProperty()
  product_id: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  total_price: number;
  @ApiProperty()
  cart_id: number;
}
