export interface IDay {
    dayInMonth: number;
    dayInWeek: number;
    date: Date;
    rowPos: number;
    status:  DayStatus;
}

export enum DayStatus {
    Open,
    Completed,
    Failed,
    Cancel,
    Reset
}
