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
// When user adds a url and presses enter, the details are extracted from the
// url gets added to an array

function getArticleUrl(e) {
  if (e.keyCode == 13) {
      // Do something



      storedArticleList.push({
        url: urlInput.value
      });

      saveinStorage();

      console.log(urlInput.value);

  }
}


const urlInput = document.querySelector('.url-field');
urlInput.addEventListener("keydown", getArticleUrl);



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 3. the array is saved into the localstorage

function saveinStorage() {
	localStorage["articleList"] = JSON.stringify(storedArticleList);
  console.log('storedArticleList Updated')
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
