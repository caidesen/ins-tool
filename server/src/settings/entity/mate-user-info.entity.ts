import { BaseEntity } from '../../core/base.entity';
import { Entity, Column, Index } from 'typeorm';
import { Expose } from 'class-transformer';

/**
 * 对应mate系统内的信息
 */
@Entity()
export class MateUserInfo extends BaseEntity {
  @Index()
  @Column({ name: 'user_id', nullable: false })
  userId: number;
  /** mate系统登录时返回的token */
  @Expose()
  @Column({ name: 'token', nullable: false })
  token: string;
  /** mate系统登录时返回的userId */
  @Column({ name: 'mate_user_id', nullable: false })
  mateUserId: string;
  /** mate系统登录时返回的username */
  @Column({ name: 'username', nullable: false })
  username: string;
  @Column({ name: 'chinese_name', nullable: false })
  chineseName: string;
  @Column({ name: 'primary_center_id', nullable: false })
  primaryCenterId: string;
  @Column({ name: 'primary_center_name', nullable: false })
  primaryCenterName: string;
  @Column({ name: 'primary_center_code', nullable: false })
  primaryCenterCode: string;
}
