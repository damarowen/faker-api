import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("items")
export class FakerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  //* generate serial auto increment
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;


}