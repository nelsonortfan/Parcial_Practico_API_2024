/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class SocioDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
   
    @IsString()
    @IsNotEmpty()
    readonly correoelectronico: string;
  
    @IsString()
    @IsNotEmpty()
    readonly fechanacimiento: Date;


}
