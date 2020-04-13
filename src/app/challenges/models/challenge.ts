import { IDay, DayStatus } from "./day.interface";

export class Challenge {
    constructor(public title: string = '',
                public description: string = '',
                public year: number = null,
                public month: number = null,
                private _days: IDay[] = []){

        if (_days.length > 0){
            return;
        }

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let currentRow = 1;

        for (let i = 1; i < daysInMonth + 1; i++) {
            const date = new Date(year, month, i);
            const dayInWeek = date.getDay();

            _days.push({
                dayInMonth: i,
                dayInWeek: dayInWeek,
                date: date,
                rowPos: currentRow,
                status: DayStatus.Open
            });

            if (dayInWeek == 6){
                currentRow ++;
            }
        }

    }

    get currentDay(){
        return this._days.find(e=>e.dayInMonth === new Date().getDate() );
    }

    get days(): IDay[]{
        return [...this._days];
    }
}
