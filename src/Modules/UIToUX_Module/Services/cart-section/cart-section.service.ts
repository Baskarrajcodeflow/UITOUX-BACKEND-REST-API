import { HttpStatus, Injectable } from '@nestjs/common';
import { AddProductToCart, UpdateCart } from 'src/Dto/carts.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class CartSectionService {
  //add product to cart
  AddProductToCart = async (
    addProductToCart: AddProductToCart,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const cartTable = `cart`;
      const addProductToCartData = {
        customer_id: addProductToCart.customer_id,
        quantity: addProductToCart.quantity,
        total_price: addProductToCart.total_price,
        product_id: addProductToCart.product_id,
      };
      await dbConnection.query(`INSERT INTO ${dbName}.${cartTable} SET ?`, [
        addProductToCartData,
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: `Added Product To The Cart Successfully!`,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Adding Product To The Cart!`,
      };
    }
  };
  //Get product From cart
  GetProductsFromCartBasedOnCustomer = async (
    customer_id: number,
  ): Promise<any> => {
    try {
      const dbName = `uitouxdb`;
      const cartTable = `cart`;
      const productsTable = `products`;

      const GetProductsFromCart = await dbConnection.query(`
      SELECT * FROM ${dbName}.${cartTable}
      LEFT JOIN ${dbName}.${productsTable} 
      ON 
      ${cartTable}.product_id=${productsTable}.product_id
      WHERE ${cartTable}.customer_id = ${customer_id}
      `);
      return {
        statusCode: HttpStatus.OK,
        message: `Successfully fetched Blogs from the database!`,
        data: GetProductsFromCart,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to get data from the server`,
      };
    }
  };
  //Update product to cart
  UpdateProductQuantity = async (UpdateCart: UpdateCart) => {
    // TODO : Implement this method for updating product quantity in the cart based on user request
    try {
      const dbName = `uitouxdb`;
      const tableName = `cart`;
      const UpdateProductQuantity = {
        quantity: UpdateCart.quantity,
        total_price: UpdateCart.total_price,
      };
      await dbConnection.query(
        `UPDATE ${dbName}.${tableName} SET ? WHERE cart_id = ? AND  customer_id=?`,
        [UpdateProductQuantity, UpdateCart.cart_id, UpdateCart.customer_id],
      );
      return {
        statusCode: HttpStatus.OK,
        message: `Updated Product To The Cart Successfully!`,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Updating Product To The Cart!`,
      };
    }
  };
  //Remove product From cart
  DeleteProductFromCart = async (
    cart_id: number,
    customer_id: number,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `cart`;
      const selectCartData = await dbConnection.query(
        `
      SELECT * FROM ${dbName}.${tableName} 
      WHERE cart_id = ? and customer_id = ?;
     `,
        [cart_id, customer_id],
      );

      if (selectCartData.length > 0) {
        await dbConnection.query(
          `DELETE FROM ${dbName}.${tableName} WHERE cart_id = ? AND  customer_id = ?`,
          [cart_id, customer_id],
        );
        return {
          statusCode: HttpStatus.OK,
          message: `The Product Deleted From Cart successfully!`,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Invalid Request!`,
        };
      }
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Deleting Product From Cart Post Try Again`,
      };
    }
  };
}
