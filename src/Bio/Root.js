/**
 * @lends Bio.Root
 */
Bio.Root = Class.create(
/**
 * Bio.Root
 * @class An abstract base class. All BioJS object inherit from it.
 * @param Hash args
 * @constructs
 */
{
  initialize: function(args) {
    this.e = Prototype.emptyFunction;
    this.ie = Prototype.Browser.IE;
    this.nl="\n";
    if(this.ie){
      this.nl="\r\n";
    }
    // default options
    this.options = Object.extend({
      BioRoot:true           // test to see if Root is loaded properly
    }, args || { });
  },
  /**
   * Throw a message in a BioJS kind of way
   * @TODO include a stack trace or make it pretty
   * @param {String} msg The message to output
   * @function
   */
  throw:function(msg){
    throw(msg);
  },
  /**
   * Log a message or other variable
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
   */
  notImplemented:function(){
		this.throw("This function is not yet implemented");
	},
	/**
	 * Called if the object is printed as a string
	 * @private
	 */
	toString:function(){
		return typeof(this)+"\n"+Object.toJSON(this);
  }
});
