//variable to set for limit results
let LimitResults;
//default variable for return results if not
let returnResults = 6;

//variable for which search number it is
let searchNumber = 0;
let searchNumberIndex = 1;

//Searched Saved for Final Results
let savedSearchArray = [];

//array of saved search results
let finalPath = [];

//array of the first search result
let firstSearch = [];

// Slide Index Number
let slideIndex = 0;

//Saves all items that were input
let saveSearchInput = [];

//counter to limit use of go to previous. limits it to going back one search, not multiple. 
let returnCounter = 1;

//counter to determine if to append the search item to the DOM.
let searchAlready = 0;


//Form to input selection
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const inputFirstItem = $('#js-search-term').val();
        const limitSearch = $('#search-specific option:selected').val();
        const alimitResults = $('#specific-result option:selected').val();
        const maxResults = $('#js-max-results').val();
        saveSearchInput.push(inputFirstItem);
        returnResults = maxResults;
        limitResults = alimitResults;
        $('.submit-form').addClass('hidden');
        firstSearch = $('#js-search-term').val();
        getSimilarItems(inputFirstItem, limitResults, limitSearch, maxResults);
    });
}

//reveals the extra search items
function revealLimitSearch() {
    $('.limit-search').click(event => {
        event.preventDefault();
        var x = document.getElementById('search-sepecific');
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
}

//Fetch JSON from API for the first restult
function getSimilarItems(inputFirstItem, limitResults, limitSearch, returnResults) {
    fetch(`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${limitSearch}${inputFirstItem}${limitResults}&limit=${returnResults}`)
        .then(response => response.json())
        .then(responseJson => checkResults(responseJson))
        .catch(error => alert('We are having some issues.'));
}

//Display search results on the DOM. Saves the original Input to be used later.
function checkResults(responseJson) {
    if (responseJson.Similar.Results.length == 0) {
        $('.results').append(`<h2 class="problem">Oh No!</h2>
    <div class="search-results">
    <p class="problem-para">There no results for this. Please check your spelling, refine your search, or try a new search.</p> 
    <button class="submit" id="reset-button">Search Again</button></div>`);
        $('.submit-form').addClass('hidden')
        $('.all-results').removeClass('hidden');
        watchReset();
    } else if (responseJson.Similar.Results.length == 2) {
        $('.results').append(`<h2 class="problem">Oh No!</h2>
    <div class="search-results">
    <p class="problem-para">There no results for this. Please check your spelling, refine your search, or try a new search.</p> </div>
    <button class="submit" id="reset-button">Search Again</button>`);
        $('.submit-form').addClass('hidden')
        $('.all-results').removeClass('hidden');
        watchReset();
    } else {
        saveInput(responseJson);
        savedSearchArray.push(responseJson.Similar.Results);
        displayResults(savedSearchArray);
    }
}

//pushes information of the input search as an array
function saveInput(responseJson) {
    if (searchNumber === 0) {
        firstSearch = responseJson.Similar.Info[0];
        appendSearchItem(firstSearch);
    }
}

//appends the first search and details to DOM
function appendSearchItem(firstSearch) {
    if (searchAlready === 0){
    $('.what-searched').append(
        `<h2>Results similar to <a class="final-title" href="#searchpopupsinput">${firstSearch.Name}</a>
                </div>are: <div id="searchpopupsinput" class="overlay">
                <div class="popup-result input">
                    <h2>${firstSearch.Name}</h2>
                    <a class="close" href="#">&times;</a>
                    <div class="content">
                    <p>${firstSearch.wTeaser}</p>
                    <br />
                    <br />
                    <a href='${firstSearch.wUrl}' target="blank">
                    <div class="read-button">Read More</div></a>
                    </div>
                </div>
            </div> </h2>`
            );
        searchAlready++;
    }
}

//save the search Items
function displayResults(savedSearchArray) {
    let p = searchNumber;
    let k = 0;
    $('.degree-of').append(`<h2 class="deg-title">Degree ${p + 1} of Similarity</h2>`);
    for (let i = 0; i < savedSearchArray[k].length; i++) {
        let searchTerm = savedSearchArray[k][i].Name;
        $(`.slideshow-container`).append(`<div class="mySlides fade">
        <div class="img-and-title">
        <div id='img${i}' class="img-size"></div>
        <div class='the-titles'>
        <div class="after${p}">
            <button type="submit" class="after-search" value="${savedSearchArray[k][i].Name}" id="${savedSearchArray[k][i].Name}"> 
            Search with this</button>
            </div>
        </div>
        </div>
        <div class="Information ${i + 1}">
            <p class="resultnumber">${i + 1}</p>
            <h2>${savedSearchArray[k][i].Name}</h2>
            <h3>${savedSearchArray[k][i].Type}</h3>
            <div class="content">
             <p>${savedSearchArray[k][i].wTeaser}</p>
             <br />
             <br />
             <a class="readmore-btn" href='${savedSearchArray[k][i].wUrl}' target="blank">
             <div class="read-button">Read More</div>
                </a>
                </div>
            </div>
        </div>`
        );
        $.ajax({
            url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=1`,
            method: "GET",
            dataType: "jsonp",
            success: function (newData) {
                if (newData.query.pages[0].hasOwnProperty("thumbnail") === true) {
                    $(`#img${i}`).append(`<img src='${newData.query.pages[0].thumbnail.source}' class='thumbnail-got'>`
                    )
                } else {
                    $(`#img${i}`).append(`<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png' class='nothumbnail'>`
                    )
                }
            },
        })
    };
    addPrevNext();
    addDotNav(savedSearchArray);
    showSlides(slideIndex);
    plusSlides(slideIndex);
    $('.all-results').removeClass('hidden');
    showPreviousResultsButton();
    nextOrEnd(savedSearchArray);
    currentSlide(slideIndex);
}

//Show the Previous search Button
function showPreviousResultsButton() {
    if (returnCounter === 1) {
        $('.previous').addClass('hidden');
    } else if (returnCounter === 0) {
        $('.previous').removeClass('hidden');
    }
}

//appends the next and previous button
function addPrevNext() {
    $('.slideshow-container').append(`<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>`
    )
}

//Add in a dot Navigation
function addDotNav(savedSearchArray) {
    let k = 0;
    for (let i = 0; i < savedSearchArray[k].length; i++) {
        $('.dot-slider').append(`<span class="dot" onclick="currentSlide(${i + 1})">${i + 1}</span>`
        )
    }
}

//adds in the function to move between search results
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//keeps track of the slides.
function currentSlide(n) {
    showSlides(slideIndex = n);
}

//displays the slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    };
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    };
    slides[slideIndex - 1].style.display = 'flex';
    dots[slideIndex - 1].className += ' active';
}

// Checks if the search if 5 searches have been made to move the search to the final end pages.
function nextOrEnd(savedSearchArray) {
    if (searchNumber <= 4) {
        $(function () {
            watchForm2(savedSearchArray);
        });
    } else {
        $(function () {
            watchFormFinal(savedSearchArray);
        });
    }
}

//Selects the new Search Item, Saves the New Search Item to be used later
function watchForm2(savedSearchArray) {
    slideIndex = 0
    let p = searchNumber;
    let k = 0;
    let arrayOne = $(`.results .after${p} button`).map(function () {return this.id;}).get();
    //loops to the buttons to add an event listener to start a new search
    for (let i = 0; i < arrayOne.length; i++) {
        $(`.slideshow-container`).one(`click`, `.after-search`, event => {
            event.preventDefault();
            const pressID = event.target.id;
            if (pressID == `${arrayOne[i]}`) {
                let saveThis = savedSearchArray[k][i];
                saveChoice(saveThis);
                let newSearch = pressID;
                saveSearchInput.push(newSearch);
                searchNumber++;
                searchNumberIndex++;
                savedSearchArray.pop();
                returnCounter = 0;
                $('.previous').addClass('hidden');
                $('.degree-of').empty();
                $('.slideshow-container').empty();
                $('.dot-slider').empty();
                getSimilarItems2(newSearch, limitResults, returnResults);
            };
        })
    }
}

//push selected search info to finalPath array
function saveChoice(saveThis) {
    finalPath.push(saveThis);
}

//Fetch JSON from API for subsequent searches
function getSimilarItems2(newSearch, limitResults, returnResults) {
    fetch(`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=348431-SChoolPr-IA45DQJL&info=1&q=${newSearch}${limitResults}&limit=${returnResults}`)
        .then(response => response.json())
        .then(responseJson => checkResults(responseJson))
        .catch(error => alert('We are having some issues.'));
}

//Final Selection to moved to Display Final 6 to show final results
function watchFormFinal(savedSearchArray) {
    //creates an array from the results buttons
    let p = searchNumber;
    let k = 0;
    let arrayFinal = $(`.results .after${p} button`).map(function () {return this.id;}).get();
    for (let i = 0; i < arrayFinal.length; i++) {
        $(`.slideshow-container`).one(`click`, `.after-search`, event => {
            event.preventDefault();
            const pressID = event.target.id;
            if (pressID == `${arrayFinal[i]}`) {
                let saveThis = savedSearchArray[k][i];
                saveChoice(saveThis);
                displayFinal6();
                $('.all-results').addClass('hidden');
            };
        })
    }
}

//Display the 6 choices you have selected. gives you more information about it.
function displayFinal6() {
    $('.degree-of-end').append(
        `
            <h2>Your 6 Degrees from <a class="final-title" href="#endingpopupsinput">${firstSearch.Name}</a>
                </div>is <div id="endingpopupsinput" class="overlay">
                <div class="popup-result input">
                <h2>${firstSearch.Name}</h2>
                <a class="close" href="#">&times;</a>
                <div class="content">
                <p>${firstSearch.wTeaser}</p>
                <br />
                <br />
                <a href='${firstSearch.wUrl}' target="blank"><div class="read-button">Read More</div>
                </a>
                </div>
            </div>
        </div> </h2>
            <div class="Final-Results"> </div>`
    )
    for (let i = 0; i < finalPath.length; i++) {
        $('.slideshow-container-end').append(`<div class="myDegree my-degree-${i}">
                    <div class="img-and-title-final"><p class="final-degrees">Degree ${i + 1}</p>
                    <a href="#ending-popups${i}"><div id="imgfinal${i}" class="img-size-final"></div></a>
                    </div>
                    <div class="finals-links">
                    <a href="#ending-popups${i}"><p class="final-name">${finalPath[i].Name}</p></a>
                    <a href="#ending-popups${i}"><p class="final-type">${finalPath[i].Type}</p></a>
                    </div>
                    </div>
                    <div id="ending-popups${i}" class="overlay">
                        <div class="popup-result input">
                        <h2>${finalPath[i].Name}</h2>
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                        <p>
                        ${finalPath[i].wTeaser}
                        </p>
                        <div class="read-more-final"><a href='${finalPath[i].wUrl}' target="blank"><div class="read-button">Read More</div>
                        </a>
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>
                    <div class='arrow arrow${i}'>
                    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.37 68.18"><title>right-arrow</title><path d="M81.43,182.84h94l-17.63-26.65,85.44,34.08-85.08,34.1,17.09-26.47H81.43a7.55,7.55,0,0,1-7.53-7.53h0A7.55,7.55,0,0,1,81.43,182.84Z" transform="translate(-73.9 -156.19)" style="fill:#1d1d1b"/><path d="M197.33,299.37" transform="translate(-73.9 -156.19)" style="fill:#1d1d1b;stroke:#1d1d1b;stroke-miterlimit:10"/></svg>
                    </div>
                    `);
        let searchTerm = finalPath[i].Name;
        $.ajax({
            url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=1`,
            method: "GET",
            dataType: "jsonp",
            success: function (newData) {
                if (newData.query.pages[0].hasOwnProperty("thumbnail") === true) {
                    $(`#imgfinal${i}`).append(`<img src='${newData.query.pages[0].thumbnail.source}' class='thumbnail-have'>`
                    )
                } else {
                    $(`#imgfinal${i}`).append(`<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png' class='havenothumbnail'>`
                    )
                }
            },
        })
    };
    $('#search-form').addClass('hidden')
    $('.result-end').removeClass('hidden');
    $('.previous').addClass('hidden');
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

//goes back a search result
function goBackOne() {
    $('#goBackOne').click(event => {
        event.preventDefault();
        let p = searchNumber;
        let i = searchNumber;
        while (i--) {
            if (i !== searchNumberIndex) {
                savedSearchArray.pop();
                finalPath.pop();
                saveSearchInput.pop();
                searchNumber--;
                searchNumberIndex--;
                break;
            }
        };
        returnCounter = 1;
        let z = searchNumber;
        $('.previous').addClass('hidden');
        $('.degree-of').empty();
        $('.slideshow-container').empty();
        $('.dot-slider').empty();
        let newSearch = saveSearchInput[z];
        getSimilarItems2(newSearch, limitResults, returnResults);
    });
}

//returns users to the landing page
function watchStart() {
    $('#gotoStart').click(event => {
        event.preventDefault();
        window.location = 'index.html';
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
    revealLimitSearch();
    goBackOne();
});