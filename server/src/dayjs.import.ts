import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as weekday from 'dayjs/plugin/weekday';
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('zh-cn');
