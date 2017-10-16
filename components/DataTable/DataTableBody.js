import React, { Component } from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import styles from './style.scss';

const DataTableBody = props => {
	let {breakpoint, children, dataStartColumn, loading, models, source, widths} = props;

	let NoRecordFound = () => (<ListItem legend='No records found.' leftIcon='warning'/>);

	return loading?
	<ProgressBar type='circular' mode='indeterminate' multicolor />
	:
	(
		<List ripple theme={{list: 'reset-padding'}}>
			{
				source.length === 0 ? <NoRecordFound/ >
				:
				source.map((item, index) => (
					<ListItem key={index} class={styles['trow-wrapper']} itemContent={
						<h6 class={`reset-margin d-flex ${styles.trow} ${styles[breakpoint]}`} style={{width: '100%'}}>
							{React.Children.map(children, (child, innerIndex) => {
								if(innerIndex - (dataStartColumn -1) >= 0 && innerIndex - (dataStartColumn -1) < models.length){
									return React.cloneElement(child, {
										source: source[index],
										width: widths[innerIndex],
										model: models[innerIndex - (dataStartColumn -1)],
										breakpoint
									})
								}
								return React.cloneElement(child, {
									source: source[index],
									width: widths[innerIndex],
									breakpoint
								})
							})}
						</h6>
					}/>
				))
			}
		</List>
	);
}
export default DataTableBody;