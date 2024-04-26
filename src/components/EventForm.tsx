import { Button, Form, Input, DatePicker, Flex, Select, DatePickerProps } from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { ChangeEvent, FC, useState } from 'react';
import { IEvent } from '../models/IEvent';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
    guests: IUser[]
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        guest: '',
        date: '',
        description: ''
    })
    const [form] = Form.useForm()

    const formedGuests = guests.map(g => ({ value: g.username, label: g.username }))

    const author = useTypedSelector(state => state.auth.user?.username)

    const selectDate: DatePickerProps['onChange'] = (date, dateString) => {
        typeof dateString === 'string' && setEvent({ ...event, date: dateString })
    };

    const submitForm = () => {
        author && submit({ ...event, author })
        form.resetFields()
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={submitForm}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setEvent({ ...event, description: e.target.value }) }} />
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required(), rules.isDateAfter("You can't create an event in the past"),]}
            >
                <DatePicker onChange={selectDate} />
            </Form.Item>
            <Form.Item
                label="Choose a guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    onChange={(guest: string) => { setEvent({ ...event, guest }) }}
                    options={formedGuests}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Flex justify='end'>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Flex>
            </Form.Item>
        </Form >
    )
}

export default EventForm

