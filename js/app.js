// project Array
var storedArticleList;



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// The Main Function

function main() {

	if (loadfromStorage()) {
		// displayProjectList();
	}
	else {
		storedArticleList = [];
	}
}



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// When user adds a url and presses enter, send the url to the postlight api to
// retrieve details from the url

function getArticleUrl(e) {
  if (e.keyCode == 13) {
      // Do something
			getArticleDetails();
			console.log('processrequested');
  }
}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// the details are extracted from the url and gets added to the array

function getArticleDetails() {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("readystatechange", processRequest);
	// var url = "https://mercury.postlight.com/parser?url="+encodeURIComponent("https://trackchanges.postlight.com/building-awesome-cms-f034344d8ed");
	var url = "https://mercury.postlight.com/parser?url="+encodeURIComponent(urlInput.value);
	xhr.open('GET', url, true);
	xhr.setRequestHeader("x-api-key", "VAxVxFVwzK2q1hlKoPGdtTLpfvVdIz8Y5QwikQ7U");
	xhr.send();

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
				// time to partay!!!
				var response = JSON.parse(xhr.responseText);
				console.log(response);
				// console.log(response.title);

				storedArticleList.push(response);
				saveinStorage();
		}
	}
}



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 3. the array is saved into the localstorage

function saveinStorage() {
	localStorage["articleList"] = JSON.stringify(storedArticleList);
  console.log('storedArticleList Updated');
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Load from storage function

function loadfromStorage() {
	if(!localStorage["articleList"])
	return false;
	// retrive Array
	storedArticleList = JSON.parse(localStorage["articleList"]);
		return true;
}




// 4. Display these urls on the page




const urlInput = document.querySelector('.url-field');
urlInput.addEventListener("keydown", getArticleUrl);

main();


//
//
// async function main() {
//     var urls = ["https://trackchanges.postlight.com/building-awesome-cms-f034344d8ed", "https://medium.com/s/story/the-tech-industrys-psychological-war-on-kids-c452870464ce", "https://uxplanet.org/how-combining-schemas-and-color-psychology-will-improve-ux-13cfc70be16f", "https://www.wired.com/story/theranos-and-silicon-valleys-fake-it-till-you-make-it-culture/"];
//     for(let url of urls) {
//         var res = await postlight(url);
//         console.log(res);
//     }
//
// }
//
