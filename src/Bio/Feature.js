/**
* @lends Bio.Feature
*/
Bio.Feature = Class.create(Bio.Root,{ 
/**
 * Bio.Feature
 * @Author Lee Katz <lskatz@gmail.com>
 * @class An interface for Feature objects.
 * @constructs
 * @extends Bio.Root
 * @name Bio.Feature
 */
  initialize: function($super,args){
    $super(args);
    
    // default variables
    this.options = Object.extend({
      seqid:"",
      source:".",
      type:"",
      start:"",
      end:"",
      score:".",
      strand:".",
      phase:".",
      attributes:[]
    }, this.options|| { });

    this._checkArguments();
  }
});
