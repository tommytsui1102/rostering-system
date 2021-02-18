import { Button, Menu, Card, Row, Col, Dropdown, Popover } from 'antd'
import React, { ReactElement } from 'react'

interface Props {
	res: any;
	getDetailData: () => void;
}

export default function DetailsPopover({ res, getDetailData }: Props): ReactElement {
	if (!res) {
		return <Button style={{ backgroundColor: 'red', color: 'white' }}>Not Avaliable</Button>
	}
	const dealerList = res.dealer
	const dealerType = Object.keys(dealerList)
	const content = (
		<>
			{dealerType.map(dt => {
				// const menu = (
				// 	<Menu>
				// 		{dealerList[dt].map((dealer: string) => (
				// 			<Menu.Item>
				// 				{dealer}
				// 			</Menu.Item>
				// 		))}
				// 	</Menu>
				// )
				return <Card title={dt}>
					<Row>
						{dealerList[dt].map((dealer: string) =>
							(<Col span={9} offset={3}>{dealer}</Col>)
						)}
					</Row>
				</Card>
			})}
		</>
	)
	return (
		<Popover placement="rightTop" content={content} title="Rostering">
			<Button onClick={() => getDetailData()} style={{ backgroundColor: 'green', color: 'white' }}>Avaliable</Button>
		</Popover>
	)
}
