/**
 * @lends Bio.Root
 */
Bio.Root = Class.create({
  /**
   * An abstract base class. All BioJS object inherit from it.
   * @author Lee Katz <lskatz@gmail.com>
   * @class
   * @param {Array} options An associative array with options
   * @param {*} options.something Child variable function, to be determined by the child
   * @constructs
   * @abstract
   * @name Bio.Root
   */
  initialize: function(options) {
    this.e = Prototype.emptyFunction;
    this.ie = Prototype.Browser.IE;
    this.nl="\n";
    if(this.ie){
      this.nl="\r\n";
    }

    // Initialize the options to an empty hash
    this.options=this.options || $H();
    // Add onto the options if any others are given
    this.getopts(options);
  },
  /**
   * @function getopts Sets parameters from the options associative array
   */
  getopts: function(options){
    this.options.BioRoot=true;
    var functionOptions=this.options;

    options=$H(options);
    options.each(function(pair){
      functionOptions[pair.key]=pair.value;
    });
    this.options=functionOptions;
  },
  /**
   * Throw a message in a BioJS kind of way
   * @TODO include a stack trace or make it pretty
   * @param {String} msg The message to output
   * @function
   */
  throw:function(msg){
    var err=new Error(msg);
    return err.stack;
  },
  /**
   * Log a message or other variable
   * @param {*} Var Any variable you'd like to log
   */
  log:function(){
    for(var i=0;i<arguments.length;i++){
      this._log(arguments[i]);
    }
  },
  /**
   * Actually log the variable
   * @private
   */
  _log:function(msg){
    if(window.console){
      console.log(msg);
    } else {
      if(Object.isHash(msg) || Object.isArray(msg)){
        msg=Object.toJSON(msg);
      }
      if(typeof(msg) == 'object'){
        msg=Object.toJSON(msg);
      }
      document.write("<pre>"+msg+"\n</pre>");
    }
  },
  /**
   * Catch an error, useful error information in a try..catch statement
   * @param err The error message string
   */
  catchError:function (err){
    txt="There was an error on this page.\n\n";
    txt+="Error description: " + err.description + "\n\n";
    txt+=err.stack+"\n";
    return txt;
  },
  /**
   * Call this function anywhere as a placeholder for another one.
   * This is the method given in any abstract class before it's replaced.
   * @throws {string} "This function is not yet implemented"
   */
  notImplemented:function(){
    this.throw("This function is not yet implemented");
  },
  /**
   * Called if the object is printed as a string
   * @access private
   */
  toString:function(){
          return typeof(this)+"\n"+Object.toJSON(this);
  }
});
