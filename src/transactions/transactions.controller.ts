import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { query } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() body: any) {
    return this.transactionsService.create(body);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('/categoria/:id')
  findOne(@Param('id') id: string) {

    console.log('lo que viene por queryParam ', id)

    return this.transactionsService.findOne(id);
  }

  @Get('/health')
  financialHealth() {

    console.log('lo que viene por queryParam ')

    return this.transactionsService.financialHealth();
  }

  @Get('/account')
  financialDataByAccount() {

    console.log('lo que viene por queryParam ')

    return this.transactionsService.financialDataByAccount();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
