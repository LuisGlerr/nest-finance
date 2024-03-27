import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class AccountsService {

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository : Repository<Account>
  ) {}
  
  async create(accounts: any) {
    
    

    let accountsDb = accounts.map(element => {

      let newObject = {};

      newObject["id"] = element.id;
      newObject["account_type"] = element.type;
      newObject["name"]         = element.name;
      newObject["owner_id"]     = "41893a15-8720-466c-8476-8b0973531c2f";

      return newObject;
    });

    console.log('lo que transformamos ', accountsDb)

    let resp = await this.accountRepository.save(accountsDb)

    return resp;
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
