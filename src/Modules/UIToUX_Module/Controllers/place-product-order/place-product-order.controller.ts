import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PlaceProductOrderService } from '../../Services/place-product-order/place-product-order.service';
import { ApiTags } from '@nestjs/swagger';
import { OrderDto } from 'src/Dto/order.dto';
@ApiTags('Place Order')
@Controller('place-product-order')
export class PlaceProductOrderController {
  constructor(private orderService: PlaceProductOrderService) {}

  //-----------------Place Order For Products  By user----------------//
  @Post('PlaceProductOrder')
  async checkUserLoginCredentials(@Body() productData: OrderDto) {
    try {
      const checkUserLoginCredentials =
        await this.orderService.PlaceProductOrderService(productData);
      return checkUserLoginCredentials;
    } catch (error) {
      throw error;
    }
  }

  //-----------------View Ordered Products Based On Customer----------------//
  @Get('ViewYourOrders')
  async ViewYourOrders(@Query('customer_id') customer_id: number) {
    try {
      const ViewYourOrders = await this.orderService.ViewYourProductDetails(
        customer_id,
      );
      return ViewYourOrders;
    } catch (error) {
      throw error;
    }
  }
}
