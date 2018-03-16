// project Array
var storedArticleList;


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// The Main Function
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function main() {

	if (loadfromStorage()) {
		displayArticles();
	}
	else {
		storedArticleList = [];
	}
}



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// When user adds a url and presses enter, send the url to the postlight api to
// retrieve details from the url
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function getArticleUrl(e) {
  if (e.keyCode == 13) {
      // Do something
			getArticleDetails();
			console.log('processrequested');
  }
}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// the details are extracted from the url and gets added to the array
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function getArticleDetails() {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("readystatechange", processRequest);
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
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function saveinStorage() {
	localStorage["articleList"] = JSON.stringify(storedArticleList);
  console.log('storedArticleList Updated');
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Load from storage function
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function loadfromStorage() {
	if(!localStorage["articleList"])
	return false;
	// retrive Array
	storedArticleList = JSON.parse(localStorage["articleList"]);
		return true;
}



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 4. Display these urls on the page
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function displayArticles() {

	const listContainer = document.querySelector('.article-list');
	const articleBlockTemplate = listContainer.querySelector('.article-block');

	for(let article of storedArticleList) {
			console.log(article);
			const articleBlock = articleBlockTemplate.cloneNode(true);
			listContainer.prepend(articleBlock);
			const articleLink = articleBlock.querySelector('.article-link');
			const articleAuthor = articleBlock.querySelector('.article-author');
			const articleDomain = articleBlock.querySelector('.article-domain');

			articleLink.innerText = article.title;
			articleAuthor.innerText = 'by ' + article.author + ',';
			articleDomain.innerText = article.domain;

			console.log(listContainer);
	}
}







const urlInput = document.querySelector('.url-field');
urlInput.addEventListener("keydown", getArticleUrl);

main();
