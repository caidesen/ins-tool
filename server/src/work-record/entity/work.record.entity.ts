import { BaseEntity } from '../../core/base.entity';
import { Column, Entity, Index } from 'typeorm';

export type WorkRecordRecordType =
  | 'A'
  | 'B'
  | 'C'
  | '公'
  | '休'
  | '旷'
  | '年'
  | '调'
  | '产'
  | '婚'
  | '';

@Entity()
export class WorkRecord extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number;
  /** 记录类型 */
  @Column({ name: 'record_type' })
  recordType: WorkRecordRecordType;
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
