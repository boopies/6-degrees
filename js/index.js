let LimitResults;
let returnResults = 6;

//Fetch JSON from API
function getSimilarItems(inputFirstItem, limitResults, limitSearch, returnResults){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${limitSearch}${inputFirstItem}${limitResults}&limit=${returnResults}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('We are having some issues.'));
}

//Display search results on the DOM. Saves the original Input to be used later.
function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.Similar.Results.length === 0){
        $('.results-one').append(`
        <h2 class="problem">Oh No!</h2>
        <div class="search-results">
        <p>There no results for this. Please check your spelling and try again or try a new search.</p> 
        <button class="submit" id="reset-button">Search Again</button></div>`);
        $('.submit-form').addClass('hidden')
        watchReset();
    } else {
    $('.results-one').append(`
    <h2>First Degree of Similarity</h2>
    <div class="search-results1"> </div>`);
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results1').append(`<div class="results-box${i+1}"><p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after1">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="firstresponse${[i]}"> 
        Search with this</button>
        <a class="button hidden-after" href="#firstpopups${[i+1]}">Read a bit</a>
    </div>
    <div id="firstpopups${i+1}" class="overlay">
	<div class="popup-result ${i+1}">
		<h2>${responseJson.Similar.Results[i].Name}</h2>
		<a class="close" href="#">&times;</a>
		<div class="content">
         ${responseJson.Similar.Results[i].wTeaser}
         <a href='${responseJson.Similar.Results[i].wUrl}' target="blank">Read More Here</a>
		            </div>
	            </div>
            </div>
        </div>`);

        };
    };
    $('.results-one').removeClass('hidden');
    $('.navigation').removeClass('hidden');
    $(function(){
        console.log('App loaded! Waiting for submit!');
        saveInput(responseJson);
        watchForm2(responseJson);
    });
}

//Form to input selection
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const inputFirstItem = $('#js-search-term').val();
      const limitSearch = $('#search-specific option:selected').val();
      const alimitResults = $('#specific-result option:selected').val();
      const maxResults = $('#js-max-results').val();
      returnResults = maxResults;
      limitResults = alimitResults;
      $('#all-buttons').addClass('hidden');
      $('.similar-button-hide').addClass('hidden');
      firstSearch = $('#js-search-term').val();
      getSimilarItems(inputFirstItem, limitResults, limitSearch, maxResults);
    });
}

//reveals the extra search items
function revealLimitSearch(){
    $('.limit-search').click(event =>{
        event.preventDefault();
            var x = document.getElementById('search-sepecific');
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          });
}

$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm();
    revealLimitSearch();
});