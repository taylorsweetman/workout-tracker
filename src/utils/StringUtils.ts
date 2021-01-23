export const beautifyStr = (inputStr: string): string => {
	let parts = inputStr.split('_');
	let outputStr = '';

	for (let part of parts) {
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

export const urlifyStr = (inputStr: string): string => {
	let parts = inputStr.split(' ');
	let outputStr = '';

	for (let part of parts) {
		const newWord = part.toLowerCase();
		if (outputStr.length === 0) {
			outputStr += newWord;
		} else {
			outputStr += '_' + newWord;
		}
	}

	return outputStr;
};
