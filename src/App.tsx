import React, { useState } from 'react';
import './App.css';
import { Col, Input, Row, DatePicker, PageHeader, Tabs } from 'antd';
import RosterResultCanvas from './Rostering/Containers/RosterResultCanvas';
import RosteringCanvas from './Rostering/Containers/RosteringCanvas';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { ChangedDealerList } from './Rostering/changedDealerList';
import DateRangePicker from './Rostering/Components/DateRangePicker';
import { DetailDataEntity, OverviewDataEntity } from './Rostering/Components/type';

const { RangePicker } = DatePicker
const moment = extendMoment(Moment);
const { TabPane } = Tabs;

function App() {
  const [current, setCurrent] = useState<moment.Moment>(moment());
  const [game, setGame] = useState('');
  const [dealer, setDealer] = useState('');
  const [tableNumber, setTableNumber] = useState<number>();
  const endDate = moment(current).add(7, 'days');
  const dateRange = Array.from(moment.range(current, endDate).by('days', { excludeEnd: true }));
  const candidateList = [
    {
      dealerList: ['dealer 1', 'dealer 2', 'dealer 3'],
      date: moment('2021-02-25')
    }
  ]
  const availableCandidateList = [
    {
      dealerList: ['dealer a', 'dealer b', 'dealer c'],
      date: moment('2021-02-25')
    }
  ]
  const allTableList = [
    {
      tableNumber: 1,
      game: 'dragon'
    },
    {
      tableNumber: 2,
      game: 'dragon'
    },
    {
      tableNumber: 3,
      game: 'dragon'
    },
    {
      tableNumber: 4,
      game: 'dragon'
    },
    {
      tableNumber: 5,
      game: 'dragon'
    },
    {
      tableNumber: 6,
      game: 'dragon'
    },
    {
      tableNumber: 7,
      game: 'dragon'
    },
    {
      tableNumber: 8,
      game: 'dragon'
    },
    {
      tableNumber: 9,
      game: 'dragon'
    },
    {
      tableNumber: 10,
      game: 'dragon'
    },
  ]
  const overviewData: OverviewDataEntity[] = [
    {
      date: moment('2021/03/02'),
      table: 4,
      dealer: [['dealer a', 'dealer b', 'dealer c', 'dealer d', 'dealer e'],
      ['DEALER 1', 'DEALER 2', 'DEALER 3', 'DEALER 5'],
      ['DEALER I', 'DEALER II', 'DEALER III', 'DEALER IV']
      ]
    }
  ];
  const getData = (changedDealerList: ChangedDealerList, interval: number) => {
    console.log('hihihihi', changedDealerList, interval)
  }
  const getDetailData = () => {

  }
  const confirmSwap = (confirmSwapList: DetailDataEntity[][]) => {
    console.log('confirmSwap', confirmSwapList);
  }
  const detailData: DetailDataEntity[] = [{ "onDuty": "00:30", "name": "dealer e" }, { "onDuty": "01:00", "name": "dealer a" }, { "onDuty": "01:30", "name": "dealer e" }, { "onDuty": "02:00", "name": "dealer b" }, { "onDuty": "02:30", "name": "dealer 3" }, { "onDuty": "03:00", "name": "dealer a" }, { "onDuty": "03:30", "name": "dealer b" }, { "onDuty": "04:00", "name": "dealer b" }, { "onDuty": "04:30", "name": "dealer 5" }, { "onDuty": "05:00", "name": "dealer b" }, { "onDuty": "05:30", "name": "dealer a" }, { "onDuty": "06:00", "name": "dealer e" }, { "onDuty": "06:30", "name": "dealer b" }, { "onDuty": "07:00", "name": "dealer 5" }, { "onDuty": "07:30", "name": "dealer a" }, { "onDuty": "08:00", "name": "dealer a" }, { "onDuty": "08:30", "name": "dealer a" }, { "onDuty": "09:00", "name": "dealer 3" }, { "onDuty": "09:30", "name": "dealer 3" }, { "onDuty": "10:00", "name": "dealer a" }, { "onDuty": "10:30", "name": "dealer a" }, { "onDuty": "11:00", "name": "dealer 3" }, { "onDuty": "11:30", "name": "dealer 5" }, { "onDuty": "12:00", "name": "dealer e" }, { "onDuty": "12:30", "name": "dealer a" }, { "onDuty": "13:00", "name": "dealer b" }, { "onDuty": "13:30", "name": "dealer 3" }, { "onDuty": "14:00", "name": "dealer 3" }, { "onDuty": "14:30", "name": "dealer e" }, { "onDuty": "15:00", "name": "dealer 3" }, { "onDuty": "15:30", "name": "dealer 3" }, { "onDuty": "16:00", "name": "dealer b" }, { "onDuty": "16:30", "name": "dealer b" }, { "onDuty": "17:00", "name": "dealer e" }, { "onDuty": "17:30", "name": "dealer e" }, { "onDuty": "18:00", "name": "dealer a" }, { "onDuty": "18:30", "name": "dealer e" }, { "onDuty": "19:00", "name": "dealer 5" }, { "onDuty": "19:30", "name": "dealer a" }, { "onDuty": "20:00", "name": "dealer b" }, { "onDuty": "20:30", "name": "dealer a" }, { "onDuty": "21:00", "name": "dealer 5" }, { "onDuty": "21:30", "name": "dealer 3" }, { "onDuty": "22:00", "name": "dealer b" }, { "onDuty": "22:30", "name": "dealer 3" }, { "onDuty": "23:00", "name": "dealer b" }, { "onDuty": "23:30", "name": "dealer e" }];
  return (
    <div className="App">
      <Row>
        <Col offset={3}><Input placeholder="game" onChange={(e) => setGame(e.target.value)} /></Col>
        <Col offset={3}><Input placeholder="table" onChange={(e) => setTableNumber(parseInt(e.target.value))} /></Col>
        <Col offset={3}><Input placeholder="dealer" onChange={(e) => setDealer(e.target.value)} /></Col>
        <Col offset={3}><RangePicker /></Col>
      </Row>
      <PageHeader
        title="Rostering"
        extra={[
          <DateRangePicker setCurrent={setCurrent} current={current} endDate={endDate} />
          ,
        ]} />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Rostering" key="1">
          <RosteringCanvas
            candidateList={candidateList}
            availableCandidateList={availableCandidateList}
            getData={getData}
            dateRange={dateRange}
          />
        </TabPane>
        <TabPane tab="Result" key="2">
          <RosterResultCanvas
            confirmSwap={confirmSwap}
            getDetailData={getDetailData}
            dateRange={dateRange}
            game={game}
            dealer={dealer}
            tableNumber={tableNumber}
            allTableList={allTableList}
            overviewData={overviewData}
            detailData={detailData}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
