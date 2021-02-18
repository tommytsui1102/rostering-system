import { Row, Col } from 'antd'
import React, { ReactElement } from 'react'
import { OverviewDataEntity } from '../type'
import DetailsPopover from './Components/DetailsPopover'

interface Props {
	getDetailData: () => void;
	dateRange: moment.Moment[];
	setIsDetail: any;
	data: OverviewDataEntity[];
	allTableList: { tableNumber: number, game: string }[];
}

export default function RosterResultOverviewCanvas({ dateRange, data, allTableList, getDetailData }: Props): ReactElement {
	return (
		<>
			<Row>
				<Col span={2}>Table No.</Col>
				<Col span={1}>Game</Col>
				{dateRange.map(d => <Col span={2}>{d.format('LL')}</Col>)}
			</Row>
			{allTableList.map(t => (
				<Row style={{ height: 60 }}>
					<Col span={2}>{t.tableNumber}</Col>
					<Col span={1}>{t.game}</Col>
					{dateRange.map(d => {
						const res = data.find(_d => _d.date.format('LL') === d.format('LL') && _d.table === t.tableNumber)
						return <Col span={2}><DetailsPopover getDetailData={getDetailData} res={res} /></Col>
					})}
				</Row>
			))}
		</>
	)
}
