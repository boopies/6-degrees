function getSimilarItems6(newSearch, limitResults){
    fetch (`https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}${limitResults}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults6(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults6(responseJson) {
    if (responseJson.Similar.Results.length === 0){
        $('.results-six').append(`
        <h2 class="problem">Oh No!</h2>
        <div class="search-results">
        <p>There no results for this. Your Journey is cut short. Please try a new search.</p> 
        <button class="submit" id="reset-button">Search Again</button></div>`);
        $('.submit-form').addClass('hidden')
        watchReset();
    } else {
    $('.results-six').append(`
    <h2>Sixth Degree of Similarity</h2>
    <div class="search-results6"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results6').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after6">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="sixthresponse${[i]}"> 
        End</button>
        <a class="button hidden-after" href="#sixthpopups${[i+1]}">Read a bit</a>
    </div>
        <div id="sixthpopups${[i+1]}" class="overlay">
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
    $('.results-six').removeClass('hidden');
    $(function(){
        watchForm7(responseJson);
    });
  }
}


function watchForm6(responseJson) {    
    //creates an array from the results buttons
    const arrayFive = $('.results-five .after5 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayFive.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arrayFive[i]}`) {
            let saveThis = responseJson.Similar.Results[i];
            saveChoice(saveThis);
            const newSearch = $(`#${arrayFive[i]}`).val();
            getSimilarItems6(newSearch, limitResults);
            hideSearch5();
      } 
    });
};
}


function hideSearch5(){
    $('.after5').addClass('after-hidden')
}