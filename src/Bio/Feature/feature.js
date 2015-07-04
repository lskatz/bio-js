/**
* @lends Bio.Feature.Feature
*/
Bio.Feature.Feature = Class.create(Bio.Feature,{ 
  /**
   * Bio.Feature.Feature
   * @author Lee Katz <lskatz@gmail.com>
   * @class primary class for features
   * @constructs
   * @extends Bio.Feature.Feature
   */
  initialize: function($super,args){
    $super(args);
    
    // mandatory arguments
    "seqid source type start end score strand phase".split(/\s+/).each(function(arg){
      if(!this.options[arg]){
        this.throw("Argument "+arg+" is mandatory for this class");
      }
    }.bind(this));
  },
  toString:function(){
    return this.gffLine(); // TODO make this.gffLine()
  }
});
