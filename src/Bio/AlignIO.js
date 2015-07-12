Bio.functions.include_once("Bio::Align");

Bio.AlignIO = Class.create(Bio.Root,{ 
  /**
   * @lends Bio.AlignIO
   * @author Lee Katz <lskatz@gmail.com>
   * @class
   * @classdesc Input/output stream for multiple sequence alignments
   * @constructs
   * @extends Bio.Root
   * @inheritdoc
   * @name Bio.AlignIO
   * @namespace 
   * @todo somehow use $super to get default variables too
   */
  initialize: function($super) {
    this.options = Object.extend({
      file:false, // TODO accept a filename
      format:false,
      fileText:false // the string contents of a file
    }, arguments[1]|| { });
    // check for required parameters
    if(this.options.fileText==false){
      this.throw("AlignIO requires a fileText parameter");
    }
    
    // get the correct AlignIO object
    if(!this.options.format){
      this.options.format=this.guessFormat(this.options.fileText);
    }
    var format=this.options.format;
    return new Bio.AlignIO[format](this.options);
  },

  /** 
   * @function
   * @func Bio.AlignIO.guessFormat
   * @desc Returns a string representing the format
   * @param {string} Sequence The sequence string
   * @TODO Do more than just FASTA
   * @returns {string} The name of the format
   * @inner
   * @memberof Bio.AlignIO
   */
  guessFormat:function(str){
    var line=str.split("\n");
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
    this.throw("Could not determine the type of sequence file");
  },
  /**
   * Gets the next sequence and returns a Bio::Align compatible object
   * @returns Bio.Align
   */
  next_aln:function(){
		this.notImplemented();
	}
});

