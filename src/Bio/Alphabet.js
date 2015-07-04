Bio.functions.include_once("Bio::Seq");
/**
 * @lends Bio.Alphabet
 */
Bio.Alphabet = Class.create(Bio.Root,{ 
  /**
   * Bio.Alphabet
   * @author Lee Katz <lskatz@gmail.com>
   * @class define an alphabet
   * @constructs
   * @extends Bio.Root
   * @param Hash args A hash of arguments
   * @param String|Array args[alphabet] The letters of the alphabet
   * @param String|Array args[subalphas] Standard alphabets to use: "dna" and/or "protein"
   * @param Boolean args[caseSensitive] Whether to make the alphabet case sensitive
   */
  initialize: function($super,args) {
    $super(args);
    
    this.options = Object.extend({
      alphabet:'',
      subalphas:'',
      caseSensitive:true,
      letterLimit:9999      // how many letters max will be allowed
    }, this.options || { });
    
    this.alphabetArr=this._alphabet();
  },
  /**
   * Returns the alphabet as an array
   * @returns array
   */
  alphabet:function(){
    return this.alphabetArr;
  },
  /**
   * Tells you whether a letter is in this alphabet
   * @param String letter
   * @returns Boolean
   */
  contains:function(letter){
    if(this.alphabet().indexOf(letter) < 0)
      return false;
    return true;
  },
  /**
   * Processes the alphabet upon initilization
   * @private
   */
  _alphabet:function(){
    var alphabet;
    if(Object.isString(this.options.alphabet)){
      if(this.options.alphabet.length > this.options.letterLimit)
        this.throw("The number of letters in your alphabet are too many");
      alphabet=this.options.alphabet.split("");
    }
    else if(Object.isArray(this.options.alphabet)){
      if(this.options.alphabet.length > this.options.letterLimit)
        this.throw("The number of letters in your alphabet are too many");
      alphabet=$A(this.options.alphabet);
    }
    else{
      this.throw("The alphabet must be given as a string or array");
    }
    
    // import letters from a standard alphabet
    if(this.options.subalphas){
      var toAdd="";
      if(this.options.subalphas.match(/dna/i)){
          toAdd+='ATGCKMRYSWBVHDXN-.';
      } else if(this.options.subalphas.match(/rna/i)){
          toAdd+='AUGCKMRYSWBVHDXN-.';
      } else if(a.match(/prot|amino/i)){
          toAdd+='ARNDCEQGHILKMFPSTWYV*.-';
      }
      toAdd.split("").each(function(letter){
        alphabet.push(letter);
      });
    }
    
    // if case insensitive, add the lower or uppercase versions
    if(!this.options.caseSensitive){
      alphabet.each(function(e){
        // duplicates will be filtered out later anyway
        alphabet.push(e.toLowerCase());
        alphabet.push(e.toUpperCase());
      });
    }
    
    // remove null, undefined, and duplicates
    alphabet=alphabet.compact().uniq();
    return alphabet;
  }
});

