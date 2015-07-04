/**
* @lends Bio.Align
*/
Bio.Align = Class.create(Bio.Root,{ 
/**
 * Bio.Align
 * @Author Lee Katz <lskatz@gmail.com>
 * @class An interface for Alignment classes.
 * @constructs
 * @extends Bio.Root
 */
  initialize: function($super){
    this.options = Object.extend({
      file:false, // TODO accept a filename
      fileText:false // the string contents of a file
    }, arguments[1]|| { });
  },
  /**
   * Add a sequence to the MSA.  Does not align.
   * @returns Seq The freshly added Seq
   */
  addSeq:function(){
    this.notImplemented();
  },
  /**
   * Remove a sequence from the MSA.
   * Does not realign the remaining Seqs
   * @returns Seq The removed Seq
   * @param Seq the object to remove
   */
  removeSeq:function(){
    this.notImplemented();
  },
  /**
   * Returns an array of sequences, sorted by ID
   * @returns Array array of sequences
   * @TODO allow a sort parameter
   */
  each_seq:function(){
    this.notImplemented();
  },
  /**
   * Perform a multiple sequence alignment.
   * @TODO give an option on which algorithm to align with, or an option to send the sequences to a server to perform MSA
   */
  align:function(){
    this.notImplemented();
  },
  consensus_string:function(){
    this.notImplemented();
  }
});
