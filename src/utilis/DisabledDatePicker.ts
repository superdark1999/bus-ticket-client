import { RangePickerProps } from "antd/es/date-picker";
import dayjs from 'dayjs';

class DisabledDatePicker{
    private rangeWithout = (start: number, end: number, without: Array<number>) => {
        const result = [];
        for (let i = start; i < end; i++) {
            if(without.find(value => value === i)){continue;}
            result.push(i);
        }
        return result;
    };

    private rangeWithoutMultipleOfFive = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            if(i % 5 === 0){continue;}
            result.push(i);
        }
        return result;
    };

    disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
      };

    disabledDateTime = () => ({
        disabledHours: () => [],
        disabledMinutes: () => this.rangeWithoutMultipleOfFive(1, 60),
        disabledSeconds: () => [],
    });
}

export default new DisabledDatePicker();