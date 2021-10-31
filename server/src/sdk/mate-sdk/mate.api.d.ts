declare namespace MateApi {
  export interface BaseResponse<T> {
    basicVersionControl: number;
    webVersionControl: string;
    code: number;
    msg: string;
    data: T;
  }

  export interface Login {
    token: string;
    userId: string;
    username: string;
    chineseName: string;
    englishName: string;
    primaryCenterId: string;
    primaryCenterName: string;
    primaryCenterCode: string;
    tmkRole?: any;
    hasMateRole: boolean;
    adminUser: boolean;
    firstDayOfMonth: boolean;
    equipmentId?: any;
    errorNumber?: any;
    lastRequestTime?: any;
    remainingFreezeTime?: any;
    isFirstLogin?: any;
    remaingErrorNumber?: any;
    errorCode?: any;
    errorInfo?: any;
  }

  export interface Course {
    courseId: string;
    courseCode: string;
    courseName: string;
    minutes: number;
    startMonth?: number;
    endMonth?: number;
    courseTypeId: string;
    courseTypeCode: string;
    courseTypeName: string;
    nextCourseId: string;
    nextCourseTypeCode: string;
    nextCourseTypeName: string;
  }

  export interface Baby {
    attendanceId: string;
    leadsId: string;
    babyId: string;
    babyName: string;
    isWaiting: string;
    attendanceStatus: '25001' | '25002' | '25003'; // '未上','已上','请假'
    bookWay: '26001' | '26002' | '26003'; //'(R)固定','(M)临时', (P)试听
    gbStaffId: string;
    gaStaffId: string;
    lessonId: string;
  }

  export interface Lesson {
    lessonId?: string;
    classScheduleId?: string;
    date: string;
    classroomId?: string;
    courseId: string;
    courseCode: string;
    startTime: string;
    endTime: string;
    primaryInsStaffId: string;
    primaryInsStaffName: string;
    assistantInsStaffId: string;
    assistantInsStaffName: string;
    capacity: string;
    maxCapacity: number;
    selectedStuNum: number;
    babyList?: Baby[];
  }

  export interface SignInLessonList {
    hour: string;
    lessonList: Lesson[];
  }

  export interface MateLessonRes {
    isHoliday: boolean;
    signInLessonList: SignInLessonList[] | null;
  }
}
