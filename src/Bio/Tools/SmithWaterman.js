/**
 * @lends Bio.Tools.SmithWaterman
 */
Bio.Tools.SmithWaterman=Class.create(Bio.Tools,{

 /**
   * @author Lee Katz <lskatz@gmail.com>
   * @class
   * @classdesc Performs alignment using the Smith-Waterman algorithm
   * @inheritdoc
   * @constructs
   * @implements {Bio.Tools}
   * @name Bio.Tools.SmithWaterman
   * @param {Object} query The sequence of the query
   * @param {Object} subject The sequence of the subject
   * @param {Array} options An associative array with options
   * @param {Array[]} [options.sMatrix=[[-1,-1,...],[-1,1,...],...] ] A substitution score matrix where each position in order is: gap, A, C, G, T
   * @param {Bio.Seq} options.query A query sequence object
   * @param {Bio.Seq} options.subject A subject sequence object
   */
  initialize:function($super,options){
    $super(options);
    this.options.sMatrix = options.sMatrix || [
                [-3,-3,-3,-3,-3], // -ACGT (including gap)
                [-3,2,-3,-3,-3],
                [-3,-3,2,-3,-3],
                [-3,-3,-3,2,-3],
                [-3,-3,-3,-3,2]
              ];
    this.options.gapPenalty = options.gapPenalty || -5;
    /** @TODO have a gap extension penalty in addition to gap existence */
    this.options.query = options.query || this.throw("ERROR: need options.query");
    this.options.subject = options.subject || this.throw("ERROR: need options.subject");
    this.options.heuristics = options.heuristics || false;


    // transform subj/query to a string of a number with a prefix gap
    // -:0, A:1, C:2, G:3, T:4
    var query=this._ntToInt("0"+this.options.query.seq()); 
    var subject=this._ntToInt("0"+this.options.subject.seq());
    
    // Add the object properties
    this.queryObj=this.options.query;
    this.subjectObj=this.options.subject;
    this.query=query;
    this.subject=subject;
    this.sMatrix=this.options.sMatrix;
    
    // Add some blank variables for later
    this.swPath=[];
    this.matchStr="";
    this.queryGapped="";
    this.subjectGapped="";
    this.percentIdentity=-1;
    this.alignmentLength=-1;
    this.positives=-1;
    this.formattedMatch="";
  },

  /**
    * @function matchString
    * @desc Figures out the string representation of the match. Also sets certain properties of this object such as percentIdentity and positives.
    * @returns {string} The string representation of the match
    * @memberof Bio.Tools.SmithWaterman
    */
  matchString:function(){
    if(this.swPath.length==0){
      console.log(this.throw("WARNING: need to call SmithWaterman.run() before this.matchString()"));
      return false;
    }

    // Stop this from running more than once if it already has
    if(this.matchStr!=""){
      return this.matchStr;
    }

    
    // Start looking for the match string.
    var matchString="|";
    var queryString=this.swPath[0].query;
    var subjectString=this.swPath[0].subject;
    var matchLength=this.swPath.length;
    var numIdentical=0; // how many identity sites there are 
    if(queryString==subjectString) numIdentical++;
    for(var k=1;k<matchLength;k++){
      var swPathCell=this.swPath[k];
      var i=this.swPath[k].i;
      var j=this.swPath[k].j;
      var previousI=this.swPath[k-1].i;
      var previousJ=this.swPath[k-1].j;

      if(i==previousI+1 && j==previousJ+1){
        if(this.swPath[k].subject == this.swPath[k].query){
          matchString+="|";
          numIdentical++;
          //console.log(k+" "+this.swPath[k].subject+" "+this.swPath[k].query);
        }else{
          matchString+=" ";
        }
        queryString+=this.swPath[k].query;
        subjectString+=this.swPath[k].subject;
      } else if(i==previousI && j==previousJ+1){
        matchString+=" ";
        queryString+="-";
        subjectString+=this.swPath[k].subject;
      } else if(i==previousI+1 && j==previousJ){
        matchString+=" ";
        queryString+=this.swPath[k].query;
        subjectString+="-";
      } else {
        return this.throw("Internal error!");
      }
      
    }
    
    this.matchStr=matchString;
    this.queryGapped=queryString;
    this.subjectGapped=subjectString;
    this.percentIdentity=100*numIdentical/this.swPath.length
    this.positives=numIdentical;
    return matchString;
  },

  /**
    * @function report
    * @desc Formats the match string and other information in a useful report. Internally calls {@link Bio.Tools.SmithWaterman.matchString}.
    * @returns {string} The the report
    * @memberof Bio.Tools.SmithWaterman
    */
  report:function(){
    // Don't recalculate this if it's already set
    if(this.formattedMatch != ""){
      return this.formattedMatch;
    }
    this.matchString(); // Run this to set some variables

    var queryId=this.queryObj.id().substr(0,10);
    var subjectId=this.subjectObj.id().substr(0,10);

    var formattedMatch="";
    //formattedMatch+=this.queryObj.id()+" against "+this.subjectObj.id()+"\n";
    formattedMatch+="Identities: "+this.positives+"/"+this.alignmentLength+"("+Math.round(this.percentIdentity * 100)/100+"%)\n\n";

    var matchArr=this.matchString().match(/.{1,40}/g);
    var queryArr=this.queryGapped.match(/.{1,40}/g);
    var subjectArr=this.subjectGapped.match(/.{1,40}/g);

    //matrix[i]=new Array(subject.length).join('0').split('').map(parseFloat);
    var idPaddingLength=Math.max(queryId.length,subjectId.length);
    var idPadding=new Array(idPaddingLength).join(" ")
    var coordinatePaddingLength=5; // TODO make this more dynamic 
    var coordinatePadding=new Array(coordinatePaddingLength).join(" ");
    //matchArr[0]=idPadding+coordinatePadding+" "+matchArr[0];
    //queryArr[0]=queryId+" "+this.queryStart.toString()+" "+queryArr[0];
    //subjectArr[0]=subjectId+" "+this.subjectStart.toString()+" "+subjectArr[0];

    var queryStart=String(coordinatePadding + this.queryStart.toString()).slice(-1*coordinatePaddingLength);
    var subjectStart=String(coordinatePadding + this.subjectStart.toString()).slice(-1*coordinatePaddingLength);
    for(var i=0;i<matchArr.length;i++){
      formattedMatch+=
                     queryId+" "+queryStart+" "+queryArr[i].match(/.{1,10}/g).join(" ")+"\n"
                    +idPadding+coordinatePadding+"    "+matchArr[i].match(/.{1,10}/g).join(" ")+"\n"
                    +subjectId+" "+subjectStart+" "+subjectArr[i].match(/.{1,10}/g).join(" ")+"\n\n";

      // Update queryStart/subjectStart.
      // Take into account the number of gaps, the strand
      var queryGapCount=(queryArr[i].match(/\-/g)||[]).length;
      var subjectGapCount=(subjectArr[i].match(/\-/g)||[]).length;
      queryStart=String(coordinatePadding + String(parseInt(queryStart)+queryArr[i].length-queryGapCount)).slice(-1*coordinatePaddingLength);
      if(this.strand==1){
        subjectStart=String(coordinatePadding + String(parseInt(subjectStart)+subjectArr[i].length-subjectGapCount)).slice(-1*coordinatePaddingLength);
      }else if(this.strand==-1){
        subjectStart=String(coordinatePadding + String(parseInt(subjectStart)-subjectArr[i].length-subjectGapCount)).slice(-1*coordinatePaddingLength);
      } else {
        this.throw("ERROR: the strand was never identified");
      }
    }
    
    this.formattedMatch=formattedMatch;
    return this.formattedMatch;
  },

  /**
    * @method run
    * @desc Runs Smith-Waterman
    * @returns {Number} The score.
    * @see {@link Bio.Tools.SmithWaterman.matchString} for other object properties you can access.
    * @memberof Bio.Tools.SmithWaterman
    */
  run:function(){

    // default return values
    var matchProperties={
      swPath:undefined,
      alignmentLength:undefined,
      score:undefined,
      matrix:undefined,
      totalScore:undefined,
      queryStart:1,
      subjectStart:1,
      strand:undefined
    }

    // Choose the algorithm and get is match properties
    var thisMatchPropertiesF,thisMatchPropertiesR;
    if(this.options.heuristics === true){
      thisMatchPropertiesF=this._smartSW({query:this.query,subject:this.subject});
      thisMatchPropertiesR=this._smartSW({query:this.query,subject:this.subject.split('').reverse().join('')});
    } else {
      thisMatchPropertiesF=this._SW({query:this.query,subject:this.subject});
      thisMatchPropertiesR=this._SW({query:this.query,subject:this.subject.split('').reverse().join('')});
    }

    // Did the reverse or forward strand have a better match?
    var thisMatchProperties=thisMatchPropertiesF;
    thisMatchProperties.strand=1;
    if(thisMatchPropertiesF.score < thisMatchPropertiesR.score){
      thisMatchProperties=thisMatchPropertiesR;
      thisMatchProperties.strand=-1;
    }

    // Fill up any values that were defined in the matching algorithm
    $H(matchProperties).each(function(pair){
      matchProperties[pair.key]=pair.value;
      this[pair.key]=thisMatchProperties[pair.key] || matchProperties[pair.key];
    }.bind(this));


    return matchProperties;
  },

  /**
    * @method _smartSW
    * @desc Runs Smith-Waterman with heuristics. Sets the properties mentioned in {@link Bio.Tools.SmithWaterman._SW}. Call this method using {@link Bio.Tools.SmithWaterman._SW} with heuristics:true.
    * @returns {Number} The score.
    * @see {@link Bio.Tools.SmithWaterman.matchString} for other object properties you can access.
    * @memberof Bio.Tools.SmithWaterman
    */
  _smartSW:function(options){
    query=options.query || this.query;
    subject=options.subject || this.subject;
    
    // Declare 11-mers in the query and find them in the subject.
    var wordSize=this.options.wordSize || 11;
    var step=this.options.step || 11;
    var kmerMatch=[]; // kmerMatch[queryIndex]=subjectIndex;
    var queryIndex=[];
    var subjectIndex=[];
    for(var i=0;i<this.query.length;i+=step){
      var word=this.query.substr(i,wordSize);
      var index=this.subject.indexOf(word);
      if(index===-1) continue;

      kmerMatch[i]=index;
      queryIndex.push(i);
      subjectIndex.push(index);
    }

    // Create ranges of query/subject for alignment
    var allowedDistanceBetweenKmers=5000;
    var queryRange={};
    var subjectRange={};
    queryRange[queryIndex[0]]=1;
    subjectRange[subjectIndex[0]]=1;
    for(var i=1; i<kmerMatch.length; i++){
      // Don't include this next kmer if it is too far away
      if(queryIndex[i] > queryIndex[i-1] + allowedDistanceBetweenKmers) continue;

      // Make a range for the query
      // include all integers from queryIndex[i-1] to this integer
      $A($R(queryIndex[i-1],queryIndex[i])).each(function(el){
        if(queryRange[el]==1) return;
        queryRange[el]=1;
      });

      // Make a range for the subject too
      $A($R(subjectIndex[i-1],subjectIndex[i])).each(function(el){
        if(subjectRange[el]==1) return;
        subjectRange[el]=1;
      });
    }
    
    // Find the longest contiguous range for the query and subject

    // Range for the query
    var querySeq;
    var queryLength=0;
    // Get an Interator of keys
    var queryRangeInt=$H(queryRange).keys();
    // Get a sorted array of keys. These element values are strings.
    // TODO figure out how to change it to Integers
    queryRangeInt=queryRangeInt.sortBy(function(i){return parseInt(i)});
    var queryStart=queryRangeInt[0];
    var queryEnd=queryRangeInt[0];
    // Turn all elements into integers
    for(var i=0;i<queryRangeInt.length;i++){ queryRangeInt[i]=parseInt(queryRangeInt[i]); }
    // Find subsequential integers
    var queryRangeArr=[];
    for(var i=1;i<queryRangeInt.length;i++){
      if(queryRangeInt[i] == queryRangeInt[i-1] + 1){
        queryEnd++;
      } else {
        queryRangeArr.push({start:queryStart, end:queryEnd});
        queryStart=queryRangeInt[i];
        queryEnd=queryRangeInt[i];
      }
    }
    queryRangeArr.push({start:queryStart, end:queryEnd});

    // Range for the subject
    var subjectSeq;
    var subjectLength=0;
    // Get an Interator of keys
    var subjectRangeInt=$H(subjectRange).keys();
    // Get a sorted array of keys. These element values are strings.
    // TODO figure out how to change it to Integers
    subjectRangeInt=subjectRangeInt.sortBy(function(i){return parseInt(i)});
    var subjectStart=subjectRangeInt[0];
    var subjectEnd=subjectRangeInt[0];
    // Turn all elements into integers
    for(var i=0;i<subjectRangeInt.length;i++){ subjectRangeInt[i]=parseInt(subjectRangeInt[i]); }
    // Find subsequential integers
    var subjectRangeArr=[];
    for(var i=1;i<subjectRangeInt.length;i++){
      if(subjectRangeInt[i] == subjectRangeInt[i-1] + 1){
        subjectEnd++;
      } else {
        subjectRangeArr.push({start:subjectStart, end:subjectEnd});
        subjectStart=subjectRangeInt[i];
        subjectEnd=subjectRangeInt[i];
      }
    }
    subjectRangeArr.push({start:subjectStart, end:subjectEnd});

    // Get subject/query objects
    // TODO choose longest subject/query range
    // TODO get some wiggle room instead of exactly where the kmers matched
    var querySeqStart=queryRangeArr[0]["start"];
    var querySeqEnd=queryRangeArr[0]["end"];
    var subjectSeqStart=subjectRangeArr[0]["start"];
    var subjectSeqEnd=subjectRangeArr[0]["end"];
    var subQuery=query.substr(querySeqStart-1,querySeqEnd-1);
    var subSubject=subject.substr(subjectSeqStart-1,subjectSeqEnd-1);

    var returnObj=this._SW({query:subQuery,subject:subSubject});
    returnObj["queryStart"]=querySeqStart;
    returnObj["queryEnd"]=querySeqEnd;
    returnObj["subjectStart"]=subjectSeqStart;
    returnObj["subjectEnd"]=subjectSeqEnd;
    
    return returnObj;
  },

  /**
    * @method _SW
    * @desc Runs vanilla Smith-Waterman. Sets the following properties: swPath; alignmentLength; score; matrix
    * @returns {Number} The score.
    * @see {@link Bio.Tools.SmithWaterman.matchString} for other object properties you can access.
    * @memberof Bio.Tools.SmithWaterman
    */
  _SW:function(options){
    var query=options.query || this.query;
    var subject=options.subject || this.subject;

    // initialize the smith-waterman matrix to 0
    var matrix=[];
    var lastIndex=subject.length-1;
    for(var i=0;i<query.length;i++){
      // http://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
      matrix[i]=new Array(subject.length).join('0').split('').map(parseFloat);
    }
    
    // Calculate scores in the matrix according to gaps and matches.
    // The first col/row is zero, so no point in starting at zeroth pos.
    var largestInteger=0;  // this will come out to be the largest integer in the matrix
    var maxI=0; var maxJ=0;
    for(var i=1;i<query.length;i++){
      // Get the integer representation of the query nt in both this
      // position and the previous position.
      var queryInt=parseInt(query.substr(i,1));
      var lastQueryInt=parseInt(query.substr(i-1,1));
      for(var j=1;j<subject.length;j++){
        // Get the integer representation of the subject nt in both this
        // position and the previous position.
        var subjectInt=parseInt(subject.substr(j,1));
        var lastSubjectInt=parseInt(subject.substr(j-1,1));
        // N score is the score from above + match score of the previous
        // query nt with the current subject nt, with a gap penalty
        var north=matrix[i-1][j]+ this.sMatrix[lastQueryInt][subjectInt] + this.options.gapPenalty;
        // W score is the score from the left + match score of the previous
        // subject nt with the current query nt, with a gap penalty
        var west=matrix[i][j-1] + this.sMatrix[queryInt][lastSubjectInt] + this.options.gapPenalty;
        // NW score is the score from the top-left + match score of 
        // the current query/subject nt
        var nw=matrix[i-1][j-1] + this.sMatrix[queryInt][subjectInt];
        
        // Find which value is largest, for this cell of the matrix
        var localMax=Math.max(0,north,west,nw);

        // If this is the largest value, mark it.
        if(localMax > largestInteger){
          largestInteger=localMax
          maxI=i
          maxJ=j
        }
        matrix[i][j]=localMax;
      }
    }
    
    // Find the path through the matrix.
    // Start with the highest score and work your way diagonally
    // until the localScore reaches 0.
    // Capture the path, total score, and the match string.
    i=maxI; 
    j=maxJ;
    var localScore=largestInteger;
    var totalScore=localScore;
    var swPath=[]; // will be an array of coordinates + other info
    //var matchString=query.substr(i,1); // first in the match string is a match
    while(localScore > 0){
      // Figure out the path to the next highest score.
      // Choices are: north, west, and NW
      var scores=[]
      scores[0]=0; // prevent any negative numbers from Math.max()
      scores[matrix[i-1][j]]=[i-1,j];
      scores[matrix[i][j-1]]=[i,j-1];
      scores[matrix[i-1][j-1]]=[i-1,j-1];
      
      
      // Add up the points for the score as we go...
      var keys=Object.keys(scores);
      localScore=Math.max.apply(Math, keys);
      totalScore+=localScore;
      
      //swPath.push([i,j,localScore]);
      swPath.push({i:i, j:j, score:localScore, query:this._intToNt(query.substr(i,1)), subject:this._intToNt(subject.substr(j,1))});

      // Keep track of the path
      var nextCell=scores[localScore];
      i=nextCell[0];
      j=nextCell[1];
    }
    
    // Reverse the match string and path to put it in a 'left to right' order
    swPath=swPath.reverse();
    
    var returnObj= {
      swPath:swPath,
      alignmentLength:swPath.length,
      score:totalScore,
      matrix:matrix,
      totalScore:totalScore
    };
    
    return returnObj;
  },
  _intToNt:function(number){
    return number.replace(/0/g,"N").replace(/1/g,"A").replace(/2/g,"C").replace(/3/g,"G").replace(/4/g,"T");
  },
  _ntToInt:function(nt){
    var integer=nt.replace(/[^ACGT]/gi,"0").replace(/A/gi,"1").replace(/C/gi,"2").replace(/G/gi,"3").replace(/T/gi,"4");
    return integer;
  }

});
