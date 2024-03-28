import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import * as _ from 'lodash';

@Injectable()
export class TransactionsService {
  
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository : Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository : Repository<Account>
  ) {}
  
  async create(transactions: any) {
    
    try {

      let accounts = _.uniqBy(transactions, 'account.id')

      let account: any;

      for await (account of accounts) {

        let accountFound = await this.accountRepository.findOne({
          where: { id: account.account.id },
        });
    
        if (!accountFound) {
          // El account no existe, se crea en la entidad Account
          await this.accountRepository.save({ "id": account.account.id, "account_type": account.account.type, "name": account.account.name, "owner_id": "41893a15-8720-466c-8476-8b0973531c2f" });
        }

      }

      let transaction: any;
      let transactionsDb = [];

      for await (transaction of transactions) {

        let newObject = {};
  
        newObject["id"]           = transaction.id;
        newObject["account_id"]   = transaction.account.id;
        newObject["category"]     = transaction.category;
        newObject["subcategory"]  = transaction.subcategory;
        newObject["amount"]       = transaction.amount;
        newObject["type"]         = transaction.type;
        newObject["status"]       = transaction.status;
  
        transactionsDb.push(newObject)
      };
  
      //console.log('lo que transformamos ', transactionsDb)
  
      let resp = await this.transactionRepository.save(transactionsDb)
  
      return resp;
      
    } catch (error) {
      console.log('TransactionsService.create ', error.message)
    }
  }

  async findAll() {
    return await this.transactionRepository.find();
  }

  async findOne(category: string) {
    let transCategory = await this.transactionRepository.findBy({ category });

    //console.log(JSON.stringify(transCategory))

    let amount = _.chain(transCategory)
    // 1. Map and convert amounts to floats
    .map(item => parseFloat(item.amount))
    // 2. Calculate the sum using sum
    .sum()
    .round(2)
    .value()

    return [{ "category" : category, "amount": amount }]
  }

  async financialHealth() {
    let transCategory = await this.transactionRepository.find();

    //console.log(JSON.stringify(transCategory))

    let operation = _.chain(transCategory)
    // 1. Group by type
    .groupBy('type')
    // 2. Map each group to an object with total amount and type
    .map((group, type) => ({
      type,
      totalAmount: _.round(
        // 3. Parse amount as float and sum within sumBy
        _.sumBy(group, item => parseFloat(item.amount)),
        2 // Round to 2 decimal places
      ),
    }))
    // 4. Convert the chain result to an array
    .value();

    let outflowAmount = operation[0].totalAmount; // 125663.71
    let inflowAmount = operation[1].totalAmount; // 11809.53
    let isHealty;

    if (outflowAmount < inflowAmount) {
      //console.log("El totalAmount de OUTFLOW es menor que el de INFLOW.");
      isHealty = true;
    } else if (outflowAmount > inflowAmount) {
      //console.log("El totalAmount de OUTFLOW es mayor que el de INFLOW.");
      isHealty = false;
    } else {
      //console.log("Los totalAmount de OUTFLOW e INFLOW son iguales.");
      isHealty = true;
    }

    let result = {
      "isHealty": isHealty,
      "data": operation
    }

    return result;
  }

  async financialDataByAccount() {
    let transCategory = await this.transactionRepository.find();
    let accounts = await this.accountRepository.find();

    //console.log(JSON.stringify(transCategory))

    let operation = _.chain(transCategory)
    // 1. Group by type
    .groupBy('account_id')
    // 2. Map each group to an object with total amount and type
    .map((group, account) => ({
      account,
      totalAmount: _.round(
        // 3. Parse amount as float and sum within sumBy
        _.sumBy(group, item => parseFloat(item.amount)),
        2 // Round to 2 decimal places
      ),
    }))
    // 4. Convert the chain result to an array
    .value();

    let objOperation = _.transform(operation, function(obj, data, index){
      obj[data.account] = data
    }, {})

    let result = [];

    for (let account of accounts) {

      if(objOperation[account.id]) result.push({ ...objOperation[account.id], ...account })
    }

    return result;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
