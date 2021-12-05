declare namespace API {
  export type Response<T> = { errorCode: number; data: T; message: string };
  export type ApiPromise<T> = Promise<Response<T>>;
  /**
   * 登录时返回的token组
   */
  export type TokenGroup = { accessToken: string; refreshToken?: string };
  /**
   * 接口中返回的用户信息
   */
  export type CurrentUser = { id: number; avatar?: string; nickname?: string; isVerify: boolean };
  /**
   * 接口返回的设置详情
   */
  export type Settings = {
    gymboMateUsername: string;
    gymboMatePassword: string;
    autoSync: boolean;
  };

  export type MateUserInfo = {
    userId: number;
    /** mate系统登录时返回的userId */
    mateUserId: string;
    /** mate系统登录时返回的username */
    username: string;
    chineseName: string;
    primaryCenterId: string;
    primaryCenterName: string;
    primaryCenterCode: string;
  };

  export type CourseInfo = {
    courseId: string;
    centerId: string;
    courseCode: string;
    courseName: string;
    courseTypeId: string;
    courseTypeCode: string;
    courseTypeName: string;
    minutes: number;
    startMonth?: number;
    endMonth?: number;
    nextCourseId?: string;
    nextCourseTypeCode?: string;
    nextCourseTypeName?: string;
    gmtCreate: Date;
    gmtModified: Date;
  };

  export interface UserService {
    /**
     * 登录
     */
    loginByWxJsCode(code: string): ApiPromise<TokenGroup>;

    /**
     * 获取用户信息
     */
    doRefreshToken(token: string): ApiPromise<TokenGroup>;

    /**
     * 获取用户信息
     */
    getUserInfo(): ApiPromise<CurrentUser>;

    /**
     * 刷新访问凭证
     */
    updateBaseUserInfo(user: CurrentUser): ApiPromise<CurrentUser>;
  }

  export interface SettingService {
    /**
     * 获取用户设置内容
     */
    getSettingsInfo(): ApiPromise<Settings>;

    /**
     * 修改用户设置
     */
    saveSettingsInfo(data: Settings): ApiPromise<void>;

    /**
     * 修改mate账号
     */
    saveMateAccount(data: Settings): ApiPromise<void>;

    /**
     * 获取Mate用户信息
     */
    getMateUserInfo(): ApiPromise<MateUserInfo>;

    /**
     * 立即同步Mate用户信息
     */
    refreshMateUserInfo(): ApiPromise<MateUserInfo>;
  }

  export interface CourseService {
    /**
     * 获取课程列表
     */
    getCourseList(): ApiPromise<CourseInfo[]>;

    /**
     * 从mate中拉取课程
     */
    pullCourseListFormMate(): ApiPromise<void>;
  }

  export type LessonRecordCreateDTO = {
    /**课程*/
    courseId: string;
    selectNum: number;
    presentNum: number;
    startDate: Date;
  };
  export type LessonRecord = {
    userId: number;
    /**课id*/
    lessonId?: string;
    /**课程id*/
    courseId?: string;
    /**课程名称 必须有一个名称，用于统计*/
    courseName: string;
    /**类型id*/
    courseTypeId?: string;
    /**类型名称*/
    courseTypeName?: string;
    /**持续时间*/
    minutes?: number;
    /**发生时间点*/
    startDate: Date;
    /**选课人数*/
    selectNum: number;
    /**实际到课*/
    presentNum: number;
    /**备注*/
    remark: string;
  };
  export interface LessonRecordService {
    /**
     * 创建课程记录
     */
    createLessonRecord(data: LessonRecordCreateDTO): ApiPromise<void>;

    /**
     * 修改课程记录
     */
    modifyLessonRecord(data: LessonRecord): ApiPromise<void>;

    /**
     * 删除课程记录
     */
    deleteLessonRecord(id: string): ApiPromise<void>;

    /**
     * 获取课程记录表，根据时间区间查询
     */
    getLessonRecordList(data: { start: Date; end: Date }): ApiPromise<LessonRecord[]>;

    /**
     * 获取月报
     * @param data
     */
    getMonthlyReport(data: { month: Date }): ApiPromise<any>;

    /**
     * 根据lessonId直接创建记录
     */
    pushLessonRecordByLessonIds(data: { ids: string[] }): ApiPromise<void>;
  }
  export interface Baby {
    attendanceId: string;
    leadsId: string;
    babyId: string;
    babyName: string;
    isWaiting: string;
    attendanceStatus: '25001' | '25002' | '25003'; // '未上','已上','请假'
    bookWay: '26001' | '26002'; //'(R)固定','(M)临时'
    gbStaffId: string;
    gaStaffId: string;
    lessonId: string;
  }
  export interface Lesson {
    lessonId: string;
    /**中心id*/
    centerId: string;
    /**助教信息*/
    assistantInsStaffId?: string;
    assistantInsStaffName?: string;
    /**主教信息*/
    primaryInsStaffId: string;
    primaryInsStaffName: string;
    capacity: string;
    classScheduleId: string;
    date: string;
    classroomId: string;
    courseId: string;
    courseCode: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    selectedStuNum: number;
    babyList?: Baby[];
    /**记录创建时间 */
    gmtCreate: Date;
    /**记录修改时间 */
    gmtModified: Date;
  }
  export interface LessonService {
    /**
     * 获取
     */
    getLesson(data: { date: string }): ApiPromise<Lesson[]>;
    pullLesson(data: { date: string }): ApiPromise<void>;
  }
  export interface WorkRecordSetting {
    /** 上个月剩下的休息时长 */
    lastMonthRestDuration: number;
    /** 自动生成开关 */
    autoGenerateSwitch: boolean;
    /** 固定的每周工作安排 休/A/A/A/A/A/休 */
    fixedWeekWorkPlan: string;
  }
  export interface WorkRecord {
    /** 记录类型 */
    recordType: 'A' | 'B' | 'C' | '公' | '休';
    /** 增减值 */
    changeValue: number;
    /** 备注 */
    remark: string;
    /** 日期 */
    date: Date;
  }

  export interface WorkRecordServer {
    getWorkRecordSetting(): ApiPromise<WorkRecordSetting | undefined>;
    setWorkRecordSetting(data: WorkRecordSetting & { id: number }): ApiPromise<void>;
    saveWorkRecord(data: WorkRecord): ApiPromise<void>;
    getWorkRecord(data: { date: string }): ApiPromise<WorkRecord[]>;
  }
}
type service = {
  user: API.UserService;
  setting: API.SettingService;
  course: API.CourseService;
  lessonRecord: API.LessonRecordService;
  lesson: API.LessonService;
  workRecord: API.WorkRecordServer;
};
export = service;
