import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Transactions')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    account_id: string;

    @Column()
    category: string;

    @Column()
    subcategory: string;

    @Column({ type: "decimal"})
    amount: string;

    @Column()
    type: string;

    @Column()
    status: string;

}
