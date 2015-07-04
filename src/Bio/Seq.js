Bio.functions.include_once("Bio::Alphabet");
/**
* @lends Bio.Seq
*/
Bio.Seq = Class.create(Bio.Root,{ 
/**
 * Bio.Seq
 * @Author Lee Katz <lskatz@gmail.com>
 * @class An interface for Seq objects.
 * @constructs
 * @extends Bio.Root
 */
  initialize: function($super,args){
    $super(args);
    
    // default variables
    this.options = Object.extend({
      id:"",
      seq:"",
      desc:"",
      alphabet:'dna' // TODO use a DNA class instead of a string
    }, this.options|| { });
  },
  /**
   * The sequence
   * @returns String
   */
  seq:function(){
    this.notImplemented();
  },
  /**
   * The length of the sequence
   * @returns Int
   */
  length:function(){
    return this.seq().length;
  },
  /**
   * The ID of the sequence
   * @returns String
   */
  id:function(){
    this.notImplemented();
  },
  /**
   * The description of the sequence, sans ID
   * @returns String
   */
  desc:function(){
    this.notImplemented();
  },
  /**
   * The alphabet of the sequence
   * @returns Alphabet
   */
  alphabet:function(){
    this.notImplemented();
  }
});
