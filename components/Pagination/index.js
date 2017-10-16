import React, { Component } from 'react';
import Ripple from 'react-toolbox/lib/ripple';
import classnames from 'classnames';
import styles from './style.scss';

import { DEFAULT_ITEM_PER_PAGE } from 'constants';

// { theme, ...other } instead of {props}
// https://github.com/react-toolbox/react-toolbox/issues/790
const Link = ({ theme, ...other }) => (
	<a {...other} style={{position: 'relative'}}>
		{other.children}
	</a>
);

const RippleLink = Ripple()(Link);

const PaginationLink = ({children}) => {
	const cn = classnames({ [styles.active]: children.props.active, [styles.disabled]: children.props.disabled });
	return (
		<RippleLink href={children.props.href} onClick={children.props.onClick} class={cn}>
			{children.props.children}
		</RippleLink>
	);
};

export default class Pagination extends Component{
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.currentPage
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.currentPage !== this.props.currentPage){
			this.setState({currentPage: nextProps.currentPage})
		}
	}

	getLinkNums(currentPage, maxPage, pageLinkCount){
		let pos = currentPage;
		let posReverse = maxPage - currentPage;
		let firstLinkNumConditionOne;
		let lastLinkNumConditionOne;
		let firstLinkNumConditionTwo;
		let lastLinkNumConditionTwo;
		if(pos < Math.ceil(pageLinkCount/2)){
			firstLinkNumConditionOne = 1;
			lastLinkNumConditionOne = firstLinkNumConditionOne + pageLinkCount -1;
		}
		else{
			firstLinkNumConditionOne = currentPage - Math.ceil(pageLinkCount/2) +1;
			lastLinkNumConditionOne = firstLinkNumConditionOne + pageLinkCount -1;
		}
		if(posReverse < Math.floor(pageLinkCount/2)){
			lastLinkNumConditionTwo = maxPage;
			firstLinkNumConditionTwo = lastLinkNumConditionTwo - pageLinkCount +1;
		}
		else{
			lastLinkNumConditionTwo = currentPage + Math.floor(pageLinkCount/2);
			firstLinkNumConditionTwo = lastLinkNumConditionTwo - pageLinkCount +1;
		}
		let firstLinkNum = Math.max( Math.min(firstLinkNumConditionOne, firstLinkNumConditionTwo), 1);
		let lastLinkNum = Math.min( Math.max(lastLinkNumConditionOne, lastLinkNumConditionTwo), maxPage);
		let array = [];
		for(;firstLinkNum <= lastLinkNum;firstLinkNum++){
			array.push(firstLinkNum);
		}
		return array;
	}

	render(){
		let props = this.props;
		let pageLinkCount = props.pageLinkCount || 10;
		let itemPerPage = props.itemPerPage || DEFAULT_ITEM_PER_PAGE;
		let source = props.source || [];
		let maxPage = Math.ceil(source.length/itemPerPage);
		let currentPage = this.state.currentPage > maxPage? maxPage: this.state.currentPage;
		let linkArray = this.getLinkNums(this.state.currentPage, maxPage, pageLinkCount);
		let prevIcon = props.prevIcon || 'chevron_left';
		let nextIcon = props.nextIcon || 'chevron_right';

		return (
			<ul class={`${styles.pagination} ${props.className}`}>
				<li>
					<PaginationLink>
						<a disabled={currentPage <= 1} href="#" onClick={e => {
							e.preventDefault();
							if(currentPage == 1) return;

							let prevPage = --currentPage;
							this.setState({ currentPage: prevPage});
							props.onPageChange(prevPage);
						}}>
							<i class="material-icons">{prevIcon}</i>
						</a>
					</PaginationLink>
				</li>
				{
					linkArray.map( (linkNum, index) => (
						<li key={index}>
							<PaginationLink>
								<a active={currentPage == linkNum} href="#" onClick={e => {
									e.preventDefault();
									if(currentPage == linkNum) return;

									this.setState({ currentPage: linkNum});
									props.onPageChange(linkNum);
								}}>
									{linkNum}
								</a>
							</PaginationLink>
						</li>
					))
				}
				<li>
					<PaginationLink>
						<a disabled={currentPage >= maxPage} href="#" onClick={e => {
							e.preventDefault();
							if(currentPage >= maxPage) return;

							let nextPage = ++currentPage;
							this.setState({ currentPage: nextPage});
							props.onPageChange(nextPage);
						}}>
							<i class="material-icons">{nextIcon}</i>
						</a>
					</PaginationLink>
				</li>
			</ul>
		)
	}
}