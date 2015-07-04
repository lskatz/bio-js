/* Faux Console by Chris Heilmann http://wait-till-i.com 
 *
 * modified by Lee Katz
 */
if(!window.console){
    var console={
        init:function(){
            console.d=$(document.createElement('div'));
	          console.d.setStyle({height:'500px',overflow:'auto'});
            document.body.appendChild(console.d);
            var a=document.createElement('a');
            a.href='javascript:console.hide()';
            a.innerHTML='close';
            console.d.appendChild(a);
            var a=document.createElement('a');
            a.href='javascript:console.clear();';
            a.innerHTML='clear';
            console.d.appendChild(a);
            var id='fauxconsole';
            if(!$(id)){
                console.d.id=id;
            }
            console.hide();
        },
        hide:function(){
            console.d.style.display='none';
        },
        show:function(){
            console.d.style.display='block';
        },
        log:function(o){
            console.d.innerHTML+='<br/>'+o;
            console.show();
        },
        clear:function(){
            console.d.parentNode.removeChild(console.d);
            console.init();
            console.show();
        }
    }
    Event.observe(window,'load',function(){
        console.init();
    });
}
