import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Owners')
export class Owner {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    link: string;

    @Column()
    name: string;

    @Column()
    email: string;
}
