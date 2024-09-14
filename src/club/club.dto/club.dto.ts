/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class ClubDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly fechafundacion: Date; 

    @IsString()
    @IsNotEmpty()
    readonly imagen: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

}
