//Fetch JSON from API
function getSimilarItems5(newSearch, limitResults, returnResults){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}${limitResults}&limit=${returnResults}`)
    .then(response => response.json())
    .then(responseJson => displayResults5(responseJson))
    .catch(error => alert('We are having some issues.'));
}

//Hides the previous search results and displays new search Results to DOM
function displayResults5(responseJson) {
    if (responseJson.Similar.Results.length === 0){
        $('.results-five').append(`
        <h2 class="problem">Oh No!</h2>
        <div class="search-results">
        <p>There no results for this. Your Journey is cut short. Please try a new search.</p> 
        <button class="submit" id="reset-button">Search Again</button></div>`);
        $('.submit-form').addClass('hidden')
        watchReset();
    } else {
    $('.results-five').append(`
    <h2>Fifth Degree of Similarity</h2>
    <div class="search-results5"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results5').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after5">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="fifthresponse${[i]}"> 
        Search with this</button>
        <a class="button hidden-after" href="#fifthpopups${[i+1]}">Read a bit</a>
    </div>
        <div id="fifthpopups${[i+1]}" class="overlay">
	<div class="popup-result ${[i+1]}">
		<h2>${responseJson.Similar.Results[i].Name}</h2>
		<a class="close" href="#">&times;</a>
		<div class="content">
         ${responseJson.Similar.Results[i].wTeaser}
         <a href='${responseJson.Similar.Results[i].wUrl}' target="blank">Read More Here</a>
		</div>
	</div>
</div>`)};
    //display the results section
    $('.results-four').addClass('hidden');
    $('.results-five').removeClass('hidden');
    $(function(){
        watchForm6(responseJson);
    });
  }
}

//Selects the new Search Item, Saves the New Search Item to be used later
function watchForm5(responseJson) {
    //creates an array from the results buttons
    const arrayFour = $('.results-four .after4 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayFour.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arrayFour[i]}`) {
            let saveThis = responseJson.Similar.Results[i];
            saveChoice(saveThis);
            const newSearch = $(`#${arrayFour[i]}`).val();
            getSimilarItems5(newSearch, limitResults, returnResults);
            hideSearch4();
      } 
    });
};
}

//Hides the search and read more buttons
function hideSearch4(){
    $('.after4').addClass('after-hidden')
}