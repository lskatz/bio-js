Bio.functions.include_once("Bio::Tools::Align");
/**
 * An interface for tools
 * @lends Bio.Tools
 */
Bio.Tools=Class.create(Bio.Root,{
  /**
   * @author Lee Katz <lskatz@gmail.com>
   * @constructs
   * @extends Bio.Root
   * @implements {Bio.Root}
   * @abstract
   * @name Bio.Tools
   * @param {Array} options An associative array with options
   * @param options.outEl {Element} The output element
   */
  initialize:function($super,options){
    $super(options);
  
    this.options = Object.extend({
      outEl:false        // output element
    }, this.options);
  }
});
