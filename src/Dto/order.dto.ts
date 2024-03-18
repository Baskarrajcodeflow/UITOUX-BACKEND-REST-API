/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  customer_id: number;
  @ApiProperty()
  order_date: string;
  @ApiProperty()
  total_price: number;
  @ApiProperty()
  vehicle_id: number;
  @ApiProperty()
  make: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  part_name: string;
  @ApiProperty()
  quantity: number;
}
