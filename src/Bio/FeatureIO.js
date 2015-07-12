Bio.functions.include_once("Bio::Feature::Feature");
Bio.functions.include_once("Bio::FeatureIO::gff");
/**
 * @lends Bio.FeatureIO
 */
Bio.FeatureIO = Class.create(Bio.Root,{ 
  /**
   * Bio.FeatureIO
   * @author Lee Katz <lskatz@gmail.com>
   * @class Input/output stream for sequence features
   * @constructs
   * @extends Bio.Root
   * @param Element|String el The element to read/write to
   * @param Hash args A hash with keys of either fileText or element
   * @param String Hash['mode'] A string of either r or w.  Can use + for append mode.  Default: "r"
   * @name Bio.FeatureIO
   */
  initialize: function($super,el,args) {
    $super(args);
    
    // TODO if the first argument isn't an existing element,
    // create an invisible element and update it with the contents of the first argument
    
    // the element is either an IO element or an element or the id of an element
    this.element=el.el||$(el)||this.throw("No element specified");
    this.options = Object.extend({
      mode:'r'  // read/write mode
    }, this.options|| { });
  },
  /** 
   * returns a string representing the format
   * @param str The sequence string
   * @TODO do more than just GFF
   * @returns String
   */
  guessFormat:function(str){
    var line=str.split(this.nl);
    for(var i=0;i<line.length;i++){
      if(line[i].match(/^##gff-version 3/)){
        return "gff";
      }
    }
    this.throw("Could not determine the type of sequence file");
  },
  /**
   * Gets the next feature and returns a Bio::Feature compatible object
   * @returns Bio.Feature
   */
  next_feature:function(){
		this.notImplemented();
	},
	/**
	 * writes out the next feature
	 */
	write_feature:function(){
	  this.notImplemented();
	}
});

