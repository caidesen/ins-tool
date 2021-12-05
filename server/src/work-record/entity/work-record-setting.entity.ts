import { BaseEntity } from '../../core/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class WorkRecordSetting extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number;
  /** 上个月剩下的休息时长 */
  @Column()
  lastMonthRestDuration: number;
  /** 自动生成开关 */
  @Column()
  autoGenerateSwitch: boolean;
  /** 固定的每周工作安排 休/A/A/A/A/A/休 */
  @Column({ nullable: true })
  fixedWeekWorkPlan: string;
}
