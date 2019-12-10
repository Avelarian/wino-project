import {Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class GetSalesTotal extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;

    @Column()
    amount: number;

}
