import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner)
    private ownersRepository : Repository<Owner>
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    
    try {

      const owner = this.ownersRepository.create(createOwnerDto);

      await this.ownersRepository.save( owner )

      return owner;
      
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() : Promise<Owner[]> {
    return await this.ownersRepository.find();
  }

  // findOne(id: number): Promise<Owner | null> {
  //   return this.ownersRepository.findOneBy({ id });
  // }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
