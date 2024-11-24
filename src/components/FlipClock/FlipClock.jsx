import React, {Component} from 'react'
import './FlipClock.scss';
import FlipUnit from "./FlipUnit";


export default class FlipClock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	// 		--------------------------------		--------------------------------		---------

	componentDidMount() {
		// console.log('TIMER DID MOUNT :::: ', this.props)
		// this.updateTime();
		this.timerID = setInterval(
			() => this.updateTime(),
			1000
		);
	}

	// 		--------------------------------		--------------------------------		---------

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	// 		--------------------------------		--------------------------------		---------

	updateTime() {

		const { type, count_to, count_from } = this.props;

		let units = [];

		if (type=='countdown') {

			let days, hours, minutes, seconds;
			let endDate = new Date(count_to).getTime();

			let startDate = new Date();
        	startDate = startDate.getTime();
        
			let timeRemaining = parseInt( (endDate - startDate) / 1000, 10 );
		
            days = parseInt( timeRemaining / 86400, 10) ;
            timeRemaining = ( timeRemaining % 86400);
            
            hours = parseInt( timeRemaining / 3600, 10);
            timeRemaining = ( timeRemaining % 3600);
            
            minutes = parseInt( timeRemaining / 60, 10);
			timeRemaining = (timeRemaining % 60);

			seconds = parseInt(timeRemaining);

			units.days = timeRemaining>0 ? parseInt(days, 10) : 0;
			units.hours = timeRemaining>0 ? hours : 0;
			units.minutes = timeRemaining>0 ? minutes : 0;
			units.seconds = timeRemaining>0 ? seconds : 0;
		} 

		if(type === 'countup') {

			let days, hours, minutes, seconds;
			let endDate = new Date(count_from).getTime();

			let startDate = new Date();
        	startDate = startDate.getTime();
        
			let timeRemaining = parseInt( (startDate - endDate) / 1000, 10 );
		
            days = parseInt( timeRemaining / 86400, 10) ;
            timeRemaining = ( timeRemaining % 86400);
            
            hours = parseInt( timeRemaining / 3600, 10);
            timeRemaining = ( timeRemaining % 3600);
            
            minutes = parseInt( timeRemaining / 60, 10);
			timeRemaining = (timeRemaining % 60);

			seconds = parseInt(timeRemaining);

			units.days = timeRemaining>0 ? parseInt(days, 10) : 0;
			units.hours = timeRemaining>0 ? hours : 0;
			units.minutes = timeRemaining>0 ? minutes : 0;
			units.seconds = timeRemaining>0 ? seconds : 0;

		}
		if (type=='clock') {

			const time_now = new Date;

			units.years = time_now.getYear()-100;
			units.months = time_now.getMonth()+1;
			units.days = time_now.getDate();
			units.hours = time_now.getHours();
			units.minutes = time_now.getMinutes();
			units.seconds = time_now.getSeconds();

		}

		if (type==='face') {

			console.log('FACE VALUE !!!!');
			
			let days, hours, minutes, seconds;
			let endDate = new Date(count_to).getTime();

			let startDate = new Date();
        	startDate = startDate.getTime();
        
			let timeRemaining = parseInt( (endDate - startDate) / 1000, 10 );
		
            days = parseInt( timeRemaining / 86400, 10) ;
            timeRemaining = ( timeRemaining % 86400);
            
            hours = parseInt( timeRemaining / 3600, 10);
            timeRemaining = ( timeRemaining % 3600);
            
            minutes = parseInt( timeRemaining / 60, 10);
			timeRemaining = (timeRemaining % 60);

			seconds = parseInt(timeRemaining);

			units.days = timeRemaining>0 ? parseInt(days, 10) : 0;
			units.hours = timeRemaining>0 ? hours : 0;
			units.minutes = timeRemaining>0 ? minutes : 0;
			units.seconds = timeRemaining>0 ? seconds : 0;

		}

		['years', 'months', 'days', 'hours', 'minutes', 'seconds'] . 
			map( (u) => {
						// if( units[u] !== this.state[u]) {
							this.setState({
								[u] : units[u],
								[`${u}_pre`] : this.state[u] || 0,
							});
						// }
					}
				  )
	}

	// 		--------------------------------		--------------------------------		---------

	render() {

		const { type, count_to, count_up,  units } = this.props;

		const show_units = units ? 
					units
						:

						type=='countup' ?
						[
							{
								type: 'days',
								title: 'days',
							},
							{
								sep: ':',
								type: 'hours',
								title: 'hours',
							},
							{
								sep: ':',
								type: 'minutes',
								title: 'minutes',
							},
							{
								sep: ':',
								type: 'seconds',
								title: 'seconds',
							}
					]
					:
					type=='countdown' ?
							[
								{
									type: 'days',
									title: 'days',
								},
								{
									sep: ':',
									type: 'hours',
									title: 'hours',
								},
								{
									sep: ':',
									type: 'minutes',
									title: 'minutes',
								},
								{
									sep: ':',
									type: 'seconds',
									title: 'seconds',
								}
							]
						:
					type=='face' ?
							[
								{
									type: 'days',
									title: 'day',
								},
								{
									type: 'hours',
									title: 'hour',
								},
								{
									sep: ':',
									type: 'minutes',
									title: 'minute',
								},
								{
									sep: ':',
									type: 'seconds',
									title: 'second',
								}
							]
						:
							null;


		return	<div className={'FlipClock'}>

				{
					show_units
						.map( (u, i) => [

										i>0 ? <div className='divider' key={'fcu-div-'+i}>{u.sep||'\u00A0'}</div> : null

										,

										<FlipUnit 

											title = {u.title}

											digit = {this.state[u.type]} 
											pre_digit = {this.state[`${u.type}_pre`]} 

											__shuffle = {this.state[`${u.type}_shuf`]} 


											key = {'fcu-'+i}

										  />
									]

							  )
				}

			</div>
	}

	// 		--------------------------------		--------------------------------		---------
}
