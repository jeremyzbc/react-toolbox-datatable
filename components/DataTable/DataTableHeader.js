import React, { Component } from 'react';
import { ListItem, ListDivider } from 'react-toolbox/lib/list';
// import FloatActionButton from 'src/components/ui/FloatActionButton';
import { IconButton} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

import classnames from 'classnames';

import styles from './style.scss';
import inputStyles from 'styles/components/input.scss';

export default class DataTableHeader extends Component{
	constructor(props) {
		super(props);
		this.state = {
			activeIcons: []
			// ,columnFilters: this.props.columnFilters
		}
	}

	activeSorting = (index, descAsc) => {
		let activeIcons = this.state.activeIcons;
		activeIcons[index] = descAsc;
		this.setState({activeIcons});
	}

	// onColumnFilter = (modelIndex, value) => {
	// 	this.state.columnFilters[modelIndex] = value;
	// 	this.setState({columnFilters: this.state.columnFilters});
	// 	this.props.onFilter(this.props.models[modelIndex].property, value);
	// }

	render() {
		let {breakpoint, children, dataStartColumn, columnFilters, models, onSort, onFilter, sortable, widths} = this.props;
		// columnFilters = columnFilters || [];
		return (
			<header style={{display: 'none'}} class={`d-${breakpoint}-block`}>
				<ListItem ripple={false} itemContent={
					<h6 class="text-grey reset-margin d-flex align-self-center" style={{width: '100%'}}>
						{React.Children.map(children, (child, index) => {
							let modelIndex = index - (dataStartColumn-1);
							return (
							<div key={index} style={{width: widths[index]}} class={`text-small ${styles['thead-cell']}`}>
								{child}
								{/*columnFilters.hasOwnProperty(modelIndex) && columnFilters[modelIndex]!==false && modelIndex >= 0 && modelIndex < models.length?
									<FloatActionButton class={styles.fab} position="relative" direction="left" button={<IconButton icon='filter_list' />} activeButton={<IconButton icon='close' theme={{toggle: 'hidden'}}/>}>
										<Input onChange={this.onColumnFilter.bind(this, modelIndex)} type='text' hint='Filter' value={this.state.columnFilters[modelIndex]} theme={{
											input: styles.search,
											inputElement: `text-grey text-small ${inputStyles['hide-bottom-bar']}`,
											hint: `text-grey ${styles.hint} ${inputStyles['hint-text-small']}`
										}}/>
									</FloatActionButton>
									:null
								*/}
								{sortable && modelIndex >= 0 && modelIndex < models.length?
									<span class={styles.sort}>
										<i class={classnames('material-icons', {[styles.active]: this.state.activeIcons[modelIndex]=='DESC'})} onClick={
											() => {
												this.activeSorting(modelIndex, 'DESC');
												let type = models[modelIndex].type || 'string';
												onSort(type, models[modelIndex].property, 'DESC');
										}}>
											arrow_drop_up
										</i>
										<i class={classnames('material-icons', {[styles.active]: this.state.activeIcons[modelIndex]=='ASC'})} onClick={
											() => {
												this.activeSorting(modelIndex, 'ASC');
												let type = models[modelIndex].type || 'string';
												onSort(type, models[modelIndex].property, 'ASC')
										}}>
											arrow_drop_down
										</i>
									</span>
									:null
								}
							</div>
							);
						})}
					</h6>
				}/>
				<ListDivider theme={{divider: 'reset-margin'}}/>
			</header>
		)
	}
}