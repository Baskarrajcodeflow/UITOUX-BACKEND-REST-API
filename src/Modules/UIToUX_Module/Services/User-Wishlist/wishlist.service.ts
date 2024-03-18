import { HttpStatus, Injectable } from '@nestjs/common';
import { UserWishList } from 'src/Dto/User-WishList.dto';
import { userRegistrationDto } from 'src/Dto/user-registration.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class WishlistService {
  //--------------------------------Create Or Add WishList For  User--------------------------------//
  CreateUserWishList = async (
    addUserWishListData: UserWishList,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const WishListTable = `wishlist`;
      const addUserWishList = {
        customer_id: addUserWishListData.customer_id,
        product_id: addUserWishListData.product_id,
      };

      const checkWishListIsAdded = await dbConnection.query(
        `
      SELECT * FROM ${dbName}.${WishListTable} WHERE customer_id=? AND product_id=?`,
        [addUserWishList.customer_id, addUserWishList.product_id],
      );
      if (checkWishListIsAdded.length < 1) {
        await dbConnection.query(
          `INSERT INTO ${dbName}.${WishListTable} SET ?,added_at = now()`,
          [addUserWishList],
        );
        return {
          statusCode: HttpStatus.OK,
          message: `Added Product To The WishList Successfully!`,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Product Already in the Wish List!`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Adding Product To The WishList!`,
      };
    }
  };
  //--------------------------------GET WishList For Specific User--------------------------------//
  GetUserWishList = async (customer_id: number): Promise<any> => {
    try {
      const dbName = `uitouxdb`;
      const WishListTable = `wishlist`;
      const productsTable = `products`;
      const GetUserWishList = await dbConnection.query(
        `
      SELECT * FROM ${dbName}.${WishListTable} 
      LEFT JOIN ${dbName}.${productsTable} ON ${WishListTable}.product_id=${productsTable}.product_id
      WHERE customer_id=? 
      `,
        [customer_id],
      );
      return {
        statusCode: HttpStatus.OK,
        message: `Successfully fetched Blogs from the database!`,
        data: GetUserWishList,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to get data from the server`,
      };
    }
  };
  //--------------------------------Remove WishList For Specific User--------------------------------//
  RemoveProductFromCart = async (
    product_id: number,
    customer_id: number,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const wishlistTable = `wishlist`;
      const selectWishListData = await dbConnection.query(
        `
      SELECT * FROM ${dbName}.${wishlistTable} 
      WHERE product_id = ? and customer_id = ?;
     `,
        [product_id, customer_id],
      );

      if (selectWishListData.length > 0) {
        await dbConnection.query(
          `DELETE FROM ${dbName}.${wishlistTable} WHERE product_id = ? AND  customer_id = ?`,
          [product_id, customer_id],
        );
        return {
          statusCode: HttpStatus.OK,
          message: `The Product Deleted From Wish List successfully!`,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Invalid Request!`,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Deleting Product From Wish List Post Try Again`,
      };
    }
  };
  //----------------------------------------------------------------------------------------------------//
}
