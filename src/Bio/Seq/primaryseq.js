/**
* @lends Bio.Seq.primaryseq
*/
Bio.Seq.primaryseq = Class.create(Bio.Seq,{ 
  /**
   * Bio.Seq.primaryseq
   * @author Lee Katz <lskatz@gmail.com>
   * @class primary class for sequences
   * @constructs
   * @extends Bio.Seq
   * @todo add an alphabet parameter
   */
  initialize: function($super,args){
    $super(args);
    
    // mandatory arguments
    ['seq','id'].each(function(arg){
      if(!this.options[arg]){
        this.throw("Argument "+arg+" is mandatory for this class");
      }
    }.bind(this));
    // remove any whitespace from the sequence
    this.options.seq=this.options.seq.replace(/\s+/,"");
    
    this.alphabet(this._guessAlphabet());
  },
  /**
   * Return or update the sequence
   * @param seq If set, then updates the sequence
   * @todo validate against the alphabet, if it is set
   */
  seq:function(seq){
    if(seq){
      this.options.seq=seq;
    }
    return this.options.seq;
  },
  /**
   * Return or update the id
   * @param id If set, then updates the id
   */
  id:function(id){
    if(id){
      this.options.id=id;
    }
    return this.options.id;
  },
  /**
   * Return or update the description
   * @param desc If set, then updates the description
   */
  desc:function(desc){
    if(desc){
      this.options.desc=desc;
    }
    return this.options.desc;
  },
  alphabet:function(alphabet){
    if(alphabet){
      if(Object.isString(alphabet)){
        if(alphabet.match(/dna/i)){
          alphabet=new Bio.Alphabet({
            subalphas:'dna',
            caseSensitive:false
          });
        }
        else if(alphabet.match(/prot|amino/i)){
          alphabet=new Bio.Alphabet({
            subalphas:'protein',
            caseSensitive:false
          });
        }
      } // END if string
      this.options.alphabet=alphabet;
    }
    return this.options.alphabet;
  },
  // ported this straight from bioperl
  _guessAlphabet:function(){
    var type;
    var str=this.seq().replace(/[-.?]/gi,"").toUpperCase();
    var total=str.length;
    if(!total) return "";
    
    var u=str.replace(/[^U]/,"").length;
    var atcg=str.replace(/[^ATCG]/,"").length;
    
    if( (atcg/total) > 0.85 ) {
      type="dna";
    } else if ( ((atcg+u)/total) > 0.85 ){
      type="rna";
    } else {
      type="protein";
    }
    
    var alphabet=new Bio.Alphabet({subalphas:type});
    return alphabet;
    return type;
  },
  toString:function(){
    return this.fasta();
  },
  /**
   * Return a fasta representation of the Seq
   * @returns String
   */
  fasta:function(){
    //var re = new RegExp("regex","g");
    var fasta=">"+this.id()+" "+this.desc()+this.nl
             // TODO make the width customizable
             +this.seq().replace(/(.{60})/g,"$1"+this.nl);
    return fasta;
  }
});