import { HttpStatus, Injectable } from '@nestjs/common';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class ViewAndUpdateOrderStatusService {
  //--------------------------------------This service Is Used to Track The Order Status-----------------------//
  viewOrderStatus = async (
    customer_id: number,
    order_id: number,
  ): Promise<any> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `orderstatus`;
      const orders_table = `orders_table`;
      const viewOrderStatus = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName} table1
      LEFT JOIN
      ${dbName}.${orders_table} table2
      ON
      table1.order_id = table2.order_id
      WHERE
      table2.customer_id = ${customer_id}
      AND 
      table2.order_id = ${order_id}
      `);
      return {
        statusCode: HttpStatus.OK,
        message: `Get Data Successful`,
        data: viewOrderStatus,
      };
    } catch (error) {
      throw error;
    }
  };
  //--------------------------------------This service Is Used to Update The Order Status-----------------------//
  updateOrderStatus = async (
    status_name: string,
    order_id: number,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const orderStatusTable = `orderstatus`;
      await dbConnection.query(`
        UPDATE ${dbName}.${orderStatusTable}
        SET
        status_name = '${status_name}'
        WHERE
        order_id = ${order_id}
        `);
      return {
        statusCode: HttpStatus.OK,
        message: `Update Status Successful!`,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to Update Status!`,
      };
    }
  };
  //----------------This service Is Used to Get All The Order Status Based On Customer-----------------------//
  orderHistoryBasedOnLoginCustomer = async (customer_id: number) => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `orderstatus`;
      const orders_table = `orders_table`;
      const viewOrderHistory = await dbConnection.query(`
          SELECT * FROM ${dbName}.${tableName} table1
          LEFT JOIN
          ${dbName}.${orders_table} table2
          ON
          table1.order_id = table2.order_id
          WHERE
          table2.customer_id = ${customer_id}
          `);
      return {
        statusCode: HttpStatus.OK,
        message: `Get Data Successful`,
        data: viewOrderHistory,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Fetching Data`,
      };
    }
  };
  //------------------------------------------------------------------------------------------------------------//
}
