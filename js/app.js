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
// Reveal the search field once user presses the add button
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function revealUrlForm() {

	let inputBlock = document.querySelector('.input-url');
	inputBlock.classList.remove('hidden');

}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Hide the search field once hits escape
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


document.onkeydown = function(evt) {
		let inputBlock = document.querySelector('.input-url');

		evt = evt || window.event;
    if (evt.keyCode == 27) {
			inputBlock.classList.add('hidden');
			console.log('hide the form bro!');
    }
};


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// When user adds a url and presses enter, send the url to the postlight api to
// retrieve details from the url
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function getArticleUrl(e) {



  if (e.keyCode == 13) {

			const inputBlock = document.querySelector('.input-url');
			const inputBlockContainer = inputBlock.querySelector('.container');
			let tempErrorBlock = inputBlock.querySelector('.error-block');
			var pattern = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g); // fragment locater

			if (!pattern.test(urlInput.value)) {

				if (inputBlock.contains(tempErrorBlock))
					return;

				const errorBlock = document.createElement('div');
				errorBlock.classList.add('error-block');
				errorBlock.innerText = 'Something is not quite right with the url!!!';

				inputBlockContainer.appendChild(errorBlock);

				console.log(errorBlock);

			} else {

				if (inputBlock.contains(tempErrorBlock)) {
					tempErrorBlock.remove();
				}

				inputBlock.classList.add('hidden');
				getArticleDetails();
				console.log('Article URL processing');

			}
			urlInput.value = '';
  }



}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// the details are extracted from the url and gets added to the array
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function getArticleDetails() {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", processRequest);
		var url = "https://mercury.postlight.com/parser?url="+encodeURIComponent(urlInput.value);
		xhr.open('GET', url, true);
		xhr.setRequestHeader("x-api-key", "VAxVxFVwzK2q1hlKoPGdtTLpfvVdIz8Y5QwikQ7U");
		xhr.send();

		function processRequest(e) {
			if (xhr.readyState == 4 && xhr.status == 200) {

					var response = JSON.parse(xhr.responseText);
					resolve(response);

					storedArticleList.push(response);
					saveinStorage();
					console.log('Article Details processed and stored');
					displayArticles();
			}
		}

	});
}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 3. the array is saved into the localstorage
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function saveinStorage() {
	localStorage["articleList"] = JSON.stringify(storedArticleList);
  console.log('Article Details stored');
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
	const articleBlockTemplate = listContainer.querySelector('.articleBlk-template');
	listContainer.innerHTML = '';
	for(let article of storedArticleList) {
			// console.log(article);
			const articleBlock = articleBlockTemplate.cloneNode(true);
			articleBlock.classList.add('article-block');
			articleBlock.classList.remove('.articleBlk-template');
			listContainer.prepend(articleBlock);
			const articleLink = articleBlock.querySelector('.article-link');
			const articleAuthor = articleBlock.querySelector('.article-author');
			const articleDomain = articleBlock.querySelector('.article-domain');

			articleLink.innerText = 	article.title;
			// articleAuthor.innerText = 'by ' + article.author + ',';
			articleDomain.innerText = article.domain;
			articleDomain.setAttribute('href', article.url);

			console.log(storedArticleList);

	}
	console.log('Article Displayed');

}

const addUrlBtn = document.querySelector('.add-url');
addUrlBtn.addEventListener("click", revealUrlForm);

const urlInput = document.querySelector('.url-field');
urlInput.addEventListener("keydown", getArticleUrl);

main();
