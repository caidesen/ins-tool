import { Transform } from 'class-transformer';

export class LessonRecordPresentTotal {
  courseCode?: string;
  courseTypeName?: string;
  @Transform(data => Number(data), { toClassOnly: true })
  selectNum: number;
  @Transform(data => Number(data), { toClassOnly: true })
  presentNum: number;
}
