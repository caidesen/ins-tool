import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  /**自增id */
  @PrimaryGeneratedColumn()
  id: number;
  /**记录创建时间 */
  @CreateDateColumn({ name: 'gmt_create' })
  gmtCreate: Date;
  /**记录修改时间 */
  @UpdateDateColumn({ name: 'gmt_modified' })
  gmtModified: Date;
}
