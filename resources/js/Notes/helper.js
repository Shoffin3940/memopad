export async function createElement({element, id, elmClass, style, content, attributes, dataset}) {
	const elm = document.createElement(element);
	if(typeof id != 'undefined' && id != '') elm.id = id;
	if(typeof elmClass != 'undefined') elm.setAttribute('class', elmClass);
	if(typeof style != 'undefined') elm.setAttribute('style', style);
	if(typeof list != 'undefined') elm.setAttribute('list', list);
	if(typeof content != 'undefined'){
		if(typeof content == 'string' || typeof content == 'number'){
			elm.innerHTML = content;
		} else if(Array.isArray(content)){
			for(const element of content){
                if(element instanceof Node){
                    elm.appendChild(element);
                }
			}
		} else if(content instanceof Node){
			elm.appendChild(content);
		};
	}
	if(typeof attributes != 'undefined'){
		Object.entries(attributes).forEach(attribute => {
			elm.setAttribute(attribute[0], attribute[1]);
		});
	}
	
	if(typeof dataset !== 'undefined' && dataset !== null){
		Object.entries(dataset).forEach(data => {
			if(data[1] != null){
				const attributeName = 'data-' + data[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
				const attributeValue = data[1];
				elm.setAttribute(attributeName, attributeValue);
			}
		});
	}
	return elm;
}