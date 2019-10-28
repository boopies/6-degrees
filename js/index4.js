function getSimilarItems4(newSearch){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults4(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults4(responseJson) {
    if (responseJson.status == 'error'){
        $('.results-four').append(`
        <h2 class="problem">Bow No!</h2>
        <div class="search-results">
        <p>${responseJson.message}. Please try again.</p> </div>`)
    } else {
    $('.results-four').append(`
    <h2>4</h2>
    <div class="search-results4"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results4').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after4">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="fourthresponse${[i]}"> 
        Search with this</button>
        <a class="button hidden-after" href="#fourthpopups${[i+1]}">Read a bit</a>
    </div>
        <div id="fourthpopups${[i+1]}" class="overlay">
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
    $('.results-four').removeClass('hidden');
    $(function(){
        watchForm5(responseJson);
    });
  }
}


function watchForm4(responseJson) {
    //creates an array from the results buttons
    const arrayThree = $('.results-three .after3 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayThree.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arrayThree[i]}`) {
            let saveThis = responseJson.Similar.Results[i];
            saveChoice(saveThis);
            const newSearch = $(`#${arrayThree[i]}`).val();
            getSimilarItems4(newSearch);
            hideSearch3();
      } 
    });
};
}

function hideSearch3(){
    $('.after3').addClass('after-hidden')
}