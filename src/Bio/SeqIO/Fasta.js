/**
 * @lends Bio.SeqIO.Fasta
 */
Bio.functions.include_once("Bio::Seq::Primaryseq");
Bio.SeqIO.Fasta = Class.create(Bio.SeqIO,{
  /**
   * Bio.SeqIO.Fasta
   * @author Lee Katz <lskatz@gmail.com>
   * @class Input/output stream for fasta files
   * @constructs
   * @extends Bio.SeqIO
   * @name Bio.SeqIO.Fasta
   */
  initialize: function($super,options){
    $super(options);

    // some properties to get us going
    this.seq=[];
    this.sequenceString="";

    if(typeof options["el"] !== 'undefined'){
      this.sequenceString=$(options.el).innerHTML.unescapeHTML();
    } else if(typeof options["string"] !== 'undefined'){
      this.sequenceString=options.string;
    } 
    if(this.sequenceString) this._parseFile(this.sequenceString);


  },
  /**
   * Gives a Bio.Seq object or false if there are no more sequences
   * @returns Bio.Seq
   */
  next_seq:function(){
    if(this._seqCounter>=this.seq.length){
      this.reset();
      return false;
    }
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
   * Parses a fasta string for sequences and returns an array of sequences
   * @returns Array of Seqs
   * @private
   */
  _parseFile:function(str){
    // remove the first >
    str=str.replace(/^>/,'');
    var seqArray=[];
    //var seqEntry=str.split(/>/);
    var seqEntry=str.split(this.nl+">");
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
    
    var seq=new Bio.Seq.Primaryseq({id:id,desc:desc,seq:sequence});
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
