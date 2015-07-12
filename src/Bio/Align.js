Bio.Align = Class.create(Bio.Root,{ 
/**
 * @lends Bio.Align
 * @name Bio.Align
 * @inheritdoc
 * @Author Lee Katz <lskatz@gmail.com>
 * @class 
 * @constructs
 * @extends Bio.Root
 * @desc An interface for Alignment classes.
 * @param {String} args.file A filename
 * @param {String} args.fileText The contents of a file
 */
  initialize: function($super){
    this.options = Object.extend({
      file:false, // TODO accept a filename
      fileText:false // the string contents of a file
    }, arguments[1]|| { });
  },
  /**
   * @func addSeq
   * @desc Add a sequence to the MSA.  Does not align.
   * @returns {string} Seq The freshly added Seq
   * @memberof Bio.Align
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
