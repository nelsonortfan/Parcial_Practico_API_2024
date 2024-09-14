/* eslint-disable prettier/prettier */

import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SocioDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
   
    @IsEmail()
    @IsNotEmpty()
    readonly correoelectronico: string;
  
    @IsDate()
    @IsNotEmpty()
    readonly fechanacimiento: Date;


}
