var RelevantWords = function(){

	this.THINGS_TO_STRIP = [
		"¿", "?", "¡", "!", //Question marks
		/(<([^>]+)>)/ig, 	//HTML Tags
	]

	this.getTopWords = function(text){
		var appeareancesOfWords = this.parse(text);
		var index = [];
		for (var word in appeareancesOfWords) {
   			index.push({ 'key': word, 'value': appeareancesOfWords[word]});
		}
		return index.sort(function(a,b){ 
			var aValue = a["value"],
				bValue = b["value"];
			return aValue == bValue ? 0 : (aValue < bValue ? 1 : -1); 
		}); 
	};	

	this.parse = function(text){
		if(text == '') return {};
		var cleanText = this.cleanText(text);
		return this.getOccurrences(cleanText);
	};

	this.getOccurrences = function(text){
		var occurrences = {};
		var arrayOfWords = text.split(" ");
		for (var i = 0; i < arrayOfWords.length; i++) {
			this.addOccurrence(arrayOfWords[i], occurrences);
		};
		return occurrences;
	};

	this.addOccurrence = function(key, map){
		if(key == "") return;
		if(!map[key]) {
			map[key] = 0;
		}
		map[key]++;
	};

	this.cleanText = function(originalString){
		var cleanedText = originalString;
		for (var i = 0; i < this.THINGS_TO_STRIP.length; i++) {
			cleanedText = cleanedText.replace(this.THINGS_TO_STRIP[i], " ");
		};
		return cleanedText;
	};

};