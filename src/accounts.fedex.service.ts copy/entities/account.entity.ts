import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Accounts')
export class Account {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    account_type: string;

    @Column()
    name: string;

    @Column()
    owner_id: string;
}
