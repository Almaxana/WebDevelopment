import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EndpointStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpoint: string;

  @Column({ default: 0 })
  count: number;
}
