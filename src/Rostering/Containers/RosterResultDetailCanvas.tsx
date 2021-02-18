import { ArrowRightOutlined, SwapOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Descriptions, PageHeader, Popconfirm, Row } from 'antd'
import Grid from 'antd/lib/card/Grid'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import Modal from 'antd/lib/modal/Modal'
import TransferList from 'antd/lib/transfer/list'
import React, { ReactElement, useEffect, useState } from 'react'
import ConfirmModal from '../Components/RosterResultDetail/ConfirmModal'
import { DetailDataEntity } from '../Components/type'

interface Props {
	setIsDetail: any;
	timeFrame: number;
	detailData: DetailDataEntity[];
	confirmSwap: (confirmSwapList: DetailDataEntity[][]) => void;
}

export default function RosterResultDetailCanvas({ setIsDetail, timeFrame, detailData, confirmSwap }: Props): ReactElement {
	const [swapItemList, setSwapItemList] = useState<DetailDataEntity[]>([])
	const [confirmSwapList, setConfirmSwapList] = useState<DetailDataEntity[][]>([])
	const [showModal, setShowModal] = useState(false)
	const rowList: any[] = [0]
	for (var i = 0; i < 22; i++) {
		if (i % 2 === 0) continue
		rowList.push(i + 1)
	}
	const columnsList: any[] = []
	for (var i = 0; i < 2 * 60 / timeFrame; i++) {
		columnsList.push(timeFrame * i)
	}
	const colorList = ['#f5222d', '#fa541c', '#fa8c16', '#a0d911', '#1890ff', '#722ed1'];
	const transparentColorList = ['#ffccc7', '#ffd8bf', '#ffe7ba', '#f4ffb8', '#bae7ff', '#efdbff'];
	const isSelectedColor = '#10239e';
	const dealerNameList = detailData.reduce((acc: any[], cur: any) => {
		if (acc.filter(f => f.name === cur.name).length > 0) {
			return acc;
		}
		const idx = Math.floor(Math.random() * colorList.length)
		const color = colorList[idx];
		const transparentColor = transparentColorList[idx];
		acc.push({
			name: cur.name,
			color,
			transparentColor
		});
		colorList.splice(idx, 1)
		transparentColorList.splice(idx, 1)
		return acc;
	}, []);

	useEffect(() => {
		if (swapItemList.length >= 2) {
			setShowModal(true);
		}
	}, [swapItemList])

	const renderStyle = (color: string = '', transparentColor: string = '', isSelected: boolean = false) => ({
		grid: {
			header: {
				column: {
					margin: 20
				},
				dummyColumn: { margin: 10 }
			},
			content: {
				row: {
					height: 150,
					border: '1px solid grey'
				},
				dummyColumn: {
					margin: '0 10px',
					borderRight: '1px solid grey'
				},
				column: {
					margin: 20,
					cursor: 'pointer'
				},
				time: {
					padding: 5,
					fontSize: 12,
					color: isSelected ? 'white' : color
				},
				details: {
					backgroundColor: isSelected ? isSelectedColor : transparentColor,
					borderRadius: 10,
					padding: 10,
					border: `2px solid ${isSelected ? isSelectedColor : color}`
				},
				dealerName: {
					fontWeight: 'bold',
					padding: '5px 0',
					color: isSelected ? 'white' : color
				} as unknown as React.CSSProperties
			}
		}
	});
	const forceToTwoDigit = (number: number) => number.toString().length === 1 ? `0${number}` : number;

	return (
		<>
			<PageHeader
				className="site-page-header"
				onBack={() => setIsDetail(false)}
				title="Details"
				extra={[
					<Button onClick={() => confirmSwap(confirmSwapList)} type="primary">Confirm Swap</Button>
					,
				]}
			/>
			<div style={{ width: '120vw' }}>
				<Row>
					<Col style={renderStyle().grid.header.dummyColumn} span={2}>Minutes</Col>
					{rowList.map(time => (
						<Col style={renderStyle().grid.header.column} span={1}>{time}:00 ~ {time + 2}:00</Col>
					))}
				</Row>
				{columnsList.map((c) => (
					<Row style={renderStyle().grid.content.row}>
						<Col style={renderStyle().grid.content.dummyColumn} span={2}>{c}</Col>
						{rowList.map((time) => {
							let fromHour = forceToTwoDigit(Math.floor((c + time * 60) / 60));
							let toHour = forceToTwoDigit(Math.floor((c + time * 60 + timeFrame) / 60));
							let fromMinute = forceToTwoDigit((c % 60));
							let toMinute = forceToTwoDigit(((c + timeFrame) % 60));
							const res = detailData.find(d => d.onDuty === `${fromHour}:${fromMinute}`)
							let color = 'white';
							let transparentColor = 'white';
							if (res) {
								transparentColor = dealerNameList.find(e => e.name === res?.name).transparentColor;
								color = dealerNameList.find(e => e.name === res?.name).color;
							}
							const style = renderStyle(color, transparentColor, res && swapItemList.includes(res));
							const swapHandler = () => {
								if (res) {
									setSwapItemList((swapItemList: DetailDataEntity[]) => {
										const idx = swapItemList.findIndex(item => item.name === res.name && item.onDuty === res.onDuty);
										if (idx > -1) {
											const newList = [...swapItemList]
											newList.splice(idx, 1)
											return newList
										} else {
											if (swapItemList.length >= 2) {
												return swapItemList
											} else {
												return [...swapItemList, res]
											}
										}
									})
								}
							}
							const deleteHandler = () => {
								setConfirmSwapList((confirmSwapList: DetailDataEntity[][]) => {
									let newList = [...confirmSwapList];
									newList = newList.filter(l => l.findIndex(c => c.onDuty === res?.onDuty && c.name === res.name) > -1);
									return newList;
								})
							}
							const swapIdx = confirmSwapList.findIndex((s: DetailDataEntity[]) => {
								return s.find(s1 => {
									return s1.onDuty === `${fromHour}:${fromMinute}`
								});
							})
							const isSwap = swapIdx > -1;
							return (
								<Col style={style.grid.content.column} span={1} onClick={() => !isSwap && swapHandler()}>
									<Badge count={isSwap ? swapIdx + 1 : 0}>
										<div style={style.grid.content.details}>
											<div style={style.grid.content.dealerName}>
												{res && res.name}
											</div>
											<div style={style.grid.content.time}>{fromHour}:{fromMinute} ~ {toHour}:{toMinute}</div>
											{isSwap && (
												<Popconfirm title="Confirm delete?" okText="yes" cancelText="no" onConfirm={deleteHandler}>
													<Button size="small">Cancel</Button>
												</Popconfirm>
											)}
										</div>
									</Badge>
								</Col>
							)
						})}
					</Row>
				))}
			</div>
			<ConfirmModal
				showModal={showModal}
				swapItemList={swapItemList}
				setShowModal={setShowModal}
				setSwapItemList={setSwapItemList}
				confirmSwapList={confirmSwapList}
				setConfirmSwapList={setConfirmSwapList}
			/>
		</>
	)
}
