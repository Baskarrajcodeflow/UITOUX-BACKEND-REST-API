import { HttpStatus, Injectable } from '@nestjs/common';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class GetVehiclePartsService {
  //---------This Service Is Used To Fetch All The Vehicle parts--------------------//
  GetVehiclePartsService = async (
    vehicle_id: number,
    Part_name: string,
  ): Promise<any> => {
    try {
      const dbName = `uitouxdb`;

      const GetVehicleParts = await dbConnection.query(`
      SELECT 
      vehicle_table.vehicle_id,
      vehicle_table.make,
      vehicle_table.model,
      vehicle_table.year,
      vehicle_table.color,
      vehicle_part_table.part_number,
      vehicle_part_table.name AS part_name,
      vehicle_part_table.description AS part_description,
      parttype.type_name,
      parttype.price
  FROM 
  ${dbName}.vehicle_table
  JOIN 
      ${dbName}.vehicle_part_table ON vehicle_table.vehicle_id = vehicle_part_table.vehicle_id
  JOIN 
      ${dbName}.PartType ON vehicle_part_table.part_number = PartType.part_number
  WHERE 
  vehicle_table.vehicle_id = ${vehicle_id}
  AND vehicle_part_table.name = '${Part_name}'
  OR vehicle_part_table.part_number = '${Part_name}'

      `);

      return {
        statusCode: HttpStatus.OK,
        message: `Get Data Successful`,
        data: GetVehicleParts,
      };
    } catch (error) {
      throw error;
    }
  };
  //--------------------------------------------------------------------------------//
}
