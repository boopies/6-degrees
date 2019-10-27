function getSimilarItems4(newSearch){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults4(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults4(responseJson) {
    currentObj = responseJson;
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
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="fourthresponse${[i+1]}"> 
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
        console.log('App loaded! Waiting for submit!');
        watchForm5();
    });
  }
}


function watchForm4() {
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == 'thirdresponse1' ) {
            let saveThis = currentObj.Similar.Results[0];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#thirdresponse1').val();
            getSimilarItems4(newSearch);
            hideSearch3();
        };
        if(event.srcElement.id == 'thirdresponse2' ) {
            let saveThis = currentObj.Similar.Results[1];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#thirdresponse2').val();
            getSimilarItems4(newSearch);
            hideSearch3();
        };
        if(event.srcElement.id == 'thirdresponse3' ) {
            let saveThis = currentObj.Similar.Results[2];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#thirdresponse3').val();
            getSimilarItems4(newSearch);
            hideSearch3();
        };
        if(event.srcElement.id == 'thirdresponse4' ) {
            let saveThis = currentObj.Similar.Results[3];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#thirdresponse4').val();
            getSimilarItems4(newSearch);
            hideSearch3();
        };
        if(event.srcElement.id == 'thirdresponse5' ) {
            let saveThis = currentObj.Similar.Results[4];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#thirdresponse5').val();
            getSimilarItems4(newSearch);
            hideSearch3();
        };
        if(event.srcElement.id == 'thirdresponse6' ) {
            let saveThis = currentObj.Similar.Results[5];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#thirdresponse6').val();
            getSimilarItems4(newSearch);
            hideSearch3();
        };
      } );
    }

function hideSearch3(){
    $('.after3').addClass('after-hidden')
}