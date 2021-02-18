import { MinusOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Menu, Row } from 'antd'
import React, { ReactElement, useState } from 'react'
import { JsxElement } from 'typescript'
import { ChangedDealerList } from '../../changedDealerList'
import { CandidateListByDate } from './type'

interface Props {
	changedDealerList: ChangedDealerList;
	availableCandidateList: string[];
	currentCandidateList: string[];
	date: moment.Moment;
	roster: string;
}

interface DealerComponentProps {
	selectedDealer: string;
	availableCandidateList: string[];
	changedDealerList: ChangedDealerList;
	date: moment.Moment;
	roster: string;
}

interface NewCandidateComponentProps {
	availableCandidateList: string[];
	idx: number;
	setNewCandidateList: React.Dispatch<React.SetStateAction<string[]>>;
	newCandidateList: string[];
	changedDealerList: ChangedDealerList;
	date: moment.Moment;
	roster: string
}

const CurrentDealerComponent = ({ selectedDealer, availableCandidateList, changedDealerList, date, roster }: DealerComponentProps) => {
	const [isRemove, setIsRemove] = useState(false);
	const OverlayComponent = (<AvailableCandidateMenu availableCandidateList={availableCandidateList} onClick={(e: string) => console.log(e)} />)
	const removeHandler = () => {
		setIsRemove(true)
		changedDealerList.removeDealer(date, roster, selectedDealer, true)
	}
	return (
		!isRemove ? (
			<>
				<Dropdown overlay={OverlayComponent}>
					<Button size="small">{selectedDealer}</Button>
				</Dropdown>
				<Button
					size="small"
					type="primary"
					danger
					onClick={() => { removeHandler() }}>-</Button>
			</>
		) : (
				<>
					<Button size="small" danger type="primary">{selectedDealer}</Button>
					<Button
						size="small"
						type="primary"
						onClick={() => {
							setIsRemove(false)
							changedDealerList.removeDealer(date, roster, selectedDealer, false)
						}}
					><UndoOutlined /></Button>
				</>
			)
	)
}

const NewCandidateComponent = ({ availableCandidateList, idx, setNewCandidateList, newCandidateList, changedDealerList, date, roster }: NewCandidateComponentProps) => {
	const onClick = (e: string) => {
		const cloneList = [...newCandidateList]
		cloneList[idx] = e
		setNewCandidateList(cloneList);
		changedDealerList.addDealer(date, roster, e, true);
	}
	const onDelete = (e: string) => {
		const cloneList = [...newCandidateList];
		cloneList.splice(idx, 1);
		setNewCandidateList(cloneList);
		changedDealerList.addDealer(date, roster, e, false);
	}
	const OverlayComponent = (<AvailableCandidateMenu availableCandidateList={availableCandidateList} onClick={onClick} />)
	return (
		<>
			<Dropdown overlay={OverlayComponent}>
				<Button size="small" style={{ color: 'white', backgroundColor: 'green' }}>
					<span style={{ minWidth: 53 }}>{newCandidateList[idx]}</span>
				</Button>
			</Dropdown>
			<Button size="small" type="primary" danger onClick={() => onDelete(newCandidateList[idx])}>-</Button>
		</>
	)
}

const AvailableCandidateMenu = ({ availableCandidateList, onClick }: { onClick: any, availableCandidateList: string[] }) => (
	<Menu>
		{availableCandidateList.map((e, idx) => (
			<Menu.Item key={idx} onClick={() => onClick(e)}>{e}</Menu.Item>
		))}
	</Menu>
)

export default function TableContentCanvas({ changedDealerList, currentCandidateList, availableCandidateList, date, roster }: Props): ReactElement {
	const [newCandidateList, setNewCandidateList] = useState<string[]>([]);
	const style = {
		dealerComponent: {
			margin: 3
		}
	}
	const unselectedAvailableCandidateList = availableCandidateList.filter(c => !changedDealerList.isExist(c));
	return (
		<div style={{ border: 'solid 1px black', height: '90%', margin: 5 }}>
			<Row>
				<Col span={18} />
				<Col span={6}>
					<Button
						size="small"
						onClick={() => { setNewCandidateList([...newCandidateList, '']) }}
					>+</Button>
				</Col>
			</Row>
			<Row justify="space-between" style={{ margin: 10, overflowY: 'scroll', maxHeight: 140 }}>
				{currentCandidateList.map(c => {
					return (
						<Col style={style.dealerComponent}>
							<CurrentDealerComponent
								availableCandidateList={unselectedAvailableCandidateList}
								selectedDealer={c}
								changedDealerList={changedDealerList}
								date={date}
								roster={roster}
							/>
						</Col>
					)
				})}
				{newCandidateList.map((_, idx) => (
					<Col style={style.dealerComponent} key={idx}>
						<NewCandidateComponent
							availableCandidateList={unselectedAvailableCandidateList}
							idx={idx}
							setNewCandidateList={setNewCandidateList}
							changedDealerList={changedDealerList}
							newCandidateList={newCandidateList}
							date={date}
							roster={roster}
						/>
					</Col>
				))}
			</Row>
		</div>
	)
}
