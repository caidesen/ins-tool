import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryColumn({ name: 'lesson_id' })
  lessonId: string;
  /**中心id*/
  @Column({ name: 'center_id', nullable: false })
  centerId: string;
  /**助教信息*/
  @Index()
  @Column({ name: 'assistant_ins_staff_id', nullable: true })
  assistantInsStaffId?: string;
  @Column({ name: 'assistant_ins_staff_name', nullable: true })
  assistantInsStaffName?: string;
  /**主教信息*/
  @Index()
  @Column({ name: 'primary_ins_staff_id' })
  primaryInsStaffId: string;
  @Column({ name: 'primary_ins_staff_name' })
  primaryInsStaffName: string;
  @Column()
  capacity: string;
  @Column({ name: 'class_schedule_id', nullable: true })
  classScheduleId?: string;
  @Column()
  date: string;
  @Column({ name: 'classroom_id', nullable: true })
  classroomId?: string;
  @Column({ name: 'course_id' })
  courseId: string;
  @Column({ name: 'course_code' })
  courseCode: string;
  @Column({ name: 'start_time' })
  startTime: string;
  @Column({ name: 'end_time' })
  endTime: string;
  @Column({ name: 'max_capacity' })
  maxCapacity: number;
  @Column({ name: 'selected_stu_num' })
  selectedStuNum: number;
  @Column({ name: 'baby_list', type: 'json', nullable: true })
  babyList?: MateApi.Baby[];
  /**记录创建时间 */
  @CreateDateColumn({ name: 'gmt_create' })
  gmtCreate: Date;
  /**记录修改时间 */
  @UpdateDateColumn({ name: 'gmt_modified' })
  gmtModified: Date;
}
