rm -r doc
jsdoc \
  src/Bio.js \
  src/Bio/*.js \
  src/Bio/SeqIO/*.js \
  src/Bio/Seq/*.js \
  src/Bio/IO/*.js \
  src/Bio/Tools/*.js \
  -t /opt/jsdoc-3.3.2/templates/default -d doc --pedantic 

# done

