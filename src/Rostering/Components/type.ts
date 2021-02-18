import moment from "moment";

export interface CandidateListEntity {
	dealerList: string[];
	date: moment.Moment
}

export interface OverviewDataEntity {
	date: moment.Moment;
	table: number,
	dealer: string[][];
}

export interface DetailDataEntity {
	onDuty: string;
	name: string;
}