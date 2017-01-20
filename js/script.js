// JavaScript Document
$(function() {

		  // chrome fix.
		  document.onselectstart = function () { return false; };

		  // defaults
		  jsPlumb.draggable($(".window"));
	//	  jsPlumb.DefaultDragOptions = { cursor: 'pointer', zIndex:2000, };
		  jsPlumb.Defaults.Anchors = ["RightMiddle", "LeftMiddle"];
          jsPlumb.Defaults.Connector = "Straight";
		  jsPlumb.Defaults.PaintStyle ={lineWidth:3,strokeStyle:'#0FF'};
		  jsPlumb.Defaults.endpointStyle={radius:1};
		  
//allows button to change color when pressed to active state		  
$(".window").click(function() {$(this).toggleClass( "active")})
		  
		  
		  var c =new Array(); // state of the connection for each course
		  c[800]=false; c[700]=false; c[632]=false; c[604]=false; c[635]=false; c[637]=false; c[639]=false; // initialize all connections

		  $('#ele800').click(function() {

		    if (c[800] == false) {
              var connection8000 = jsPlumb.connect({ source:'ele800', target:'ele700'});
            c[800]=true;
		  }//if
		  else{
          jsPlumb.removeAllEndpoints("ele800");
		  jsPlumb.removeAllEndpoints("ele700");

		  c[800]=false;
		  }

		  });// ele800

		  $('#ele700').click(function() {
		  if (c[700] == false) {
          var connection7001 = jsPlumb.connect({source:'ele700', target:'ele635' });
          var connection7002 = jsPlumb.connect({source:'ele700', target:'ele639' });
          var connection7003 = jsPlumb.connect({source:'ele700', target:'ele637' });
          var connection7004 = jsPlumb.connect({source:'ele700', target:'ele632' });
          var connection7005 = jsPlumb.connect({source:'ele700', target:'ele604' });
          c[700]=true;

		  }else{
          jsPlumb.removeAllEndpoints("ele700");
		  jsPlumb.removeAllEndpoints("ele635");
          jsPlumb.removeAllEndpoints("ele639");
          jsPlumb.removeAllEndpoints("ele637");
          jsPlumb.removeAllEndpoints("ele632");
          jsPlumb.removeAllEndpoints("ele604");

		  c[700]=false;

		  }

		  });// ele700

		  $('#ele632').click(function() {

		    if (c[632] == false) {
              var connection6320 = jsPlumb.connect({ source:'ele632', target:'ele532'});
            c[632]=true;
		  }//if
		  else{

          jsPlumb.removeAllEndpoints("ele632");
		  jsPlumb.removeAllEndpoints("ele532");

		  c[632]=false;
		  }

		  });// ele632

		  $('#ele639').click(function() {

		    if (c[639] == false) {
              var connection6390 = jsPlumb.connect({ source:'ele639', target:'ele532'});
            c[639]=true;
		  }//if
		  else{

          jsPlumb.removeAllEndpoints("ele639");
		  jsPlumb.removeAllEndpoints("ele532");

		  c[639]=false;
		  }

		  });// ele639


		  $('#ele635').click(function() {
		    if (c[635] == false) {
  		    var connection6350 = jsPlumb.connect({ source:'ele635', target:'ele532' });
		    var connection6351 = jsPlumb.connect({ source:'ele635', target:'mth514' });
		  c[635]=true;
		  }else{
            jsPlumb.removeAllEndpoints("ele635");
		    jsPlumb.removeAllEndpoints("ele532");
            jsPlumb.removeAllEndpoints("mth514");
		    c[635]=false;
		  }

		  });// click ele635

		  $('#ele637').click(function() {
		    if (c[637] == false) {
  		    var connection6370 = jsPlumb.connect({ source:'ele637', target:'ele531' });
		    var connection6371 = jsPlumb.connect({ source:'ele637', target:'ele302' });
		  c[637]=true;
		  }else{
            jsPlumb.removeAllEndpoints("ele637");
		    jsPlumb.removeAllEndpoints("ele531");
            jsPlumb.removeAllEndpoints("ele302");
		    c[637]=false;
		  }

		  });// click ele637
		  
		  $('#ele604').click(function() {

		    if (c[604] == false) {
              var connection6040 = jsPlumb.connect({ source:'ele604', target:'ele504'});
            c[604]=true;
		  }//if
		  else{

          jsPlumb.removeAllEndpoints("ele604");
		  jsPlumb.removeAllEndpoints("ele504");

		  c[604]=false;
		  }

		  });// ele604

		  }); // $function




