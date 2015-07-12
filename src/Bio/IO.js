Bio.functions.include_once("Bio::IO::String");
/**
 * @lends Bio.IO
 */
Bio.IO = Class.create(Bio.Root,{ 
  /**
   * Bio.IO Doesn't really do anything right now but serves as an IO abstract class
   * @author Lee Katz <lskatz@gmail.com>
   * @class
   * @constructs
   * @extends Bio.Root
   * @name Bio.IO
   */
  initialize: function($super,args) {
    $super(args);
  }
});

