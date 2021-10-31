import { BaseEntity } from '../../core/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class WorkRecord extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number;
  /** 记录类型 */
  @Column({ name: 'record_type' })
  recordType: 'A' | 'B' | 'C' | '公' | '休';
  /** 增减值 */
  @Column({ name: 'change_value', default: 0 })
  changeValue: number;
  /** 备注 */
  @Column({ nullable: true })
  remark: string;
  /** 日期 */
  @Column()
  date: Date;
}
