export interface LessonRecordDTO {
  id?: string;
  /**课程*/
  courseId: string;
  selectNum: number;
  presentNum: number;
  startDate: Date;
}
