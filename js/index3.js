function getSimilarItems3(newSearch){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults3(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults3(responseJson) {
    currentObj = responseJson;
    if (responseJson.status == 'error'){
        $('.results-three').append(`
        <h2 class="problem">Sorry</h2>
        <div class="search-results">
        <p>${responseJson.message}. Please try again.</p> </div>`)
    } else {
    $('.results-three').append(`
    <h2>3</h2>
    <div class="search-results3"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results3').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after3">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="thirdresponse${[i]}"> 
        Search with this</button>
        <a class="button hidden-after" href="#thirdpopups${[i+1]}">Read a bit</a>
    </div>
        <div id="thirdpopups${[i+1]}" class="overlay">
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
    $('.results-three').removeClass('hidden');
    $(function(){
        watchForm4();
    });
  }
}


function watchForm3() {
    //creates an array from the results buttons
    const arrayTwo = $('.results-two .after2 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayTwo.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arrayTwo[i]}`) {
            let saveThis = currentObj.Similar.Results[i];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $(`#${arrayTwo[i]}`).val();
            getSimilarItems3(newSearch);
            hideSearch2();
      } 
    });
};
}

//Hides the search and read more buttons
function hideSearch2(){
    $('.after2').addClass('after-hidden')
}