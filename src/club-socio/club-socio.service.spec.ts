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


  it('addMemberToClub should throw an exception for an invalid club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.company.name(),                
      correoelectronico: faker.internet.email(),
      fechanacimiento: faker.date.anytime()
    });

    await expect(() => service.addMemberToClub("0", newSocio.id)).rejects.toHaveProperty("message", "The club with the given id was not found");
  });


  it('findMemberFromClub should return socio by club', async () => {
    const socio: SocioEntity = sociosList[0];
    const storedSocio: SocioEntity = await service.findMemberFromClub(club.id, socio.id, )
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.nombre).toBe(socio.nombre);
    expect(storedSocio.correoelectronico).toBe(socio.correoelectronico);
  });


  it('findMemberFromClub should throw an exception for an invalid socio', async () => {
    await expect(()=> service.findMemberFromClub(club.id, "0")).rejects.toHaveProperty("message", "The socio with the given id was not found"); 
  });


  it('findMemberFromClub should throw an exception for an invalid club', async () => {
    const socio: SocioEntity = sociosList[0]; 
    await expect(()=> service.findMemberFromClub("0", socio.id)).rejects.toHaveProperty("message", "The club with the given id was not found"); 
  });


  it('findMemberFromClub should throw an exception for a socio not associated to the club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.company.name(),                
      correoelectronico: faker.internet.email(),
      fechanacimiento: faker.date.anytime()
    });

    await expect(()=> service.findMemberFromClub(club.id, newSocio.id)).rejects.toHaveProperty("message", "The socio with the given id is not associated to the club"); 
  });


  it('findMembersFromClub should return socios by club', async ()=>{
    const socios: SocioEntity[] = await service.findMembersFromClub(club.id);
    expect(socios.length).toBe(5)
  });


  it('findMembersFromClub should throw an exception for an invalid club', async () => {
    await expect(()=> service.findMembersFromClub("0")).rejects.toHaveProperty("message", "The club with the given id was not found"); 
  });


  /*
  it('updateMembersFromClub should update socios list for a club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.company.name(),                      
      correoelectronico: faker.internet.email(),
      fechanacimiento: faker.date.anytime()
    });

    const updatedClub: ClubEntity = await service.updateMembersFromClub(club.id, [newSocio]);
    expect(updatedClub.socios.length).toBe(1);
    expect(updatedClub.socios[0].nombre).toBe(newSocio.nombre);
    expect(updatedClub.socios[0].correoelectronico).toBe(newSocio.correoelectronico);
    expect(updatedClub.socios[0].fechanacimiento).toBe(newSocio.fechanacimiento);
  });

  */


  it('updateMembersFromClub should throw an exception for an invalid club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.company.name(),                      
      correoelectronico: faker.internet.email(),
      fechanacimiento: faker.date.anytime()
    });

    await expect(()=> service.updateMembersFromClub("0", [newSocio])).rejects.toHaveProperty("message", "The club with the given id was not found"); 
  });


  it('updateMembersFromClub should throw an exception for an invalid socio', async () => {
    const newSocio: SocioEntity = sociosList[0];
    newSocio.id = "0";

    await expect(()=> service.updateMembersFromClub(club.id, [newSocio])).rejects.toHaveProperty("message", "The socio with the given id was not found"); 
  });


  it('deleteMemberFromClub should remove a socio from a club', async () => {
    const socio: SocioEntity = sociosList[0];
    
    await service.deleteMemberFromClub(club.id, socio.id);

    const storedClub: ClubEntity = await clubRepository.findOne({where: {id: club.id}, relations: ["socios"]});
    const deletedSocio: SocioEntity = storedClub.socios.find(a => a.id === socio.id);

    expect(deletedSocio).toBeUndefined();

  });


  it('deleteMemberFromClub should thrown an exception for an invalid socio', async () => {
    await expect(()=> service.deleteMemberFromClub(club.id, "0")).rejects.toHaveProperty("message", "The socio with the given id was not found"); 
  });


  it('deleteMemberFromClub should thrown an exception for an invalid club', async () => {
    const socio: SocioEntity = sociosList[0];
    await expect(()=> service.deleteMemberFromClub("0", socio.id)).rejects.toHaveProperty("message", "The club with the given id was not found"); 
  });


  it('deleteMemberFromClub should thrown an exception for an non asocciated socio', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.company.name(),                      
      correoelectronico: faker.internet.email(),
      fechanacimiento: faker.date.anytime()
    });

    await expect(()=> service.deleteMemberFromClub(club.id, newSocio.id)).rejects.toHaveProperty("message", "The socio with the given id is not associated to the club"); 
  });  


});
