import React, { Component } from 'react';

import styles from './style.scss';

const DataTableCell = props => {
	let {breakpoint, heading, width, children, source, model, setTemplate} = props;

	let template;
	if(setTemplate !== undefined && source !== undefined) {
		template = setTemplate(source);
	}

	return model !== undefined ?
		(<div style={{width}} class="text-small">
			{<p class={`text-grey reset-margin d-${breakpoint}-none`}>{heading}</p>}
			{children}
			{template? template: source[model.property]}
		</div>)
		:
		(<div style={{width}} class={`text-small d-flex`}>{template? template: children}</div>);

};

export default DataTableCell;