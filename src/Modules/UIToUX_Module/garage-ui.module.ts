/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegistrationController } from './Controllers/registeration/registeration.controller';
import { RegistrationService } from './Services/registeration/registeration.service';
import { GetVehiclePartsController } from './Controllers/get-vehicle-parts/get-vehicle-parts.controller';
import { GetVehiclePartsService } from './Services/get-vehicle-parts/get-vehicle-parts.service';
import { PlaceProductOrderController } from './Controllers/place-product-order/place-product-order.controller';
import { PlaceProductOrderService } from './Services/place-product-order/place-product-order.service';
import { ViewAndUpdateOrderStatusController } from './Controllers/view-and-update-order-status/view-and-update-order-status.controller';
import { ViewAndUpdateOrderStatusService } from './Services/view-and-update-order-status/view-and-update-order-status.service';
import { BlogPostsController } from './Controllers/blog-posts/blog-posts.controller';
import { BlogPostsService } from './Services/blog-posts/blog-posts.service';
import { CartSectionController } from './Controllers/cart-section/cart-section.controller';
import { CartSectionService } from './Services/cart-section/cart-section.service';
import { WishlistController } from './Controllers/User-Wishlist/wishlist.controller';
import { WishlistService } from './Services/User-Wishlist/wishlist.service';

@Module({
  imports: [],
  controllers: [
    RegistrationController,
    GetVehiclePartsController,
    PlaceProductOrderController,
    ViewAndUpdateOrderStatusController,
    BlogPostsController,
    CartSectionController,
    WishlistController,
  ],
  providers: [
    RegistrationService,
    GetVehiclePartsService,
    PlaceProductOrderService,
    ViewAndUpdateOrderStatusService,
    BlogPostsService,
    CartSectionService,
    WishlistService,
  ],
  exports: [],
})
export class GarageUIAppModule {}
