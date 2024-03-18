import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { WishlistService } from '../../Services/User-Wishlist/wishlist.service';
import { UserWishList } from 'src/Dto/User-WishList.dto';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User Wish List Api')
@Controller('wishlist')
export class WishlistController {
  constructor(private userWishList: WishlistService) {}
  //----------------------Add Product to wishlist ----------------//
  @Post('CreateUserWishList')
  async CreateUserWishList(@Body() addUserWishList: UserWishList) {
    try {
      const CreateUserWishList = await this.userWishList.CreateUserWishList(
        addUserWishList,
      );
      return CreateUserWishList;
    } catch (error) {
      throw error;
    }
  }
  //------------------------Get All Wishlists of a particular user----------//
  @Get('GetUserWishList')
  async GetUserWishList(@Query('customer_id') customer_id: number) {
    try {
      const GetUserWishList = await this.userWishList.GetUserWishList(
        customer_id,
      );
      return GetUserWishList;
    } catch (error) {
      throw error;
    }
  }
  //-----------------------Delete the product from wishlist------------------//
  @Delete('RemoveProductFromWishList')
  async DeleteProductToCart(
    @Query('product_id') product_id: number,
    @Query('customer_id') customer_id: number,
  ) {
    try {
      const RemoveProductFromWishList =
        await this.userWishList.RemoveProductFromCart(product_id, customer_id);
      return RemoveProductFromWishList;
    } catch (error) {
      throw error;
    }
  }
  //-------------------------------------------------------------------------//
}
