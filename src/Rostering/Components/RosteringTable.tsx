import { Row, Col, Button } from 'antd'
import moment from 'moment';
import React, { ReactElement } from 'react'
import { ChangedDealerList } from '../changedDealerList';
import TableContentCanvas from './Table/TableContentCanvas'
import { CandidateListEntity } from './type';

interface Props {
	dateRange: moment.Moment[];
	changedDealerList: ChangedDealerList;
	candidateList: CandidateListEntity[];
	availableCandidateList: CandidateListEntity[];
}

export default function RosteringTable({ dateRange, changedDealerList, candidateList, availableCandidateList }: Props): ReactElement {
	return (
		<>
			<Row>
				<Col span={2} />
				{dateRange.map((date, idx) => (
					<Col key={idx} span={3}>{date.format('LL')}</Col>
				))}
			</Row>
			{[0, 0, 0].map((e, idx) => {
				return (
					<Row style={{ height: '25vh' }}>
						<Col span={2}>
							{idx + 1}
						</Col>
						{dateRange.map((date, j) => {
							const currentCandidateList = candidateList.find(c => c.date.format('LL') === date.format('LL'))
							const availableCandidateListByDate = availableCandidateList
								.find(c => c.date.format('LL') === date.format('LL'))
							return (
								<Col key={j} span={3}>
									<TableContentCanvas
										availableCandidateList={availableCandidateListByDate?.dealerList || []}
										currentCandidateList={currentCandidateList?.dealerList || []}
										roster={idx.toString()}
										date={date}
										changedDealerList={changedDealerList}
									/>
								</Col>
							)
						})}
					</Row>
				)
			}
			)}
		</>
	)
}
