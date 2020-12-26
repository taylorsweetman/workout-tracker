export const beautifyStr = (inputStr) => {
	var parts = inputStr.split('_');
	var outputStr = '';

	for (var idx in parts) {
		const firstChar = parts[idx].charAt(0).toUpperCase();
		const newWord = firstChar + parts[idx].slice(1);
		if (outputStr.length === 0) {
			outputStr += newWord;
		} else {
			outputStr += ' ' + newWord;
		}
	}

	return outputStr;
};

export const urlifyStr = (inputStr) => {
	var parts = inputStr.split(' ');
	var outputStr = '';

	for (var idx in parts) {
		const newWord = parts[idx].toLowerCase();
		if (outputStr.length === 0) {
			outputStr += newWord;
		} else {
			outputStr += '_' + newWord;
		}
	}

	return outputStr;
};
