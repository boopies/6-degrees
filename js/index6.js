function getSimilarItems6(newSearch){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults6(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults6(responseJson) {
    currentObj = responseJson;
    if (responseJson.status == 'error'){
        $('.results-six').append(`
        <h2 class="problem">Bow No!</h2>
        <div class="search-results">
        <p>${responseJson.message}. Please try again.</p> </div>`)
    } else {
    $('.results-six').append(`
    <h2>6</h2>
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
        watchForm7();
    });
  }
}


function watchForm6() {    
    //creates an array from the results buttons
    const arrayFive = $('.results-five .after5 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayFive.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arrayFive[i]}`) {
            let saveThis = currentObj.Similar.Results[i];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $(`#${arrayFive[i]}`).val();
            getSimilarItems6(newSearch);
            hideSearch5();
      } 
    });
};
}


function hideSearch5(){
    $('.after5').addClass('after-hidden')
}