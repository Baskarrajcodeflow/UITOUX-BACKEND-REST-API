import { Controller, Get, Query } from '@nestjs/common';
import { GetVehiclePartsService } from '../../Services/get-vehicle-parts/get-vehicle-parts.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Get Vehicle Parts')
@Controller('get-vehicle-parts')
export class GetVehiclePartsController {
  constructor(private VehiclePartsService: GetVehiclePartsService) {}

  //---------------------GET VEHICLE PARTS BY ID -------------------------//
  @Get('GetSelectedVehicleParts')
  async checkUserLoginCredentials(
    @Query('vehicle_id') vehicle_id: number,
    @Query('Part_name') Part_name: string,
  ) {
    try {
      const checkUserLoginCredentials =
        await this.VehiclePartsService.GetVehiclePartsService(
          vehicle_id,
          Part_name,
        );
      return checkUserLoginCredentials;
    } catch (error) {
      throw error;
    }
  }
  //----------------------------------------------------------------------//
}
