import { BaseEntity, Column } from 'typeorm';

export class WorkRecordMonth extends BaseEntity {
  @Column()
  date: Date;
}
