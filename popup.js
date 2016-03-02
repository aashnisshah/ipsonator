var settings = [
	{
		api: 'http://hipsterjesus.com/api/?paras=10&html=false',
		name: "Hipster Jesus",
		url: "http://hipsterjesus.com/",
		type: "get",
		process: 'extract',
		processExtract: 'text'
	},
	{
		api: 'http://www.randomtext.me/api/lorem/p-10/',
		name: "Random Text",
		url: "http://www.randomtext.me/",
		type: "get",
		process: 'extract',
		processExtract: 'text_out'
	},
	{
		api: 'https://baconipsum.com/api/?type=all-meat&paras=10&start-with-lorem=1',
		name: "Bacon Ipsum",
		url: 'http://baconipsum.com/',
		type: 'json',
		process: 'concatall'
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
			ipsumText.innerText = processIpsum(ipsum);
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

	// copy ipsum text easily:

	var textareaButton = document.querySelector('.js-textareacutbtn');

	textareaButton.addEventListener('click', function(event) {  
	  var textToCopy = document.getElementById('ipsum-text');  
	  textToCopy.select();
	  document.execCommand('copy');  
	});
}

function processIpsum(ipsum) {
	var newipsum = '';
	if(settings[0].process == 'concatall') {
		newipsum = ipsum.join(" ");
		return newipsum;
	}

	if(settings[0].process == 'extract') {
		newipsum = ipsum[settings[0].processExtract];
		var newNoStartP = newipsum.replace(/<p>/g, "");
		var newNoP = newNoStartP.replace(/<\/p>/g, "");
		return newNoP;
	}
}

/* this eventListener allows us to create a new tab when we click on 
 * a link in a chrome extension 
 */
window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})
