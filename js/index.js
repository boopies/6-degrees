//variable to set for limit results
let LimitResults;
//default variable for return results if not 
let returnResults = 6;

//variable for which search number it is
let searchNumber = 0;

//Searched Saved for Final Results
let savedSearchArray = [];

//array of saved search results
let finalPath = [];

//array of the first search result
let firstSearch = [];


let slideIndex = 1;

//Fetch JSON from API for the first restult
function getSimilarItems(inputFirstItem, limitResults, limitSearch, returnResults){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${limitSearch}${inputFirstItem}${limitResults}&limit=${returnResults}`)
    .then(response => response.json())
    .then(responseJson => checkResults(responseJson))
    .catch(error => alert('We are having some issues.'));
}

//Fetch JSON from API for subsequent
function getSimilarItems2(newSearch, limitResults, returnResults){
    fetch (`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}${limitResults}&limit=${returnResults}`)
    .then(response => response.json())
    .then(responseJson => checkResults(responseJson))
    .catch(error => alert('We are having some issues.'));
}

//Display search results on the DOM. Saves the original Input to be used later.
function checkResults(responseJson){
if (responseJson.Similar.Results.length == 0){
    $('.results').append(`
    <h2 class="problem">Oh No!</h2>
    <div class="search-results">
    <p>There no results for this. Please check your spelling, refine your search, or try a new search.</p> 
    <button class="submit" id="reset-button">Search Again</button></div>`);
    $('.submit-form').addClass('hidden')
    $('.all-results').removeClass('hidden');
    watchReset();
} else {
    saveInput(responseJson);
    savedSearchArray.push(responseJson.Similar.Results);
    console.log(savedSearchArray);
    displayResults(savedSearchArray);
}
}

//save the search Items
function displayResults(savedSearchArray) {
    let p = searchNumber;
    $('.degree-of').append(`
    <h2>Degree ${p+1} of Similarity</h2>`);
    for (let i = 0; i < savedSearchArray[p].length; i++){
        let searchTerm = savedSearchArray[p][i].Name;
        $(`.slideshow-container`).append(`
        <div class="mySlides fade">
        <div class="img-and-title">
        <div id='img${i}'></div>
        <div class='the-titles'>
        <div class="after${p}">
            <button type="submit" class="after" value="${savedSearchArray[p][i].Name}" id="${p}response${[i]}"> 
            Search with this</button>
            </div>
        </div>
        </div>
        <div class="Information ${i+1}">
            <p>${i+1}</p>
            <h2>${savedSearchArray[p][i].Name}</h2>
            <h3>${savedSearchArray[p][i].Type}</h3>
            <div class="content">
             ${savedSearchArray[p][i].wTeaser}
             <a href='${savedSearchArray[p][i].wUrl}' target="blank">Read More Here</a>
                        </div>
                    </div>
        </div>`
         );
        $.ajax({
                url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=1`,
                method: "GET",
                dataType: "jsonp",
                success: function(newData) {
                if (newData.query.pages[0].hasOwnProperty("thumbnail") === true){
                    $(`#img${i}`).append(`<img src='${newData.query.pages[0].thumbnail.source}' class='thumbnail-got'>`)
                } else{
                $(`#img${i}`).append(`<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png' class='nothumbnail'>`)
                  }
              },
            error: function() {
                console.log("second call unsuccessful");
            }
        })
        };
    addPrevNext();
    addDotNav(savedSearchArray);
    showSlides(slideIndex);
    plusSlides(slideIndex);
    $('.all-results').removeClass('hidden');
    showPreviousResults();
    nextOrEnd(savedSearchArray);
    currentSlide(slideIndex);
}

//appends the next and previous button
function addPrevNext(){
    $('.slideshow-container').append(`
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>`)
}

//Add in a dot Navigation
function addDotNav(savedSearchArray){
    let p = searchNumber;
    for (let i = 0; i < savedSearchArray[p].length; i++){
        $('.dot-slider').append(`<span class="dot" onclick="currentSlide(${i+1})">${i+1}</span>`)
    }
}

//Show the Previous search Button
function showPreviousResults(){
    if (searchNumber >= 1){
        $('.previous').removeClass('hidden');
    } else {
        $('.previous').addClass('hidden');    
    }
}

//Form to input selection
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const inputFirstItem = $('#js-search-term').val();
      const limitSearch = $('#search-specific option:selected').val();
      const alimitResults = $('#specific-result option:selected').val();
      const maxResults = $('#js-max-results').val();
      returnResults = maxResults;
      limitResults = alimitResults;
      $('.about').addClass('hidden')
      $('#all-buttons').addClass('hidden');
      $('.similar-button-hide').addClass('hidden');
      firstSearch = $('#js-search-term').val();
      getSimilarItems(inputFirstItem, limitResults, limitSearch, maxResults);
    });
}

//Checks if the search if 5 searches have been made to move the search to the final end pages.
function nextOrEnd(savedSearchArray){
    if(searchNumber <= 4){
        $(function(){watchForm2(savedSearchArray);
        });
    } else {
        $(function(){watchFormFinal(savedSearchArray);
        });
    }
}


//Selects the new Search Item, Saves the New Search Item to be used later
function watchForm2(savedSearchArray){
    console.log('Ready to Selected');
    let p = searchNumber;
    const arrayOne = $(`.results .after${p} button`).map(function(){return this.id;}).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayOne.length; i++){
    document.body.addEventListener( 'click', function(event){
        if(event.srcElement.id == `${arrayOne[i]}`) {
            console.log('click on a button');
            let p = searchNumber;
            let saveThis = savedSearchArray[p][i];
            saveChoice(saveThis);
            const newSearch = $(`#${arrayOne[i]}`).val();
            searchNumber++;
            hideSearch();
            $('.degree-of').empty();
            $('.slideshow-container').empty();
            $('.dot-slider').empty();            
            getSimilarItems2(newSearch, limitResults, returnResults);
        }})}
    }

 //Final Selection to moved to Display Final 6 to show final results       
function watchFormFinal(savedSearchArray){
    let p = searchNumber;
        //creates an array from the results buttons
    const arraySix = $(`.results .after${p} button`).map(function(){return this.id;}).get();            
        for (let i=0; i < arraySix.length; i++){
            document.body.addEventListener( 'click', function(event){
                if(event.srcElement.id == `${arraySix[i]}`) {
                    let saveThis = savedSearchArray[p][i];
                    saveChoice(saveThis);
                    displayFinal6();
                    $('.all-results').removeClass('hidden');
                    $('.results').addClass('hidden');
        } })}
    }

//reveals the extra search items
function revealLimitSearch(){
    $('.limit-search').click(event =>{
        event.preventDefault();
            var x = document.getElementById('search-sepecific');
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          });
}

//Hides Search Button to stop 
function hideSearch(){
    let p = searchNumber;
    $(`.after${p}`).addClass('after-hidden')
}

//Sets the firstSearch array as first search Info
function saveInput(responseJson){
    if (searchNumber === 0){
    firstSearch = responseJson.Similar.Info[0];
    console.log(firstSearch);} else {
    console.log(firstSearch);
    }
}

//push familiar search info to finalPath array
function saveChoice(saveThis){
    finalPath.push(saveThis);
    console.log(finalPath);
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
                <div id="imgfinal${i}"></div>
            <p>${finalPath[i].Name}</p>
            <p>${finalPath[i].Type}</p>
            <div class="all-results">
                <a class="button" href="#endingpopups${[i+1]}">Read a bit</a>
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
        </div>`);
        let searchTerm = finalPath[i].Name;
        $.ajax({
                url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=1`,
                method: "GET",
                dataType: "jsonp",
                success: function(newData) {
                if (newData.query.pages[0].hasOwnProperty("thumbnail") === true){
                    $(`#imgfinal${i}`).append(`<img src='${newData.query.pages[0].thumbnail.source}' class='thumbnail'>`)
                } else{
                $(`#imgfinal${i}`).append(`<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png' class='nothumbnail'>`)
                  }
              },
            error: function() {
                console.log("second call unsuccessful");
            }
        })
        };
        $('.result-end').removeClass('hidden');
        $('.previous').addClass('hidden');
        watchReset();
        watchStart();  
    }


//goes back a search result
function goBackOne(){
    $('#goBackOne').click(event=> {
        event.preventDefault();
        savedSearchArray.pop();
        finalPath.pop();
        searchNumber --;
        $('.degree-of').empty();
        $('.slideshow-container').empty();
        $('.dot-slider').empty();  
        displayResults(savedSearchArray);
    }
    );
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

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';  
  };
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '');
  };
  slides[slideIndex-1].style.display = 'flex';  
  dots[slideIndex-1].style.display += 'active';
}


$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm();
    revealLimitSearch();
    goBackOne();
});