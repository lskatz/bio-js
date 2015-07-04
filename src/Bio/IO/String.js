/**
 * @lends Bio.IO.String
 */
Bio.IO.String = Class.create(Bio.IO,{ 
  /**
   * Bio.IO.String is an IO stream for strings
   * @author Lee Katz <lskatz@gmail.com>
   * @class
   * @constructs
   * @extends Bio.Root
   */
  initialize: function($super,args) {
    $super(args);
    this.str=this.options.str;
    this.createPlaceholder();
  },
  /**
   * Reads the stream
   */
  read:function(){
    return this.el.innerHTML;
  },
  /**
   * Write to the steam, erase anything that existed before
   */
  write:function(str){
    this.el.update(str);
  },
  createPlaceholder:function(){
    this.el=new Element("textarea",{
      
    }).hide();
    $$("body")[0].insert(this.el);
  },
  /**
   * Destroy the IO object
   * @todo destroy this entire object; not just the element
   */
  destroy:function(){
    this.el.remove();
  },
  toString:function(){
    return this.el;
  }
});

