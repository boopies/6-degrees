function getSimilarItems5(newSearch){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults5(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults5(responseJson) {
    currentObj = responseJson;
    if (responseJson.status == 'error'){
        $('.results-five').append(`
        <h2 class="problem">Bow No!</h2>
        <div class="search-results">
        <p>${responseJson.message}. Please try again.</p> </div>`)
    } else {
    $('.results-five').append(`
    <h2>5</h2>
    <div class="search-results5"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results5').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after5">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="fifthresponse${[i+1]}"> 
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
    $('.results-five').removeClass('hidden');
    $(function(){
        console.log('App loaded! Waiting for submit!');
        watchForm6();
    });
  }
}


function watchForm5() {
    document.body.addEventListener( 'click', function(event) {
        if(event.srcElement.id == 'fourthresponse1' ) {
            let saveThis = currentObj.Similar.Results[0];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#fourthresponse1').val();
            getSimilarItems5(newSearch);
            hideSearch4();
        };
        if(event.srcElement.id == 'fourthresponse2' ) {
            let saveThis = currentObj.Similar.Results[1];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#fourthresponse2').val();
            getSimilarItems5(newSearch);
            hideSearch4();
        };
        if(event.srcElement.id == 'fourthresponse3' ) {
            let saveThis = currentObj.Similar.Results[2];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#fourthresponse3').val();
            getSimilarItems5(newSearch);
            hideSearch4();
        };
        if(event.srcElement.id == 'fourthresponse4' ) {
            let saveThis = currentObj.Similar.Results[3];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#fourthresponse4').val();
            getSimilarItems5(newSearch);
            hideSearch4();
        };
        if(event.srcElement.id == 'fourthresponse5' ) {
            let saveThis = currentObj.Similar.Results[4];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#fourthresponse5').val();
            getSimilarItems5(newSearch);
            hideSearch4();
        };
        if(event.srcElement.id == 'fourthresponse6' ) {
            let saveThis = currentObj.Similar.Results[5];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#fourthresponse6').val();
            getSimilarItems5(newSearch);
            hideSearch4();
        };
      } );
    }

function hideSearch4(){
    $('.after4').addClass('after-hidden')
}