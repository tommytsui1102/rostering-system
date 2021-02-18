import moment from "moment";

interface ChangedDealerEntity {
	action: 'add' | 'remove' | 'edit';
	dealerName: string;
	roster: string;
	date: moment.Moment;
}

export class ChangedDealerList {
	changedList: ChangedDealerEntity[];
	constructor() {
		this.changedList = [];
	}
	isExist(dealer: string) {
		return this.changedList.filter(c => c.dealerName === dealer).length > 0
	}
	addDealer(date: moment.Moment, roster: string, dealerName: string, isAdd: boolean) {
		if (!isAdd) {
			this.changedList = this.changedList.filter(c =>
				!(c.action === 'add'
				&& c.date.diff(date) === 0
				&& c.roster === roster
				&& c.dealerName === dealerName))
		} else {
			this.changedList.push({ action: 'add', dealerName, roster, date })
		}
	}
	removeDealer(date: moment.Moment, roster: string, dealerName: string, isAdd: boolean) {
		const existDealerList = this.changedList.filter(c => c.action === 'remove' && c.date.diff(date) === 0 && c.roster === roster);
		console.log(existDealerList, this.changedList)
		if (isAdd) {
			this.changedList.push({ action: 'remove', dealerName, roster, date })
		} else {
			this.changedList = existDealerList.filter((c) => c.dealerName !== dealerName)
		}
	}
}