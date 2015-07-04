/*
// not necessary: these should be loaded by the user; not the library.  Or, it should be somehow integrated
["Bio::Tools","sms2::scripts::align_pair_linear",
  "sms2::scripts::align_pair_quad","sms2::scripts::pairwise_align_dna",
  "sms2::scripts::pairwise_align_protein"].each(function(m){
     var included=Bio.functions.include_once(m);
     if(!included) console.log("Warning: Cannot load "+m+": Cannot perform alignments");
  }
);
*/

/**
 * @lends Bio.Tools.Align
 * Uses the SMS2 project alignment tools that were
 * written by Paul Stothard, University of Alberta, Canada
 *
 * This class performs alignments in linear space, by recursively dividing
 * the alignment. Once subalignments of acceptable size are obtained, they
 * are solved using the quadratic space implementation
 */
Bio.Tools.Align=Class.create(Bio.Tools,{ 
  /**
   * Bio.Tools
   * @Author Lee Katz <lskatz@gmail.com>
   * @class A class to align sequences
   * @constructs
   * @extends Bio.Tools
   * @TODO put warnings on large sequences
   * @TODO allow for more than 2 sequences
   * @TODO different options for protein vs dna
   */
  initialize:function($super,el,args){
    $super(args);
    this.options = Object.extend({
      mismatchScore:1,
      matchScore:2,
      gapPenalty:2,
      beginGapPenalty:0,
      endGapPenalty:0,
      html:false        // containing element has HTML?
    }, this.options);
    
    el=$(el) || this.throw("Could not get the element "+el);
    
    seqin=new Bio.SeqIO.fasta(fastaSequenceInput,{
      mode:"r",
      html:this.options.html
    });
    
    if(seqin.seq.length < 2){
      this.throw("Two sequences were not given");
    }
    else if(seqin.seq.length>2){
      this.log("Warning: Only the first two sequences will be used");
    }
    this.seqin=seqin;
    this.seq=this.seqin.seq;
  },
  
  /**
   * Requires SMS2 toolkit
   * @TODO port over the entire algorithm
   * @TODO make an Align object
   */
  align:function(){
    // SMS2 methods
    // TODO port this over
    this.matrix=new Identity();
    this.matrix.setMatch(this.options.matchScore);
    this.matrix.setMismatch(this.options.mismatchScore);
    this.scoreSet=new ScoreSet();
    this.scoreSet.setScoreSetParam(
      this.matrix,this.options.gapPenalty,
      this.options.beginGapPenalty,
      this.options.endGapPenalty
    );
    this.tool = new AlignPairLinear();
    this.tool.setAlignParam(
      this.seq[0].seq(),
      this.seq[1].seq(),
      this.scoreSet
    );
    
    this.tool.align();
    this.alignmentScore=this.tool.score;
    
    // make an array of Seq objects
    this.seq[0]=Object.clone(this.seq[0]);
    this.seq[0].seq(this.tool.getAlignedM());
    this.seq[1]=Object.clone(this.seq[1]);
    this.seq[1].seq(this.tool.getAlignedN());
    this.seq.length=2;
    
    // if there is an output, write the sequences to an output
    if(this.options.out){
      var out=new Bio.SeqIO.fasta(this.options.out,{
        html:this.options.html,
        mode:"w"
      });
      for(var i=0;i<this.seq.length;i++){
        out.write_seq(this.seq[i]);
      }
    }
    
    // TODO return an Align object instead
    return this.seq;
  }
});
