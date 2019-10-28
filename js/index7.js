let finalPath = [];

function saveChoice(saveThis){
    finalPath.push(saveThis);
    console.log(finalPath);
}


function watchForm7() {
    //creates an array from the results buttons
    const arraySix = $('.results-six .after6 button').map(function () { return this.id; }).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arraySix.length; i++){
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == `${arraySix[i]}`) {
            let saveThis = currentObj.Similar.Results[i];
            saveChoice(saveThis);
            for (var prop in currentObj) { if (currentObj.hasOwnProperty(prop)) { delete currentObj[prop]};}
            displayFinal6();
            hideAllResults();
        } 
    });
}
}


    function displayFinal6(){
        $('.final-results-all').append(`
        <h2>Your 6 Degrees</h2>
        <div class="Final-Results"> </div>`)
        for (let i = 0; i < finalPath.length; i++){
            $('.final-results-all').append(`<p>${i+1}</p>
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
  }

  function hideAllResults(){
    $('.results-one').addClass('hidden');
    $('.results-two').addClass('hidden');
    $('.results-three').addClass('hidden');
    $('.results-four').addClass('hidden');
    $('.results-five').addClass('hidden');
    $('.results-six').addClass('hidden');
  }

//resets everything
  function watchReset() {
    $('#reset-button').click(event => {
      event.preventDefault();
      finalPath.length = 0;
      $('.result-end').addClass('hidden');
      $('.results-one').empty();
      $('.results-two').empty();
      $('.results-three').empty();
      $('.results-four').empty();
      $('.results-five').empty();
      $('.results-six').empty();
      $('.final-results-all').empty();
      document.getElementById("search-form").reset();
    });
}