export const beautifyStr = (inputStr) => {
	console.log('input', inputStr);
	var parts = inputStr.split('_');
	var outputStr = '';

	for (var idx in parts) {
		console.log('part', parts[idx]);
		const firstChar = parts[idx].charAt(0).toUpperCase();
		const newWord = firstChar + parts[idx].slice(1);
		console.log('new word', newWord);
		if (outputStr.length === 0) {
			outputStr += newWord;
		} else {
			outputStr += ' ' + newWord;
		}
	}

	return outputStr;
};
