import { Transform, Type } from 'class-transformer';

export class LessonRecordTotal {
  name: string;
  @Transform(data => Number(data), { toClassOnly: true })
  total: number;
}
