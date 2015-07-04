/**
 * @lends Bio.FeatureIO.gff
 */
Bio.functions.include_once("Bio::Feature::Feature");
Bio.functions.include_once("Bio::FeatureIO");
Bio.FeatureIO.gff = Class.create(Bio.FeatureIO,{
  /**
   * Bio.FeatureIO.gff
   * @author Lee Katz <lskatz@gmail.com>
   * @class Input/output stream for gff files
   * @constructs
   * @extends Bio.FeatureIO
   */
  initialize: function($super,el,args){
    $super(el,args);
    
    // if the mode is write, then set the value back to ""
    if(this.options.mode.match(/w/) && !this.options.mode.match(/\+/)){
      this.element.update();
    }
    //    TODO if the mode is append, then do not set the value back to ""
    
    var el=this.element;
    var value=el.innerHTML;
    if(el.value) value=el.value;
    if(value) this._parseFile(value);
  },
  /**
   * Gives a Bio.Feature object or false if there are no more features
   * @returns Bio.Feature
   */
  next_feature:function(){
    if(this._fCounter>=this.feature.length){
      this.reset();
      return false;
    }
    throw("Function not completed yet");
    var seq=this.seq[this._seqCounter];
    this._seqCounter++;
    return seq;
  },
  /**
   * Writes a single sequence to the document
   * @todo Be able to tie the function to an element's value or innerHTML
   * @param Seq A Seq object
   * @returns void
   */
  write_seq:function(Seq){
    var sequence=Seq.seq().replace(/(.{60})/g,"$1"+this.nl);
    var id=Seq.id();
    var desc=Seq.desc();
    var nl=this.nl;
    if(this.options.html) nl="<br />"+nl;
    var fasta=">"+id+" "+desc+nl+sequence+nl;
    
    if(this.element){
      this.element.insert(fasta);
    } else {
      document.write(fasta);
    }
  },
  /**
   * reset the iterator for the Seq array
   * @returns void
   */
  reset:function($super){
    this._seqCounter=0;
  },
  /**
   * Parses a gff string for features and returns an array of features
   * @returns Array of Features
   * @private
   */
  _parseFile:function(str){
    this.throw("not yet completed");
    var seqArray=[];
    var seqEntry=str.split(/>/);
    seqEntry=seqEntry.without("");
    for(var i=0;i<seqEntry.length;i++){
      seqEntry[i]=seqEntry[i].replace(/^\s+|\s+$/g,""); // trim
      if(seqEntry[i]=="") continue;
      var seq=this._parseSeqEntry(seqEntry[i]);
      seqArray.push(seq);
    }
    
    this.seq=seqArray;
    this.reset();
    return seqArray;
  },
  /**
   * Parses one sequence entry
   * @private
   * @returns Seq
   */
  _parseSeqEntry:function(entry){
    //var line=entry.split(/\n/);
    var line=entry.split(this.nl);
    var defline=line.shift();
    var id=defline.replace(/\s+.+$/,"");
    var desc=defline.replace(/^\S+\s*/,"");
    
    var sequence=line.join("").replace(/\s+/g,"");
    
    var seq=new Bio.Seq.primaryseq({id:id,desc:desc,seq:sequence});
    return seq;
  },
	toString:function(){
	  var returnStr="";
	  for(i=0;i<this.seq.length;i++){
	    returnStr+=this.seq[i]+this.nl;
	  }
	  return returnStr;
	}
});
