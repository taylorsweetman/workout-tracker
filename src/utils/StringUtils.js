export const beautifyStr = (inputStr) => {
	var parts = inputStr.split('_');
	var outputStr = '';

	for (var part of parts) {
		const firstChar = part.charAt(0).toUpperCase();
		const newWord = firstChar + part.slice(1);
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

	for (var part of parts) {
		const newWord = part.toLowerCase();
		if (outputStr.length === 0) {
			outputStr += newWord;
		} else {
			outputStr += '_' + newWord;
		}
	}

	return outputStr;
};
