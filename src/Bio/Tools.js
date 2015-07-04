Bio.functions.include_once("Bio::Tools::Align");
/**
 * @lends Bio.Tools
 */
Bio.Tools=Class.create(Bio.Root,{
  /**
   * Bio.Tools
   * @Author Lee Katz <lskatz@gmail.com>
   * @class An interface for tools
   * @constructs
   * @extends Bio.Root
   */
  initialize:function($super,args){
    $super(args);
  
    this.options = Object.extend({
      out:false        // output element
    }, this.options);
  }
});
