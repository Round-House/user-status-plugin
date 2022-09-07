import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

@Entity()
export class StatusEntity {
  //Basic Info
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  account: string;
}
