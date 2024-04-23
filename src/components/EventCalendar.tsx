import { Calendar } from 'antd';
import { IEvent } from '../models/IEvent';
import { FC } from 'react';

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = () => {
    return (
        <Calendar />
    )
}

export default EventCalendar