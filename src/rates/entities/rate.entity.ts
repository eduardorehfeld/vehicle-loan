import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanTerm: number;

  @Column()
  creditScore: number;

  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number;
}
