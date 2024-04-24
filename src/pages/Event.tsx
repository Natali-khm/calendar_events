import { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import { Button, Flex, Modal } from 'antd';
import EventForm from '../components/EventForm';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { eventsThunks } from '../store/reducers/event.slice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useTypedDispatch()
    const guests = useTypedSelector(state => state.event.guests)
    const events = useTypedSelector(state => state.event.events)

    useEffect(() => {
        dispatch(eventsThunks.getGuests())
        dispatch(eventsThunks.getEvents())
    }, [])

    const submitForm = (event: IEvent) => {
        dispatch(eventsThunks.addEvent(event))
        setIsModalOpen(false)
    }
    return (
        <>
       {JSON.stringify(events)}
            <EventCalendar events={[]} />
            <Flex justify='center'>
                <Button onClick={() => setIsModalOpen(true)}>Add an event</Button>
            </Flex>
            <Modal title='Add an event' open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
                <EventForm guests={guests} submit={submitForm} />
            </Modal>
        </>
    )
}

export default Event