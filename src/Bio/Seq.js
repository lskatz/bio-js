Bio.functions.include_once("Bio::Alphabet");
/**
* @lends Bio.Seq
* @interface
* @inheritdoc
*/
Bio.Seq = Class.create(Bio.Root,{ 
/**
 * Bio.Seq
 * @Author Lee Katz <lskatz@gmail.com>
 * @class An interface for Seq objects.
 * @constructs
 * @extends Bio.Root
 * @name Bio.Seq
 * @inheritdoc
 * @param {string} options.seq The dna or protein sequence. Whitespace is stripped.
 * @param {string} options.id       The sequence identifier
 * @param {string} options.desc     The sequence description
 * @param {Bio.Alphabet} options.alphabet An alphabet object
 */
  initialize: function($super,options){

    this.options(options);

    // Additional options
    options.id || this.throw("Argument options.id is mandatory for this class");
    options.seq || this.throw("Argument options.seq is mandatory for this class");
    this.options.desc=options.desc || "";
    this.options.alphabet=options.alphabet || "";
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
