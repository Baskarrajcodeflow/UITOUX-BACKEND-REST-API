/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { userRegistrationDto } from 'src/Dto/user-registration.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class RegistrationService {
  constructor() {}
  //--------------------------User Registration Service-----------------------------//
  registerUserDetails = async (
    userRegistration: userRegistrationDto,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `user_registration_table`;
      //User Data Object Destructured
      const { user_name, user_email_id, user_phone_number, user_password } =
        userRegistration;

      const checkUserEmailRegisteredOrNot = await dbConnection.query(`
        SELECT * FROM uitouxdb.user_registration_table
        WHERE
        user_email_id = '${user_email_id}'
      `);

      const checkUserPhoneRegisteredOrNot = await dbConnection.query(`
        SELECT * FROM uitouxdb.user_registration_table
        WHERE
        user_phone_number = '${user_phone_number}'
      `);

      const emailRegistered = checkUserEmailRegisteredOrNot.length > 0;
      const phoneRegistered = checkUserPhoneRegisteredOrNot.length > 0;
      //If User Email and Phone is already registered then return the error message otherwise continue to next condition
      if (!emailRegistered && !phoneRegistered) {
        await dbConnection.query(`
          INSERT INTO ${dbName}.${tableName}
          (user_name,
          user_email_id,
          user_phone_number,
          user_password)
          VALUES
          (
          '${user_name}',
          '${user_email_id}',
          '${user_phone_number}',
          '${user_password}'
          )
        `);
        return {
          statusCode: HttpStatus.OK,
          message: 'Successfully registered the User Details!',
        };
      } else if (emailRegistered) {
        return {
          statusCode: HttpStatus.OK,
          message:
            'Email Already Registered. Please try again with a different email!',
        };
      } else if (phoneRegistered) {
        return {
          statusCode: HttpStatus.OK,
          message:
            'Phone Number Already Registered. Please try again with a different phone number!',
        };
      }
    } catch (error) {
      throw error;
    }
  };

  //--------------------------Login Service-----------------------------//
  checkUserLoginCredentials = async (
    user_email_id: string,
    user_password: string,
  ): Promise<responseInterface | any> => {
    try {
      //  Fetching data from database using raw query And Check If The User Can Logged In  Or Not
      const dbName = `uitouxdb`;
      const tableName = `user_registration_table`;
      const loginUserNameCheck = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName}
      WHERE
      user_email_id = '${user_email_id}'
      AND user_password = '${user_password}'
      `);
      const loginUserPasswordCheck = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName}
      WHERE
      user_password = '${user_password}'
      AND user_email_id = '${user_email_id}'
      `);
      if (
        loginUserNameCheck?.length === 0 &&
        loginUserPasswordCheck?.length === 0
      ) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Request, Please Try Again!',
        };
      } else if (loginUserNameCheck.length === 0) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid EmailID Try Again!',
        };
      } else if (loginUserPasswordCheck.length === 0) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Password Try Again!',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Login Success!',
        };
      }
    } catch (error) {
      throw error;
    }
  };
  //-----------------------------------------------------------------------------------------//
}
