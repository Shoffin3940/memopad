
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

export async function createIcon({icon, id, customClass, dataset}) {
	const iconId = typeof id != undefined ? id : '';
	let iconClass = `bi bi-${icon}`;
	if(typeof customClass != 'undefined') iconClass = `${iconClass} ${customClass}`;
	return await createElement({
		element: 'i',
		id: iconId, 
		elmClass: iconClass,
		dataset: dataset
	});
}

export async function inputGroup({inputId, inputType, inputName, elmClass, placeholder, groupType, iconName, inputValue, requiredInput}) {
	const icon = await createIcon({icon: iconName});
	const iconWrapper = await createElement({
		element: 'span',
		elmClass: `input-group-${groupType}`,
		content: icon
	});
	const input = await createElement({
		element: 'input',
		id: inputId,
		elmClass: `form-control form-control-sm ${elmClass}`,
		attributes: {
			type: inputType,
			name: inputName,
			value: typeof inputValue == 'undefined' || inputValue == null ? '' : inputValue,
			placeholder: placeholder,
			autocomplete: 'off'
		}
	});
	if(requiredInput) input.setAttribute('required', true)
	if(inputType == 'force-number'){
		input.type = 'text',
		input.addEventListener('keydown', forceInputNumber);
	}


	const wrapper = await createElement({
		element: 'div',
		elmClass: 'input-group mb-3',
		content: [
			iconWrapper,
			input
		]
	});

	return wrapper;
}

export async function createFormControlledInputGroup({inputId, inputType, inputName, labelText, elmClass, iconName, defaultValue, disabled, required}) {
    let labelClass = 'form-label';
    labelClass += typeof defaultValue == 'string' || typeof defaultValue == 'number' ? ' active' : '';
    labelClass += typeof elmClass != 'undefined' && typeof elmClass.label == 'string'? ` ${elmClass.label}` : '';
    const label = await createElement({
        element: 'label',
        elmClass: labelClass,
        content: labelText,
        attributes: {
            for: inputId
        }
    });
    let inputClass = 'form-control';
    inputClass += typeof elmClass != 'undefined' && typeof elmClass.input == 'string' ? elmClass.input : '';
    const input = await createElement({
        element: 'input',
        id: inputId,
        elmClass: inputClass,
        attributes: {
            type: inputType,
            value: defaultValue ?? '',
            required: typeof required == 'boolean' && required,
            name: inputName,
            autocomplete: "off"
        }
    });
    if(typeof disabled == 'boolean' && disabled) input.disabled = true;
    const elements = [input, label];
    let wrapperClass = 'input-group mt-4';
    if(typeof iconName == 'string'){
        wrapperClass += ' with-icon';
        const icon = await createIcon({ icon: iconName});
        elements.unshift(await createElement({
            element: 'span',
            elmClass: 'input-group-text',
            content: icon
        }));
    }
    input.addEventListener('focus', ()=>{
        label.classList.add('active');
    });
    input.addEventListener('blur', ()=>{
        if(input.value == '') label.classList.remove('active');
    });
    wrapperClass += typeof elmClass != 'undefined' && typeof elmClass.wrapper == 'string' ? ` ${elmClass.wrapper}` : '';
    return await createElement({
        element: 'div',
        content: elements,
        elmClass: wrapperClass
    });
}

export async function createCheckBox({id, inputName, labelText, elmClass}) {
	if(typeof elmClass == 'undefined') elmClass = '';
	const input = await createElement({
		element: 'input',
		elmClass: 'form-check-input',
		id: id,
		attributes: {
			type: 'checkbox',
			name: inputName,
		}
	});
	const label = await createElement({
		element: 'label',
		content: labelText,
		elmClass: `form-text-label ${elmClass}`,
		attributes: {
			for: id
		}
	});
	const wrapper = await createElement({
		element: 'div',
		elmClass: 'form-check mb-3',
		content: [
			input,
			label
		]
	});

	return wrapper;
}

export async function createButton({id, type, elmClass, icon, iconClass, text, ariaLabel, dataset, isDisabled}) {
    if(typeof icon != 'undefined') icon = await createIcon({
        icon: icon,
		customClass: iconClass
    });
    if(typeof text != 'undefined') text = document.createTextNode(text);
	const button = await createElement({
		element: 'button',
		elmClass: `btn ${elmClass ?? ''}`,
		content: typeof icon != null ? [icon, text] : text,
		attributes: {
			type: type,
			...(isDisabled ? {disabled: true} : {} ),
			...(ariaLabel ? {'aria-label': ariaLabel} : {})
		},
		dataset: dataset
	});
    if(typeof attributes != 'undefined'){
        Object.entries(attributes).forEach(attribute => {
            if(attribute[1] != null){
                const attributeName = attribute[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                const attributeValue = attribute[1];
                button.setAttribute(attributeName, attributeValue);
            }
        });
    }
    if(typeof dataset !== 'undefined' && dataset !== null){
        Object.entries(dataset).forEach(data => {
            if(data[1] != null){
                const attributeName = 'data-' + data[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                const attributeValue = data[1];
                button.setAttribute(attributeName, attributeValue);
            }
        });
    }
	if(typeof id != 'undefined') button.id = id;
	return button;
}

export async function createDatePicker({id, elmClass, name, iconName, iconClass, value}){
	const icon = await createIcon({
		icon: iconName,
		customClass: iconClass
	})
	const input = await createElement({
		element: 'input',
		id: id,
		elmClass: `form-control form-control-sm ${elmClass}`,
		attributes: {
			type: 'date',
			name: name,
			value: typeof value == 'undefined' || value == null ? '' : value
		}
	})
	const div = await createElement({
		element: 'div',
		elmClass: 'd-flex justify-content-between align-items-center date-picker',
		content: [
			iconName != 'undefined' ? icon : '',
			input
		]
	})

	return div;
}

export async function createTable({id, elmClass, customHeader, headers, rows, dataset}) {
	// Header
	const headerTr = await createElement({ element: 'tr'})
	for (const header of headers) {
		const th = await createElement({ element: 'th', content: header });
		headerTr.appendChild(th);
	}
	const thead = await createElement({
		element: 'thead',
		elmClass: `align-middle text-center ${customHeader??''}`,
		content: headerTr
	});

	// Body
	const tbody = document.createElement('tbody');
	for (let i = 0; i < rows.length; i++) {
		// Build dataset for this row by taking i-th element from each dataset value
		let rowDataset = {};
		if (dataset && typeof dataset === 'object') {
			Object.entries(dataset).forEach(([key, values]) => {
				if (Array.isArray(values) && values[i] !== undefined) {
					rowDataset[key] = values[i];
				}
			});
		}

		const tr = await createElement({
			element: 'tr',
			dataset: rowDataset
		});

		for (const cell of rows[i]) {
			if (cell instanceof HTMLTableCellElement) {
				tr.appendChild(cell);
			} else {
				const td = await createElement({ element: 'td', elmClass: 'align-middle', content: cell });
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	}

	const table = await createElement({
		element: 'table',
		id: id,
		elmClass: elmClass,
		content: [thead, tbody]
	});
	return table;
}

export async function createSelector({id, elmClass, name, options, label, data, dataset, placeholder}) {
	const text = await createElement({
		element: 'label',
		content: label
	})
	
	const select = await createElement({
		id: id,
		element: 'select',
		elmClass: `form-select form-select-sm ${elmClass}`,
		attributes: {
			name: name
		},
		dataset: dataset
	})
	if (placeholder) {
		const ph = await createElement({
			element: 'option',
			attributes: { value: '' },
			content: placeholder
		});
		select.appendChild(ph);
	}
	
	if (Array.isArray(options)){
		for (const opt of options){
			const attr = {value: opt.Value}
			if (opt.Value == data) attr.selected = "selected";

			const option = await createElement({
				element: 'option',
				attributes: attr,
				content: opt.Content,
				...(opt.Dataset ? {dataset: opt.Dataset} : {})
			})
			select.appendChild(option)
		}
	}
	
	const div = await createElement({
		element: 'div',
		elmClass: 'd-flex align-items-center mb-3 justify-content-between',
		content: [text, select]
	})

	return label ? div : select;
}