Bio.functions.include_once("Bio::Seq");
Bio.functions.include_once("Bio::SeqIO::Fasta");
Bio.functions.include_once("Bio::Alphabet");
/**
 * @lends Bio.SeqIO
 */
Bio.SeqIO = Class.create(Bio.Root,{ 
  /**
   * Bio.SeqIO
   * @author Lee Katz <lskatz@gmail.com>
   * @class Input/output stream for sequences
   * @constructs
   * @extends Bio.Root
   * @param Element|String el The element to read/write to
   * @param Hash args A hash with keys of either fileText or element
   * @param String Hash['mode'] A string of either r or w.  Can use + for append mode.  Default: "r"
   * @param String Hash['html']: whether or not to parse HTML or output HTML. Default: true
   * @name Bio.SeqIO
   */
  initialize: function($super,options) {
    $super(options);
  },
  /** 
   * returns a string representing the format
   * @param str The sequence string
   * @TODO do more than just FASTA
   * @returns String
   */
  guessFormat:function(str){
    var line=str.split(this.nl);
    for(var i=0;i<line.length;i++){
      if(line[i].match(/^>/)){
        i++;
        // if it has something other than ATCG or whitespace then it is not a fasta
        if(line[i].match(/[^ATCG\s]/)){
          i--;
          continue;
        }
        return 'fasta';
      }
    }
    return this.throw("Could not determine the type of sequence file");
  },
  /**
   * Gets the next sequence and returns a Bio::Seq compatible object
   * @returns Bio.Seq
   */
  next_seq:function(){
    this.notImplemented();
  },
  /**
   * writes out the next sequence
   */
  write_seq:function(){
    this.notImplemented();
  }
});

