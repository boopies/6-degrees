function getSimilarItems2(newSearch, limitResults){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}${limitResults}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults2(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults2(responseJson) {
    if (responseJson.Similar.Results.length === 0){
        $('.results-two').append(`
        <h2 class="problem">Oh No!</h2>
        <div class="search-results">
        <p>There no results for this. Please check your spelling and try again.</p> 
        <button class="submit" id="reset-button">Search Again</button></div>`);
        $('.submit-form').addClass('hidden')
        watchReset();
    } else {
    $('.results-two').append(`
    <h2>Second Degree of Similarity</h2>
    <div class="search-results2"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results2').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after2">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="seondresponse${[i]}"> 
        Search with this</button>
        <a class="button hidden-after" href="#secondpopups${[i+1]}">Read a bit</a>
    </div>
        <div id="secondpopups${[i+1]}" class="overlay">
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
    $('.results-two').removeClass('hidden');
    $(function(){
        watchForm3(responseJson);
    });
  }
}


function watchForm2(responseJson) {
    //creates an array from the results buttons
    const arrayOne = $('.results-one .after1 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayOne.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arrayOne[i]}`) {
            let saveThis = responseJson.Similar.Results[i];
            saveChoice(saveThis);
            const newSearch = $(`#${arrayOne[i]}`).val();
            getSimilarItems2(newSearch, limitResults);
            hideSearch1();
      } 
      
    });
};
}

//Hides the search and read more buttons
function hideSearch1(){
    $('.after1').addClass('after-hidden')
}