import { DEFAULT_ITEM_PER_PAGE } from 'constants'

export function selectPageItems(allItems, pageNum, itemPerPage){
	itemPerPage = itemPerPage || DEFAULT_ITEM_PER_PAGE;
	let maxPageNum = Math.ceil(allItems.length / itemPerPage);
	if(pageNum > maxPageNum) pageNum = maxPageNum;
	return allItems.slice( (pageNum - 1)* itemPerPage, pageNum* itemPerPage );
}