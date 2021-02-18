import { ArrowRightOutlined, SwapOutlined } from '@ant-design/icons'
import { Row, Col, Descriptions } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { ReactElement } from 'react'
import { DetailDataEntity } from '../type'

interface Props {
	swapItemList: DetailDataEntity[];
	confirmSwapList: DetailDataEntity[][];
	setConfirmSwapList: React.Dispatch<React.SetStateAction<DetailDataEntity[][]>>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	showModal: boolean;
	setSwapItemList: React.Dispatch<React.SetStateAction<DetailDataEntity[]>>;
}

export default function ConfirmModal({ swapItemList, setConfirmSwapList, setShowModal, showModal, setSwapItemList }: Props): ReactElement {
	const confirmSwapHandler = () => {
		setShowModal(false);
		setConfirmSwapList(confirmList => [...confirmList,
		[
			{
				onDuty: swapItemList[0].onDuty,
				name: swapItemList[1].name,
			},
			{
				onDuty: swapItemList[1].onDuty,
				name: swapItemList[0].name,
			},
		]])
		setSwapItemList([]);
	}
	return (
		<Modal
			width="1000px"
			title="Confirm Swap?"
			visible={showModal}
			onOk={confirmSwapHandler}
			onCancel={() => setShowModal(false)}
		>
			<Row>
				<Col span={8}>
					<Descriptions bordered column={{ sm: 1 }}>
						<Descriptions.Item label="onDuty">{swapItemList.length >= 2 && swapItemList[0].onDuty}</Descriptions.Item>
						<Descriptions.Item label="name">
							<span style={{ textDecoration: 'line-through' }}>
								{swapItemList.length >= 2 && swapItemList[0].name}
							</span>
							<ArrowRightOutlined />
							<span>
								{swapItemList.length >= 2 && swapItemList[1].name}
							</span>
						</Descriptions.Item>
					</Descriptions>
				</Col>
				<Col span={8} style={{ textAlign: 'center' }}><SwapOutlined /></Col>
				<Col span={8}>
					<Descriptions bordered column={{ sm: 1 }}>
						<Descriptions.Item label="onDuty">{swapItemList.length >= 2 && swapItemList[1].onDuty}</Descriptions.Item>
						<Descriptions.Item label="name">
							<span style={{ textDecoration: 'line-through' }}>
								{swapItemList.length >= 2 && swapItemList[1].name}
							</span>
							<ArrowRightOutlined />
							<span>
								{swapItemList.length >= 2 && swapItemList[0].name}
							</span>
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		</Modal>
	)
}
