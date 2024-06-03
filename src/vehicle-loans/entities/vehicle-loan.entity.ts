import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VehicleLoan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  loanAmount: number;

  @Column('int')
  loanTerm: number;

  @Column('int')
  creditScore: number;

  @Column('int')
  vehicleYear: number;

  @Column('int')
  vehicleMileage: number;

  @Column('decimal', { precision: 5, scale: 2 })
  percentageRate: number;

  @Column({ type: 'datetime' })
  createdAt: Date;

  constructor(
    props: {
      loanAmount: number;
      loanTerm: number;
      creditScore: number;
      vehicleYear: number;
      vehicleMileage: number;
    },
    percentageRate: number,
  ) {
    Object.assign(this, props);
    this.percentageRate = percentageRate;
    this.createdAt = new Date();
  }
}
