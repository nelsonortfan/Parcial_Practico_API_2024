/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClubSocioService } from './club-socio.service';
import { ClubEntity } from '../club/club.entity';
import { Repository } from 'typeorm';
import { SocioEntity } from '../socio/socio.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ClubSocioService', () => {
  let service: ClubSocioService;
  let clubRepository: Repository<ClubEntity>;
  let socioRepository: Repository<SocioEntity>;
  let club: ClubEntity;
  let sociosList : SocioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubSocioService],
    }).compile();

    service = module.get<ClubSocioService>(ClubSocioService);
    clubRepository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
    socioRepository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    socioRepository.clear();
    clubRepository.clear();

    sociosList = [];
    for(let i = 0; i < 5; i++){
        const socio: SocioEntity = await socioRepository.save({
          nombre: faker.company.name(),                
          correoelectronico: faker.internet.email(),
          fechanacimiento: faker.date.anytime(),
        })
        sociosList.push(socio);
    }

    club = await clubRepository.save({
      nombre: faker.company.name(),                
      fechafundacion: faker.date.anytime(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.word(100),
      socios: sociosList
    })
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('addMemberToClub should add a member to a club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
        nombre: faker.company.name(),                
        correoelectronico: faker.internet.email(),
        fechanacimiento: faker.date.anytime()
    });

    const newClub: ClubEntity = await clubRepository.save({
      nombre: faker.company.name(),                
      fechafundacion: faker.date.anytime(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.word(100)
    })

    const result: ClubEntity = await service.addMemberToClub(newClub.id, newSocio.id);
    
    expect(result.socios.length).toBe(1);
    expect(result.socios[0]).not.toBeNull();
    expect(result.socios[0].nombre).toBe(newSocio.nombre)
    expect(result.socios[0].correoelectronico).toBe(newSocio.correoelectronico)
  });


  it('addMemberToClub should thrown exception for an invalid member', async () => {
    const newClub: ClubEntity = await clubRepository.save({
      nombre: faker.company.name(),                
      fechafundacion: faker.date.anytime(),
      imagen: faker.image.url(),
      descripcion: faker.lorem.word(100)
    })
    await expect(() => service.addMemberToClub(newClub.id, "0")).rejects.toHaveProperty("message", "The socio with the given id was not found");
  });


});
