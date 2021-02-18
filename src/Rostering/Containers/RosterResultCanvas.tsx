import React, { ReactElement, useState } from 'react'
import RosterResultOverviewCanvas from '../Components/RosterResult/RosterResultOverviewCanvas'
import { DetailDataEntity, OverviewDataEntity } from '../Components/type'
import RosterResultDetailCanvas from './RosterResultDetailCanvas'

interface Props {
	getDetailData: () => void;
	dateRange: moment.Moment[];
	game: string;
	dealer: string;
	tableNumber?: number;
	allTableList: any[];
	overviewData: OverviewDataEntity[];
	detailData: DetailDataEntity[];
	confirmSwap: (confirmSwapList: DetailDataEntity[][]) => void;
}

export default function RosterResultCanvas({ dateRange, game, dealer, tableNumber, allTableList, overviewData, getDetailData, detailData, confirmSwap }: Props): ReactElement {
	const [isDetail, setIsDetail] = useState(false)
	const usedData = overviewData.filter((data: OverviewDataEntity) => data.dealer.flat().filter((d: string) =>
		dealer === '' || d.includes(dealer)
	).length > 0)
	return (
		isDetail ? <RosterResultDetailCanvas detailData={detailData} timeFrame={30} setIsDetail={setIsDetail} confirmSwap={confirmSwap} /> :
			<RosterResultOverviewCanvas
				allTableList={allTableList.filter(e => (game === '' || e.game === game ) && (!tableNumber || e.tableNumber === tableNumber))}
				data={usedData}
				dateRange={dateRange}
				setIsDetail={setIsDetail}
				getDetailData={() => {
					getDetailData();
					setIsDetail(true);
				}}
			/>
	)
}
