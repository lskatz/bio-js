var prototypeVersionNeeded=1.7;
var prototypeError="Prototype "+prototypeVersionNeeded+" has not been loaded!";
try{
  Prototype;
  if(Prototype.Version<prototypeVersionNeeded){
    throw("The version of Prototype ("+Prototype.Version+") is less than the required version, "+prototypeVersionNeeded);
  }
} catch (e) {
  throw("Error: "+prototypeError+"\nAdditionally,\n"+e);
}


// start loading BioJS
if (Object.isUndefined(Bio)) { 
  /**
   * BioJS
   * @requires PrototypeJS 1.7
   * @version 0.2
   * @author Lee Katz <lskatz@gmail.com>
   * @class The BioJS object
   */
  var Bio = { }; 

	/**
	 * Values to be used across the board will be stored here
	 */
	Bio.global={};
	
	/**
	 * Bio.global.included stores included files
	 */
	Bio.global.included=[];

	scripts = $$("script");
  /**
   * The directory of BioJS (current directory of JS)
   * @see <http://stackoverflow.com/questions/2255689/how-to-get-the-file-path-of-the-currenctly-executing-javascript-code>
   * @field
   * @type String
   */
	Bio.global.path=scripts[scripts.length-1].src;
	Bio.global.path=Bio.global.path.replace(/\/Bio.js$/,"");
	
	/**
	 * Stores all globally used functions for BioJS
	 * @field
	 */
	Bio.functions={};
  /**
   * Include a file if it has not already been included.
   * In the style of Perl modules
   * Uses Bio.global.included
   * @function
   * @returns boolean True on success or if it has already been included; false or if it didn't work
   */
  Bio.functions.include_once=function(module){
    // see if it has been included yet
    for(var i=0;i<Bio.global.included.length;i++){
      if(Bio.global.included[i]==module){
        return true;
      }
    }
    // find the file
    var path=module.split('::');
    var classFilename=path.pop();
    var dir=path.join('/');
    path=Bio.global.path+'/'+dir+'/'+classFilename+'.js';

    // include it
    document.write('<script type="text/javascript" src="'
      + path + '"></scr' + 'ipt>'); 

    // mark it as included
    Bio.global.included.push(module);
    return true;
  };
	
	// include a few classes
	Bio.functions.include_once("Bio::Root"); // every class inherits from Root
	Bio.functions.include_once("Bio::SeqIO");
	Bio.functions.include_once("Bio::IO");
	Bio.functions.include_once("Bio::Tools");
  
  // make a Root variable for convenience
  //Root=new Bio.Root();
}
else {
  throw("Warning: BioJS was has already been loaded, or the Bio variable has already been defined as something else.");
}
