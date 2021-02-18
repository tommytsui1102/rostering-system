import { Menu } from 'antd'
import React, { ReactElement } from 'react'

interface Props {
 setInterval: React.Dispatch<React.SetStateAction<number>>;
 interval: number;
}

export default function IntervalPicker({ setInterval, interval }: Props): ReactElement {
	return (
		<Menu>
			<Menu.Item onClick={() => setInterval(15)}>15 mins</Menu.Item>
			<Menu.Item onClick={() => setInterval(20)}>20 mins</Menu.Item>
			<Menu.Item onClick={() => setInterval(30)}>30 mins</Menu.Item>
			<Menu.Item onClick={() => setInterval(60)}>60 mins</Menu.Item>
			<Menu.Item onClick={() => setInterval(90)}>90 mins</Menu.Item>
		</Menu>
	)
}
