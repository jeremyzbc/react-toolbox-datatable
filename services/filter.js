export function textFilter(collections, searchText, searchBy){
	if(searchText === undefined) return collections;

	let search = searchText.trim().toLowerCase();

	return collections.filter(item => {
		if(Object.getOwnPropertyNames(item).length == 0){
			return item.toString().toLowerCase().indexOf(search) > -1;
		}
		let finds = [];
		if(searchBy === undefined){
			for(let key in item){
				finds.push(item[key]!==undefined && item[key].toString().toLowerCase().indexOf(search) > -1);
			}
			return finds.some(find => find === true);
		}
		if(!Array.isArray(searchBy)){
			searchBy = [searchBy];
		}

		for(let i = 0; i< searchBy.length; i++){
			finds.push(item[searchBy[i]]!==undefined && item[searchBy[i]].toString().toLowerCase().indexOf(search) > -1);
		}
		return finds.some(find => find === true);
	});
}

export function sortFilter(collections, dataType, orderBy, descAsc='DESC'){
	collections.sort( (itemA, itemB) => {
		if(itemA.hasOwnProperty(orderBy) && itemB.hasOwnProperty(orderBy)){
			switch(dataType.toLowerCase()){
				case 'number':{
					itemA[orderBy] = itemA[orderBy]!==undefined? itemA[orderBy]: '';
					itemB[orderBy] = itemB[orderBy]!==undefined? itemB[orderBy]: '';
					if(descAsc == 'ASC'){
						if(Number(itemA[orderBy]) > Number(itemB[orderBy])){
							return -1;
						}
						return 1;
					}
					else{
						if(Number(itemA[orderBy]) > Number(itemB[orderBy])){
							return 1;
						}
						return -1;
					}
					break;
				}
				case 'date':{
					let tempA = new Date(itemA[orderBy]);
					let tempB = new Date(itemB[orderBy]);
					if(descAsc == 'ASC'){
						if(tempA > tempB){
							return -1;
						}
						return 1;
					}
					else{
						if(tempA > tempB){
							return 1;
						}
						return -1;
					}
					break;
				}
				default: {
					itemA[orderBy] = itemA[orderBy] || '';
					itemB[orderBy] = itemB[orderBy] || '';
					if(descAsc == 'ASC'){
						if(itemA[orderBy].toString().toLowerCase() > itemB[orderBy].toString().toLowerCase()){
							return -1;
						}
						return 1;
					}
					else{
						if(itemA[orderBy].toString().toLowerCase() > itemB[orderBy].toString().toLowerCase()){
							return 1;
						}
						return -1;
					}
				}
			}
		}
		else{
			throw new Error(`Object does not have property - ${orderBy}`);
		}
	});
	return collections;
}