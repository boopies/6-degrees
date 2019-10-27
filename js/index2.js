function getSimilarItems2(newSearch){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults2(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults2(responseJson) {
    currentObj = responseJson;
    if (responseJson.status == 'error'){
        $('.results-two').append(`
        <h2 class="problem">Bow No!</h2>
        <div class="search-results">
        <p>${responseJson.message}. Please try again.</p> </div>`)
    } else {
    $('.results-two').append(`
    <h2>2</h2>
    <div class="search-results2"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results2').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after2">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="seondresponse${[i+1]}"> 
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
        console.log('App loaded! Waiting for submit!');
        watchForm3();
    });
  }
}


function watchForm2() {
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == 'firstresponse1' ) {
            let saveThis = currentObj.Similar.Results[0];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#firstresponse1').val();
            getSimilarItems2(newSearch);
            hideSearch1();
        };
        if(event.srcElement.id == 'firstresponse2' ) {
            let saveThis = currentObj.Similar.Results[1];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#firstresponse2').val();
            getSimilarItems2(newSearch);
            hideSearch1();
        };
        if(event.srcElement.id == 'firstresponse3' ) {
            let saveThis = currentObj.Similar.Results[2];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#firstresponse3').val();
            getSimilarItems2(newSearch);
            hideSearch1();
        };
        if(event.srcElement.id == 'firstresponse4' ) {
            let saveThis = currentObj.Similar.Results[3];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#firstresponse4').val();
            getSimilarItems2(newSearch);
            hideSearch1();
        };
        if(event.srcElement.id == 'firstresponse5' ) {
            let saveThis = currentObj.Similar.Results[4];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#firstresponse5').val();
            getSimilarItems2(newSearch);
            hideSearch1();
        };
        if(event.srcElement.id == 'firstresponse6' ) {
            let saveThis = currentObj.Similar.Results[5];
            saveChoice(saveThis);
            currentObj = {};
            const newSearch = $('#firstresponse6').val();
            getSimilarItems2(newSearch);
            hideSearch1();
        };
      } );
    }

function hideSearch1(){
    $('.after1').addClass('after-hidden')
}