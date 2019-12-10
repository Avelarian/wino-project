import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("sales_tests")
export class Sale extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    amount: number;

}
