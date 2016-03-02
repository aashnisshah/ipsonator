var settings = [
	{
		api: 'https://baconipsum.com/api/?type=all-meat&paras=10&start-with-lorem=1',
		name: "Bacon Ipsum",
		url: 'http://baconipsum.com/',
		type: 'get'
	}
]

document.addEventListener('DOMContentLoaded', function() {
	// select which ipsum text type to use

	// get text then display it
	var ipsum = GET(settings[0].api);
});

/* this function performs get calls
*/
function GET(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();
	xhr.onload = function() {
	    var json = xhr.responseText;                         // Response
	    json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
	    json = JSON.parse(json);                             // Parse JSON
	    
		console.log(json);
		display(json);
	};
}

/* this function will display the trend information onto the
 * html page
 */
function display(ipsum) {
	if(ipsum) {
		if(ipsum) {
			var ipsumText = document.getElementById('ipsum-text');
			ipsumText.innerText = concatipsum(ipsum);
		} else {
			var ipsumText = document.getElementById('ipsum-text');
			ipsumText.innerText = 'Problems Generating Ipsum Text';
		}

		var ipsumLink = document.getElementById('ipsum-link');
		ipsumLink.innerHTML = settings[0].name;
		ipsumLink.href = settings[0].url;
	} else {
		var ipsumText = document.getElementById('ipsum-text');
		ipsumText.innerText = 'Error';
	}
}

function concatipsum(ipsum) {
	var newipsum = ipsum.join(" ");
	return newipsum;
}

/* this eventListener allows us to create a new tab when we click on 
 * a link in a chrome extension 
 */
window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})
