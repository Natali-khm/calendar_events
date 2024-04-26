import { Calendar,Badge } from 'antd';
import { IEvent } from '../models/IEvent';
import { FC } from 'react';

import type { BadgeProps, CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

interface EventCalendarProps {
    events: IEvent[]
}


const EventCalendar: FC<EventCalendarProps> = ({ events }) => {

    const getListData = (value: Dayjs) => {
        const res = events.filter(el => Number(el.date.split('-')[2]) === value.date())
        return res.map(el => ({ type: 'success', content: el.description }))
    };

    const dateCellRender = (value: Dayjs) => {
        const listData: Array<{ type: string, content: string }> = getListData(value);

        return (
            <ul className="events">
                {listData.map((item, ind) => (
                    <li key={ind} style={{ listStyle: 'none' }}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return <Calendar cellRender={cellRender} />;
};

export default EventCalendar