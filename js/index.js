//random all breeds
function getSimilarItems(inputFirstItem){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${inputFirstItem}&limit=6`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('We are having some issues.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.status == 'error'){
        $('.results-one').append(`
        <h2 class="problem">Bow No!</h2>
        <div class="search-results">
        <p>${responseJson.message}. Please try again.</p> </div>`)
    } else {
    $('.results-one').append(`
    <h2>1</h2>
    <div class="search-results1"> </div>`)
    for (let i = 0; i < responseJson.Similar.Results.length; i++){
        $('.search-results1').append(`<p>${i+1}</p>
    <p>${responseJson.Similar.Results[i].Name}</p>
    <p>${responseJson.Similar.Results[i].Type}</p>
    <div class="after1">
        <button type="submit" class="after" value="${responseJson.Similar.Results[i].Name}" id="firstresponse${[i]}"> 
        Search with this</button>
        <a class="button hidden-after" href="#firstpopups${[i+1]}">Read a bit</a>
    </div>
    <div id="firstpopups${[i+1]}" class="overlay">
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
    $('.results-one').removeClass('hidden');
    $(function(){
        console.log('App loaded! Waiting for submit!');
        saveInput(responseJson);
        watchForm2(responseJson);
    });
  }
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const inputFirstItem = $('#js-search-term').val();
      firstSearch = $('#js-search-term').val();
      getSimilarItems(inputFirstItem);
    });
}

$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm();
});