Bio.functions.include_once("Bio::Tools::Align");

/**
 * @author Lee Katz <lskatz@gmail.com>
 * @constructs
 * @augments Bio.Root
 * @name Bio.Tools
 * @inheritdoc
 */
Bio.Tools=Class.create(Bio.Root,{
  initialize:function($super,options){
    $super(options);
  
    this.options = Object.extend({
      outEl:false        // output element
    }, this.options);
  }
});
