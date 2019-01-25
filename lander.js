/**
* Lander.js - Remotely acccess script to create landing page on the fly!
* Marketing In Color, Inc
* 
* The first step is to get the values passed from the remote script embed
* and set those as usable variables for the rest of the script.
*/
var scripts = document.getElementsByTagName('script');
var getScript = scripts[ scripts.length - 1 ];
var queryString = getScript.src.replace(/^[^\?]+\??/,'');
var getparams = parseQuery( queryString );
function parseQuery ( query ) {
   var Params = new Object ();
   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}
var lander_id = getparams['id'];
var lander_ss = getparams['ss'];

var new_title;
var new_content;

/**
* For the second step we use Javascript to access the WordPress content on 
* the Landing Page Site.
*/

/*const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://dev.marketingincolor.com/lander/wp-json/wp/v2/pages?slug=demo-page'); // by default async 
xhr.responseType = 'json'; // in which format you expect the response to be
xhr.onload = function() {
  if(this.status == 200) {// onload called even on 404 etc so check the status
    //console.log(this.response); // No need for JSON.parse()
    var page_array = this.response;
    console.log(page_array);
    new_title = page_array["0"].title.rendered;
    new_content = page_array["0"].content.rendered;
    //alert(new_title);
  }
};
xhr.onerror = function() {
  // error 
};
xhr.send();
*/

var request = new XMLHttpRequest();
request.open('GET', 'http://dev.marketingincolor.com/lander/wp-json/wp/v2/pages?slug=demo-page', true);
request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		// Success!
		var data = JSON.parse(request.responseText);
		console.log(data);
		new_title = data["0"].title.rendered;
		new_content = data["0"].content.rendered;

		/**
		* Third we built the variable sets to define html sections
		*/
		var open_html = '<html><head>';
		var lander_head = '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Landing Tester Template</title>';
		var lander_includes = '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">';
		var ss_ident = '<!-- SS Comment:' + lander_ss + ' - this is the code for SharpSpring --> ';
		var close_head_open_body = '</head><body>';
		var wp_content = '<div class="container">' + new_title + ' ** ' + new_content + '</div>';
		var lander_body = '<div class="container"><h1>This is Demo Lander Content!</h1><p>This is for lander_id:' + lander_id + '</p><p>And for lander_ss:' + lander_ss + '</p></div>';
		var lander_foot = '<div class="container"><p>This is Lander Foot</p></div>';

		var close_body_close_html = '</body></html>';
		/**
		* Lander functions to create html sections
		*/
		function landerOutput() {
			document.open();
			document.write( open_html, lander_head, lander_includes, ss_ident, close_head_open_body, wp_content, lander_body, lander_foot, close_body_close_html);
			document.close();
		}
		landerOutput();

		
	} else {
		// We reached our target server, but it returned an error
	}
};
request.onerror = function() {
	// There was a connection error of some sort
};
request.send();


/**
* Third we built the variable sets to define html sections
*/
/*var open_html = '<html><head>';
var lander_head = '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Landing Tester Template</title>';
var lander_includes = '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">';
var ss_ident = '<!-- SS Comment:' + lander_ss + ' - this is the code for SharpSpring --> ';
var close_head_open_body = '</head><body>';
var wp_content = '<div class="container">' + new_title + ' ** ' + new_content + '</div>';
var lander_body = '<div class="container"><h1>This is Demo Lander Content!</h1><p>This is for lander_id:' + lander_id + '</p><p>And for lander_ss:' + lander_ss + '</p></div>';
var lander_foot = '<div class="container"><p>This is Lander Foot</p></div>';

var close_body_close_html = '</body></html>';*/
/**
* Lander functions to create html sections
*/
/*function landerOutput() {
	document.open();
	document.write( open_html, lander_head, lander_includes, ss_ident, close_head_open_body, wp_content, lander_body, lander_foot, close_body_close_html);
	document.close();
}
landerOutput();*/
