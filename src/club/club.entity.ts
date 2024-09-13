/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClubEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    fechafundacion: Date; 

    @Column()
    image: string;

    @Column()
    descripcion: string;

}
