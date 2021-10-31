import { User } from '../../user/entity/user.entity';
import { BaseEntity } from '../../core/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class UserAuth extends BaseEntity {
  @Column({ unique: true, nullable: true })
  username: string;
  @Column({ nullable: true })
  password: string;
  @Column({ name: 'wx_open_id', unique: true, nullable: true })
  wxOpenId: string;
  @ManyToOne(() => User)
  user: User;
}
