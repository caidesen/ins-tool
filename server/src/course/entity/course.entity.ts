import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Course {
  /**主键 */
  @PrimaryColumn({ name: 'course_id' })
  courseId: string;
  @Column({ name: 'center_id', nullable: false })
  centerId: string;
  @Column({ name: 'course_code', nullable: false })
  courseCode: string;
  @Column({ name: 'course_name', nullable: false })
  courseName: string;
  @Column({ name: 'course_type_id', nullable: false })
  courseTypeId: string;
  @Column({ name: 'course_type_code', nullable: false })
  courseTypeCode: string;
  @Column({ name: 'course_type_name', nullable: false })
  courseTypeName: string;
  @Column({ name: 'minutes', nullable: false })
  minutes: number;
  @Column({ name: 'start_month', nullable: true })
  startMonth?: number;
  @Column({ name: 'end_month', nullable: true })
  endMonth?: number;
  @Column({ name: 'next_course_id', nullable: true })
  nextCourseId?: string;
  @Column({ name: 'next_course_type_code', nullable: true })
  nextCourseTypeCode?: string;
  @Column({ name: 'next_course_type_name', nullable: true })
  nextCourseTypeName?: string;
  /**记录创建时间 */
  @CreateDateColumn({ name: 'gmt_create' })
  gmtCreate: Date;
  /**记录修改时间 */
  @UpdateDateColumn({ name: 'gmt_modified' })
  gmtModified: Date;
}
