import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { DataTable, DataTableHeader, DataTableBody, DataTableCell} from 'components/DataTable';

export default class App extends Component{
	constructor(props) {
		super(props);
		this.games = [
			{
				'Name': 'StarCraft',
				'Price': '22',
				'Issue Year': '1998',
				'Company': 'Blizzard'
			},
			{
				'Name': 'StarCraft 2',
				'Price': '42',
				'Issue Year': '2010',
				'Company': 'Blizzard'
			},
			{
				'Name': 'WOW',
				'Price': '68',
				'Issue Year': '2005',
				'Company': 'Blizzard'
			}
		];
	}

	render(){
		return (
			<div style={{padding: '2rem'}}>
				<section>
					<h5>DataTable</h5>
					<DataTable
						onSort={(orderBy, descAsc) => console.log(`onSort start - orderBy ${orderBy} - ${descAsc}`)}
						onItemPerPageChange={option => console.log(`onItemPerPageChange start - option ${option}`)}
						onSearch={searchText => console.log(`onSearch start - searchText ${searchText}`)}
						onPageChange={pageNum => console.log(`onPageChange start - page ${pageNum}`)}
						async={false}

						models={[
							{property: 'Name'},
							{property: 'Price', type: 'number'},
							{property: 'Issue Year', type: 'number'},
							{property: 'Company'}
						]}
						source={this.games}
						breakpoint='md'
						// last cell width 'auto' would take rest space
						widths={['20%','20%','20%','auto']}
						itemPerPage = {2}
						itemPerPageOptions = {[2, 10 , 20, 30]}
						sortable
						actionElements={
							<Button label="New" icon='add' />
						}>
						<DataTableHeader>
							<span>Name</span>
							<span>Price</span>
							<span>Issue Year</span>
							<span>Company</span>
						</DataTableHeader>
						<DataTableBody>
							<DataTableCell heading="Name"/>
							<DataTableCell heading="Price"/>
							<DataTableCell heading="Issue Year"/>
							<DataTableCell heading="Company"/>
						</DataTableBody>
					</DataTable>
				</section>
			</div>
		)
	}
}