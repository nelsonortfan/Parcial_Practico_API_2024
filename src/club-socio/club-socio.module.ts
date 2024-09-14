/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';

@Module({
  providers: [ClubSocioService],
  imports: [TypeOrmModule.forFeature([ClubEntity, SocioEntity])],
})
export class ClubSocioModule {}
