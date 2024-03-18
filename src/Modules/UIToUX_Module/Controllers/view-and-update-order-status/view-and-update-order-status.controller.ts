import { Controller, Get, Put, Query } from '@nestjs/common';
import { ViewAndUpdateOrderStatusService } from '../../Services/view-and-update-order-status/view-and-update-order-status.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Check And Update Order Status')
@Controller('view-and-update-order-status')
export class ViewAndUpdateOrderStatusController {
  constructor(private checkOrderStatus: ViewAndUpdateOrderStatusService) {}
  //-------------------------Track User Order Status Controller----------------------//
  @Get('trackOrderStatus')
  async checkUserLoginCredentials(
    @Query('customer_id') customer_id: number,
    @Query('order_id') order_id: number,
  ) {
    try {
      const checkOrderStatus = await this.checkOrderStatus.viewOrderStatus(
        customer_id,
        order_id,
      );
      return checkOrderStatus;
    } catch (error) {
      throw error;
    }
  }

  //-------------------------UPDATE User Order Status Controller----------------------//
  @Put('updateOrderStatus')
  async updateOrderStatus(
    @Query('status_name') status_name: string,
    @Query('order_id') order_id: number,
  ) {
    try {
      const updateOrderStatus = await this.checkOrderStatus.updateOrderStatus(
        status_name,
        order_id,
      );
      return updateOrderStatus;
    } catch (error) {
      throw error;
    }
  }

  //-------------------------Track User Order HISTORY FOR USER Controller----------------------//
  @Get('trackOrderHistoryBasedOnLoginCustomer')
  async viewOrderHistory(@Query('customer_id') customer_id: number) {
    try {
      const orderHistoryBasedOnLoginCustomer =
        await this.checkOrderStatus.orderHistoryBasedOnLoginCustomer(
          customer_id,
        );
      return orderHistoryBasedOnLoginCustomer;
    } catch (error) {
      throw error;
    }
  }
}
