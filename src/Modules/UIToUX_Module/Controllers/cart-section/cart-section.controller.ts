import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CartSectionService } from '../../Services/cart-section/cart-section.service';
import { AddProductToCart, UpdateCart } from 'src/Dto/carts.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User Cart Api Section')
@Controller('cart-section')
export class CartSectionController {
  constructor(private cartSectionService: CartSectionService) {}

  //-----------------------Add Product To Cart For Login user------------------//
  @Post('AddProductToCart')
  async AddProductToCart(@Body() addProductToCart: AddProductToCart) {
    try {
      const AddProductToCart = await this.cartSectionService.AddProductToCart(
        addProductToCart,
      );
      return AddProductToCart;
    } catch (error) {
      throw error;
    }
  }

  //-----------------------GET Product From Cart For Login user------------------//
  @Get('GetProductsFromCartBasedOnCustomer')
  async GetProductsFromCart(@Query('customer_id') customer_id: number) {
    try {
      const GetProductsFromCart =
        await this.cartSectionService.GetProductsFromCartBasedOnCustomer(
          customer_id,
        );
      return GetProductsFromCart;
    } catch (error) {
      throw error;
    }
  }

  //-----------------------UPDATE Product To Cart For Login user------------------//
  @Put('UpdateProductQuantity')
  async UpdateProductToCart(@Body() updateProductToCart: UpdateCart) {
    try {
      const UpdateProductQuantity =
        await this.cartSectionService.UpdateProductQuantity(
          updateProductToCart,
        );
      return UpdateProductQuantity;
    } catch (error) {
      throw error;
    }
  }

  //-----------------------REMOVE Product From Cart For Login user------------------//
  @Delete('DeleteProductQuantity')
  async DeleteProductToCart(
    @Query('cart_id') cart_id: number,
    @Query('customer_id') customer_id: number,
  ) {
    try {
      const DeleteProductQuantity =
        await this.cartSectionService.DeleteProductFromCart(
          cart_id,
          customer_id,
        );
      return DeleteProductQuantity;
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------------------//
}
