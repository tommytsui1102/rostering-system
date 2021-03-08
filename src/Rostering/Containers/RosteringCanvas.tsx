import React, { ReactElement, useState } from 'react';
import { Button, Dropdown, PageHeader } from 'antd';

import IntervalPicker from '../Components/IntervalPicker';
import RosteringTable from '../Components/RosteringTable';
import { ChangedDealerList } from '../changedDealerList';
import { CandidateListEntity } from '../Components/type';



interface Props {
	candidateList: CandidateListEntity[];
	availableCandidateList: CandidateListEntity[];
	getData: (changedDealerList: ChangedDealerList, interval: number) => void
	dateRange: moment.Moment[]
}

export default function RosteringCanvas({ candidateList, availableCandidateList, getData, dateRange }: Props): ReactElement {
	const [interval, setInterval] = useState(30);
	const changedDealerList = new ChangedDealerList();
	const columnList = [];
	for (var i = 0; i < 24 * 60 / interval; i++) {
		columnList.push(i);
	}
	return (
		<>
			<PageHeader
				extra={[
					<Dropdown
						overlay={<IntervalPicker setInterval={setInterval} interval={interval} />}
					>
						<Button>{interval} mins</Button>
					</Dropdown>
					,
					<Button onClick={() => getData(changedDealerList, interval)} type="primary">Reshuffle</Button>
					,
				]} />
			<RosteringTable
				dateRange={dateRange}
				changedDealerList={changedDealerList}
				availableCandidateList={availableCandidateList}
				candidateList={candidateList}
			/>
		</>
	)
}
