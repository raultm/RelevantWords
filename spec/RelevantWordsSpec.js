describe("RelevantWords", function() {
  
  var relevantWords;

  beforeEach(function() {
    relevantWords = new RelevantWords();
  });

  describe("parse", function(){

    it("should return empty JSON for empty string", function() {
      var text = "";
      expect(relevantWords.parse(text)).toEqual({});
    });

    it("should return ocurrence of letter for single letter", function() {
      var text = "a";
      expect(relevantWords.parse(text)).toEqual({a: 1});
    });

    it("should return ocurrence of word for single word", function() {
      var text = "word";
      expect(relevantWords.parse(text)).toEqual({word: 1});
    });

    it("can detect two words", function() {
      var text = "bender fry";
      var expected = {
        bender : 1,
        fry : 1,
      };
      expect(relevantWords.parse(text)).toEqual(expected);
    });

    it("can count two same words", function() {
      var text = "bender bender";
      var expected = {
        bender : 2,
      };
      expect(relevantWords.parse(text)).toEqual(expected);
    });
  
    it("strip html tags", function() {
      var text = "<a>bender</a> <bold>bender</bold>";
      var expected = {
        bender : 2,
      };
      expect(relevantWords.parse(text)).toEqual(expected);
    });

    it("strip html tags & their attributtes", function() {
      var text = "<a href='http://kinetica.mobi'>bender</a> <bold>bender</bold> <img src='image.png'>";
      var expected = {
        bender : 2,
      };
      expect(relevantWords.parse(text)).toEqual(expected);
    });

    it("parse text avoiding question marks and exclamation marks", function() {
      var text = "¿Cual es el sentido de la vida? ¡42!";
      var expected = {
        "Cual" : 1,
        "es" : 1,
        "el" : 1,
        "sentido" : 1,
        "de" : 1,
        "la" : 1,
        "vida" : 1,
        "42" : 1,
      };
      expect(relevantWords.parse(text)).toEqual(expected);
    });

    it("must sort after count", function(){
      var text = "bender leela leela fry  ";
      var expected = {
        leela : 2,
        bender : 1,
        fry : 1,
      };
      expect(relevantWords.parse(text)).toEqual(expected);
    });
  });

  describe("getTopWords", function(){
    
    it("can order a simple letter", function(){
      var text = "a";
      var result = [{key: "a", value:1}];
      expect(relevantWords.getTopWords(text)).toEqual(result);
    });

    it("can order a simple word", function(){
      var text = "word";
      var result = [{key: "word", value:1}];
      expect(relevantWords.getTopWords(text)).toEqual(result);
    });

    it("can order two different words", function(){
      var text = "word success word";
      var result = [{key: "word", value:2}, {key: "success", value:1}];
      expect(relevantWords.getTopWords(text)).toEqual(result);
    });

    it("can sort two different words by appeareances", function(){
      var text = "word success word";
      var result = [{key: "word", value:2}, {key: "success", value:1}];
      expect(relevantWords.getTopWords(text)).toEqual(result);
    });

    it("can sort two different words in different order", function(){
      var text = "success word  word";
      var result = [{key: "word", value:2}, {key: "success", value:1}];
      expect(relevantWords.getTopWords(text)).toEqual(result);
    });


    it("can sort more different words in different order", function(){
      var text = "five five five five five four four four four three three three two two one";
      var result = [
        {key: "five", value:5}, 
        {key: "four", value:4},
        {key: "three", value:3},
        {key: "two", value:2},
        {key: "one", value:1},
        ];
      expect(relevantWords.getTopWords(text)).toEqual(result);
    });
  });
});
