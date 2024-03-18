import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderDto } from 'src/Dto/order.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class PlaceProductOrderService {
  //--------------------------------------This service Is Used to Order Products-----------------------//
  PlaceProductOrderService = async (
    productData: OrderDto,
  ): Promise<responseInterface> => {
    try {
      const {
        customer_id,
        vehicle_id,
        part_name,
        order_date,
        model,
        make,
        quantity,
        total_price,
      } = productData;
      const dbName = `uitouxdb`;
      const tableName = `Orders_Table`;
      const orderStatus = `orderstatus`;

      await dbConnection.query(`
      INSERT INTO ${dbName}.${tableName} 
      (customer_id,order_date,total_price,vehicle_id,make,model,part_name,quantity)
      VALUES
      (
      '${customer_id}',
      '${order_date}',
      '${total_price}',
      '${vehicle_id}',
      '${make}',
      '${model}',
      '${part_name}',
      '${quantity}'
      )
      `);

      await dbConnection.query(`
      INSERT INTO ${dbName}.${orderStatus} 
      (status_name,order_id)
      VALUES
      (
      'In Progress',(SELECT MAX(order_id) FROM ${dbName}.${tableName})
      )
      `);

      return {
        statusCode: HttpStatus.OK,
        message: `The Product has been successfully ordered`,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Adding Products Try Again`,
      };
    }
  };
  //--------------------------------------This service Is Used to View ALL Order Products-----------------------//
  ViewYourProductDetails = async (customer_id): Promise<any> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `Orders_Table`;
      const ViewYourOrders = await dbConnection.query(`
        SELECT * FROM ${dbName}.${tableName}
        WHERE
        customer_id = ${customer_id}
        `);
      if (ViewYourOrders.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: `Data Retrieved Successfully`,
          data: ViewYourOrders,
        };
      } else {
        return {
          message: `No Data Found`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to get the Data`,
      };
    }
  };
  //------------------------------------------------------------------------------------------------------------//
}
