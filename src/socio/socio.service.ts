/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SocioEntity } from './socio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class SocioService {

    constructor(
        @InjectRepository(SocioEntity)
        private readonly socioRepository: Repository<SocioEntity>
    ){}

    async findAll(): Promise<SocioEntity []>{
        return await this.socioRepository.find({ relations: ["clubes"]})
    }

    async findOne(id: string): Promise<SocioEntity>{
        const socio : SocioEntity = await this.socioRepository.findOne({where: {id}, relations: ["clubes"]});

        if (!socio)
            throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);

        return socio;
    }

    async create(socio: SocioEntity): Promise<SocioEntity>{

        if(!socio.correoelectronico.includes("@"))
            throw new BusinessLogicException("This is not a valid email", BusinessError.PRECONDITION_FAILED);

        return await this.socioRepository.save(socio);
    }

    async update(id: string, socio: SocioEntity): Promise<SocioEntity>{

        if(!socio.correoelectronico.includes("@"))
            throw new BusinessLogicException("This is not a valid email", BusinessError.PRECONDITION_FAILED);

        const persistedSocio : SocioEntity = await this.socioRepository.findOne({where: {id}});
        if(!persistedSocio)
            throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);

        return await this.socioRepository.save({...persistedSocio, ...socio});
    }

    async delete(id: string){
        const socio : SocioEntity = await this.socioRepository.findOne({where: {id}});
        if(!socio)
            throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);

        return await this.socioRepository.remove(socio);
    }



}
