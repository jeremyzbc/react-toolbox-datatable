import React, { Component } from 'react';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTableCell from './DataTableCell';
import { List, ListDivider } from 'react-toolbox/lib/list';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import Input from 'react-toolbox/lib/input';
import Pagination from 'components/Pagination';

import styles from './style.scss';
import inputStyles from 'styles/components/input.scss';
import listStyles from 'styles/components/list.scss';

import { textFilter, sortFilter } from 'services/filter';
import { selectPageItems } from 'util';

class DataTable extends Component{
	constructor(props) {
		super(props);
		this.async = this.props.async !== undefined?  this.props.async: true;
		this.itemPerPageOptions = this.props.itemPerPageOptions || [10, 20 ,30];
		this.state = {
			source: this.props.source,
			currentPage: this.props.currentPage || 1,
			itemPerPage: this.props.itemPerPage || this.itemPerPageOptions[0],
			searchText: this.props.searchText || ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			source: nextProps.source,
			currentPage: nextProps.currentPage || 1,
			itemPerPage: nextProps.itemPerPage || this.itemPerPageOptions[0],
			searchText: nextProps.searchText || ''
		});
	}

	onSearch = searchText => {
		this.setState({searchText});
		if(this.props.onSearch !== undefined){
			this.timer? clearTimeout(this.timer): null;
			this.timer = setTimeout(() => {
				this.props.onSearch(searchText);
			}, 500);
		}
	}

	// onFilter = (property, filterText) => {
	// 	if(this.props.onFilter !== undefined){
	// 		this.props.onFilter(property, filterText);
	// 	}
	// 	if(!this.async){
	// 		//if async falsy, use frontend filter
	// 		let source = textFilter(this.state.source, filterText, property);
	// 		this.setState({source});
	// 	}
	// }

	onItemPerPageChange = option => {
		this.setState({itemPerPage: option});
		if(this.props.onItemPerPageChange !== undefined){
			this.props.onItemPerPageChange(option);
		}
	}

	onSort = (dataType, orderBy, descAsc) => {
		if(this.props.onSort !== undefined){
			this.props.onSort(orderBy, descAsc);
		}
		if(!this.async){
			//if async falsy, use frontend sorting
			let source = sortFilter( this.state.source, dataType, orderBy, descAsc);
			this.setState({source});
		}
	}

	onPageChange = pageNum => {
		this.setState({currentPage: pageNum});
		if(this.props.onPageChange !== undefined){
			this.props.onPageChange(pageNum);
		}
	}

	render(){
		let source = this.state.source;
		let widths = this.props.widths || [];
		let searchBy = this.props.models.map(model => model.property);
		let breakpoint = this.props.breakpoint !== undefined && ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(this.props.breakpoint) !== -1
							? this.props.breakpoint: 'md';
		if(!this.async){
			//if async falsy, use frontend searching
			source = textFilter(source, this.state.searchText, searchBy);
		}
		let currentPageItems = selectPageItems(source, this.state.currentPage, this.state.itemPerPage);
		let itemPerPageOptions = {};
		this.itemPerPageOptions.forEach( option => {
			itemPerPageOptions = Object.assign({}, itemPerPageOptions, {[option]: `Show ${option} entries`});
		})
		return (
			<div>
				<header class={styles['datatable-header']}>
					<Autocomplete
			          hint="Items per page"
			          source={itemPerPageOptions}
			          value={this.state.itemPerPage}
			          multiple={false}
			          showSuggestionsWhenValueIsSet={true}
			          onChange={this.onItemPerPageChange}
			          // disable typing
					  onKeyPress= {e=>e.preventDefault()}
			          theme={{
			          	inputInputElement: `text-grey text-small ${inputStyles['hide-bottom-bar']}`,
			          	autocomplete: 'reset-padding d-inline-block',
			          	suggestion: 'text-grey text-small'
			          }}/>
					<Input onChange={this.onSearch} icon='search' type='text' hint='Search...' value={this.state.searchText} theme={{
						input: styles.search,
						inputElement: `text-grey text-small ${inputStyles['hide-bottom-bar']}`,
						icon: inputStyles['icon-text-small'],
						hint: `text-grey ${inputStyles['hint-text-small']}`
					}}/>
					{this.props.actionElements}
			    </header>
				<List>
					<ListDivider />
					{React.Children.map(this.props.children, child =>
						// pass props to child components
						React.cloneElement(child, {
							loading: this.props.loading,
							widths: widths,
							breakpoint,
							source: currentPageItems,
							sortable: this.props.sortable,
							models: this.props.models,
							onSort: this.onSort,
							// onFilter: this.onFilter,
							dataStartColumn: this.props.dataStartColumn || 1
						})
					)}
				</List>
				<Pagination
					class="pull-right"
					prevIcon="chevron_left"
					nextIcon="chevron_right"
					currentPage = {this.state.currentPage}
					itemPerPage = {this.state.itemPerPage}
					source = {source}
					onPageChange = {this.onPageChange} />
				<div class="clearfix"></div>
			</div>
		);
	}
}

export {DataTable};
export {DataTableHeader};
export {DataTableBody};
export {DataTableCell};