import { UserAuth } from '../../auth/entity/user-auth.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true, length: 13 })
  phone: string;

  @Column({ name: 'is_verify', default: false })
  isVerify: boolean;

  @Column({ name: 'is_block', default: false })
  isBlock: boolean;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;
  @OneToMany(
    () => UserAuth,
    auth => auth.user,
    { cascade: ['insert', 'update'] },
  )
  userAuths: Promise<UserAuth[]>;
}
