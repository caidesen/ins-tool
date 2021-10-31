import { BaseEntity } from '../../core/base.entity';
import { Entity, Column, Generated } from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity {
  @Column({ nullable: false })
  @Generated('uuid')
  code: string;
  @Column({ name: 'user_id', nullable: false })
  userId: number;
  @Column({ name: 'exp_date', nullable: false })
  expDate: Date;
}
