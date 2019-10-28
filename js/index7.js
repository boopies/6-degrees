let finalPath = [];

function saveChoice(saveThis){
    finalPath.push(saveThis);
    console.log(finalPath);
}


function watchForm7() {
    document.body.addEventListener( 'click', function ( event ) {
        if(event.srcElement.id == 'sixthresponse1' ) {
            let saveThis = currentObj.Similar.Results[0];
            saveChoice(saveThis);
            currentObj = {};
            displayFinal6();
            hideAllResults();
        };
        if(event.srcElement.id == 'sixthresponse2' ) {
            let saveThis = currentObj.Similar.Results[1];
            saveChoice(saveThis);
            currentObj = {};
            displayFinal6();
            hideAllResults();
        };
        if(event.srcElement.id == 'sixthresponse3' ) {
            let saveThis = currentObj.Similar.Results[2];
            saveChoice(saveThis);
            currentObj = {};
            displayFinal6();
            hideAllResults();
        };
        if(event.srcElement.id == 'sixthresponse4' ) {
            let saveThis = currentObj.Similar.Results[3];
            saveChoice(saveThis);
            currentObj = {};
            displayFinal6();
            hideAllResults();
        };
        if(event.srcElement.id == 'sixthresponse5' ) {
            let saveThis = currentObj.Similar.Results[4];
            saveChoice(saveThis);
            currentObj = {};
            displayFinal6();
            hideAllResults();
        };
        if(event.srcElement.id == 'sixthresponse6' ) {
            let saveThis = currentObj.Similar.Results[5];
            saveChoice(saveThis);
            currentObj = {};
            displayFinal6();
            hideAllResults();
        };
      } );
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
    });
}