import { BaseEntity } from '../../core/base.entity';
import { Entity, Column, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Settings extends BaseEntity {
  @Index()
  @Column({ name: 'user_id', nullable: false })
  userId: number;
  /**系统密码*/
  @Column({ name: 'gymbo_mate_username', nullable: true })
  gymboMateUsername: string;
  /**系统密码*/
  @Exclude()
  @Column({ name: 'gymbo_mate_password', nullable: true })
  gymboMatePassword: string;
  /**开启自动同步*/
  @Column({ name: 'auto_sync', default: false })
  autoSync: boolean;
}
