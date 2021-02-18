import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { ReactElement } from 'react'

interface Props {
	setCurrent: React.Dispatch<React.SetStateAction<moment.Moment>>;
	current: moment.Moment;
	endDate: moment.Moment;
}

export default function DateRangePicker({ setCurrent, current, endDate }: Props): ReactElement {
	const displayStartDate = current.format('LL');
	const displayEndDate = endDate.format('LL');
	return (
		<>
			<LeftOutlined onClick={() => setCurrent(moment(current).add(-7, 'days'))} />
			{displayStartDate} ~ {displayEndDate}
			<RightOutlined onClick={() => setCurrent(moment(current).add(7, 'days'))} />
		</>
	)
}
