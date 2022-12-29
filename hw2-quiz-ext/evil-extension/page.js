const MATCH_LIST = {
	'there': 'their',
	'their': 'there',
	'they\'re': 'there',
	'There': 'Their',
	'Their': 'There',
	'They\'re': 'There',
	'THERE': 'THEIR',
	'THEIR': 'THERE',
	'THEY\'RE': 'THERE'
};


function transformTextNodes(node) {
	if (node.nodeType == Node.TEXT_NODE) {
		let textArray = node.textContent.split(' ');
		let newTextArray = new Array();
		for(let word of textArray){
			for(let matchingWord in MATCH_LIST){
				if(word.trim() == matchingWord){
					word = word.replace(matchingWord, MATCH_LIST[matchingWord]);
					break;
				}
			}
			newTextArray.push(word);
		}
		node.textContent = newTextArray.join(' ');
  } 
  for (const child of node.childNodes) {
	if(child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' )
		transformTextNodes(child);
  }
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');