//array of saved search results
let finalPath = [];

//array of the first search result
let firstSearch = [];

//push familiar search info to finalPath array
function saveChoice(saveThis){
    finalPath.push(saveThis);
    console.log(finalPath);
}

//Sets the firstSearch array as first search Info
function saveInput(responseJson){
    firstSearch = responseJson.Similar.Info[0];
    console.log(firstSearch);
}

//Selects the final search result, pushes the final results to the finalPath array, Hides the 6th results
function watchForm7(responseJson) {
    //creates an array from the results buttons
    const arraySix = $('.results-six .after6 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arraySix.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arraySix[i]}`) {
            let saveThis = responseJson.Similar.Results[i];
            saveChoice(saveThis);
            displayFinal6();
            $('.results-six').addClass('hidden');;
        } 
    });
}
}

//Display the 6 choices you have selected. gives you more information about it. 
    function displayFinal6(){
        $('.final-results-all').append(`
        <h2>Your 6 Degrees from <a class="button hidden-after" href="#endingpopupsinput">${firstSearch.Name}</a>
        </div>is <div id="endingpopupsinput" class="overlay">
        <div class="popup-result input">
            <h2>${firstSearch.Name}</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
             ${firstSearch.wTeaser}
             <a href='${firstSearch.wUrl}' target="blank">Read More Here</a>
            </div>
        </div>
    </div> </h2>
        <div class="Final-Results"> </div>`)
        for (let i = 0; i < finalPath.length; i++){
            $('.final-results-all').append(`<p>Degree ${i+1}</p>
        <p>${finalPath[i].Name}</p>
        <p>${finalPath[i].Type}</p>
        <div class="all-results">
            <a class="button hidden-after" href="#endingpopups${[i+1]}">Read a bit</a>
        </div>
            <div id="endingpopups${[i+1]}" class="overlay">
        <div class="popup-result ${[i+1]}">
            <h2>${finalPath[i].Name}</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
             ${finalPath[i].wTeaser}
             <a href='${finalPath[i].wUrl}' target="blank">Read More Here</a>
            </div>
        </div>
    </div>`)
    };
    $('.result-end').removeClass('hidden');
    watchReset();
    watchStart();
  }

//resets everything from the search and start again from the search page
  function watchReset() {
    $('#reset-button').click(event => {
      event.preventDefault();
      document.location.reload(true);
    });
}

//returns users to the landing page
function watchStart() {
    $('#gotoStart').click(event => {
      event.preventDefault();
      window.location='index.html';
    });
}