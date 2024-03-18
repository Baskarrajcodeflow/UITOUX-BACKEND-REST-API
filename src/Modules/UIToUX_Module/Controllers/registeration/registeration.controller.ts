/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegistrationService } from '../../Services/registeration/registeration.service';
import { userRegistrationDto } from 'src/Dto/user-registration.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User Registration Detail Api')
@Controller('UserRegistrationDetailApi')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}
  //--------------------------User Registration Controller-----------------------------//
  @Post('RegisterUser')
  async addUser(@Body() registrationData: userRegistrationDto) {
    try {
      const addUser = await this.registrationService.registerUserDetails(
        registrationData,
      );
      return addUser;
    } catch (error) {
      throw error;
    }
  }
  //--------------------------Check User Registration If User is registered Or Not Controller-------------------//
  @Get('checkUserLoginCredentials')
  async checkUserLoginCredentials(
    @Query('user_email_id') user_email_id: string,
    @Query('user_password') user_password: string,
  ) {
    const checkUserLoginCredentials =
      await this.registrationService.checkUserLoginCredentials(
        user_email_id,
        user_password,
      );
    return checkUserLoginCredentials;
  }
}
