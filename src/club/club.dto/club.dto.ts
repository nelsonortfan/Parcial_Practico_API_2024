/* eslint-disable prettier/prettier */
import { IsDate, Max } from 'class-validator';
import { IsNotEmpty, IsString } from "class-validator";

export class ClubDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechafundacion: Date; 

    @IsString()
    @IsNotEmpty()
    readonly imagen: string;

    @IsString()
    @IsNotEmpty()
    @Max(100)
    readonly descripcion: string;

}
