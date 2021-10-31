import { BaseEntity } from '../../core/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class LessonRecord extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number;
  /**课id*/
  @Column({ name: 'lesson_id', nullable: true })
  lessonId?: string;
  /**课程id*/
  @Column({ name: 'course_id', nullable: true })
  courseId?: string;
  /**课程名称 必须有一个名称，用于统计*/
  @Column({ name: 'course_name' })
  courseName: string;
  /**课程名称 必须有一个名称，用于统计*/
  @Column({ name: 'course_code' })
  courseCode: string;
  /**类型id*/
  @Column({ name: 'course_type_id', nullable: true })
  courseTypeId?: string;
  /**类型名称*/
  @Column({ name: 'course_type_name', nullable: true })
  courseTypeName?: string;
  /**持续时间*/
  @Column({ name: 'minutes', nullable: true })
  minutes?: number;
  /**发生时间点*/
  @Column({ name: 'startDate' })
  startDate: Date;
  /**选课人数*/
  @Column({ name: 'select_num', default: 0 })
  selectNum: number;
  /**实际到课*/
  @Column({ name: 'present_num', default: 0 })
  presentNum: number;
  /**备注*/
  @Column({ name: 'remark', default: '' })
  remark: string;
}
