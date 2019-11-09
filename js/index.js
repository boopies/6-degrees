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
    displayResults(savedSearchArray);
}
}

//save the search Items
function displayResults(savedSearchArray) {
    console.log(savedSearchArray);
    p = searchNumber;
    $('.degree-of').append(`
    <h2 class="deg-title">Degree ${p+1} of Similarity</h2>`);
    for (let i = 0; i < savedSearchArray[p].length; i++){
        let searchTerm = savedSearchArray[p][i].Name;
        $(`.slideshow-container`).append(`
        <div class="mySlides fade">
        <div class="img-and-title">
        <div id='img${i}' class="img-size"></div>
        <div class='the-titles'>
        <div class="after${p}">
            <button type="submit" class="after-search" value="${savedSearchArray[p][i].Name}" id="${p}response${[i]}"> 
            Search with this</button>
            </div>
        </div>
        </div>
        <div class="Information ${i+1}">
            <p class="resultnumber">${i+1}</p>
            <h2>${savedSearchArray[p][i].Name}</h2>
            <h3>${savedSearchArray[p][i].Type}</h3>
            <div class="content">
             ${savedSearchArray[p][i].wTeaser}
             <br />
             <br />
             <a class="readmore-btn" href='${savedSearchArray[p][i].wUrl}' target="blank">
             <svg class="readmore" width="356" height="81" viewBox="0 0 356 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="356" height="81" rx="35" fill="#696969"/>
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="356" height="81">
                <rect width="356" height="81" rx="35" fill="#696969"/>
                </mask>
                <g mask="url(#mask0)">
                <circle cx="19.5" cy="40.5" r="51.5" fill="#3A90E0"/>
                <circle cx="-5.5" cy="40.5" r="51.5" fill="#96CDFF"/>
                <path d="M45.4766 42.1953H37.4609V56H32.9375V21.875H44.2344C48.0781 21.875 51.0312 22.75 53.0938 24.5C55.1719 26.25 56.2109 28.7969 56.2109 32.1406C56.2109 34.2656 55.6328 36.1172 54.4766 37.6953C53.3359 39.2734 51.7422 40.4531 49.6953 41.2344L57.7109 55.7188V56H52.8828L45.4766 42.1953ZM37.4609 38.5156H44.375C46.6094 38.5156 48.3828 37.9375 49.6953 36.7812C51.0234 35.625 51.6875 34.0781 51.6875 32.1406C51.6875 30.0312 51.0547 28.4141 49.7891 27.2891C48.5391 26.1641 46.7266 25.5938 44.3516 25.5781H37.4609V38.5156ZM72.3828 56.4688C68.9453 56.4688 66.1484 55.3438 63.9922 53.0938C61.8359 50.8281 60.7578 47.8047 60.7578 44.0234V43.2266C60.7578 40.7109 61.2344 38.4688 62.1875 36.5C63.1562 34.5156 64.5 32.9688 66.2188 31.8594C67.9531 30.7344 69.8281 30.1719 71.8438 30.1719C75.1406 30.1719 77.7031 31.2578 79.5312 33.4297C81.3594 35.6016 82.2734 38.7109 82.2734 42.7578V44.5625H65.0938C65.1562 47.0625 65.8828 49.0859 67.2734 50.6328C68.6797 52.1641 70.4609 52.9297 72.6172 52.9297C74.1484 52.9297 75.4453 52.6172 76.5078 51.9922C77.5703 51.3672 78.5 50.5391 79.2969 49.5078L81.9453 51.5703C79.8203 54.8359 76.6328 56.4688 72.3828 56.4688ZM71.8438 33.7344C70.0938 33.7344 68.625 34.375 67.4375 35.6562C66.25 36.9219 65.5156 38.7031 65.2344 41H77.9375V40.6719C77.8125 38.4688 77.2188 36.7656 76.1562 35.5625C75.0938 34.3438 73.6562 33.7344 71.8438 33.7344ZM102.969 56C102.719 55.5 102.516 54.6094 102.359 53.3281C100.344 55.4219 97.9375 56.4688 95.1406 56.4688C92.6406 56.4688 90.5859 55.7656 88.9766 54.3594C87.3828 52.9375 86.5859 51.1406 86.5859 48.9688C86.5859 46.3281 87.5859 44.2812 89.5859 42.8281C91.6016 41.3594 94.4297 40.625 98.0703 40.625H102.289V38.6328C102.289 37.1172 101.836 35.9141 100.93 35.0234C100.023 34.1172 98.6875 33.6641 96.9219 33.6641C95.375 33.6641 94.0781 34.0547 93.0312 34.8359C91.9844 35.6172 91.4609 36.5625 91.4609 37.6719H87.1016C87.1016 36.4062 87.5469 35.1875 88.4375 34.0156C89.3438 32.8281 90.5625 31.8906 92.0938 31.2031C93.6406 30.5156 95.3359 30.1719 97.1797 30.1719C100.102 30.1719 102.391 30.9062 104.047 32.375C105.703 33.8281 106.562 35.8359 106.625 38.3984V50.0703C106.625 52.3984 106.922 54.25 107.516 55.625V56H102.969ZM95.7734 52.6953C97.1328 52.6953 98.4219 52.3438 99.6406 51.6406C100.859 50.9375 101.742 50.0234 102.289 48.8984V43.6953H98.8906C93.5781 43.6953 90.9219 45.25 90.9219 48.3594C90.9219 49.7188 91.375 50.7812 92.2812 51.5469C93.1875 52.3125 94.3516 52.6953 95.7734 52.6953ZM112.367 43.1094C112.367 39.2188 113.289 36.0938 115.133 33.7344C116.977 31.3594 119.391 30.1719 122.375 30.1719C125.344 30.1719 127.695 31.1875 129.43 33.2188V20H133.766V56H129.781L129.57 53.2812C127.836 55.4062 125.422 56.4688 122.328 56.4688C119.391 56.4688 116.992 55.2656 115.133 52.8594C113.289 50.4531 112.367 47.3125 112.367 43.4375V43.1094ZM116.703 43.6016C116.703 46.4766 117.297 48.7266 118.484 50.3516C119.672 51.9766 121.312 52.7891 123.406 52.7891C126.156 52.7891 128.164 51.5547 129.43 49.0859V37.4375C128.133 35.0469 126.141 33.8516 123.453 33.8516C121.328 33.8516 119.672 34.6719 118.484 36.3125C117.297 37.9531 116.703 40.3828 116.703 43.6016ZM158.914 21.875L170.07 49.7188L181.227 21.875H187.062V56H182.562V42.7109L182.984 28.3672L171.781 56H168.336L157.156 28.4375L157.602 42.7109V56H153.102V21.875H158.914ZM193.18 43.0859C193.18 40.6016 193.664 38.3672 194.633 36.3828C195.617 34.3984 196.977 32.8672 198.711 31.7891C200.461 30.7109 202.453 30.1719 204.688 30.1719C208.141 30.1719 210.93 31.3672 213.055 33.7578C215.195 36.1484 216.266 39.3281 216.266 43.2969V43.6016C216.266 46.0703 215.789 48.2891 214.836 50.2578C213.898 52.2109 212.547 53.7344 210.781 54.8281C209.031 55.9219 207.016 56.4688 204.734 56.4688C201.297 56.4688 198.508 55.2734 196.367 52.8828C194.242 50.4922 193.18 47.3281 193.18 43.3906V43.0859ZM197.539 43.6016C197.539 46.4141 198.188 48.6719 199.484 50.375C200.797 52.0781 202.547 52.9297 204.734 52.9297C206.938 52.9297 208.688 52.0703 209.984 50.3516C211.281 48.6172 211.93 46.1953 211.93 43.0859C211.93 40.3047 211.266 38.0547 209.938 36.3359C208.625 34.6016 206.875 33.7344 204.688 33.7344C202.547 33.7344 200.82 34.5859 199.508 36.2891C198.195 37.9922 197.539 40.4297 197.539 43.6016ZM233.961 34.5312C233.305 34.4219 232.594 34.3672 231.828 34.3672C228.984 34.3672 227.055 35.5781 226.039 38V56H221.703V30.6406H225.922L225.992 33.5703C227.414 31.3047 229.43 30.1719 232.039 30.1719C232.883 30.1719 233.523 30.2812 233.961 30.5V34.5312ZM248.023 56.4688C244.586 56.4688 241.789 55.3438 239.633 53.0938C237.477 50.8281 236.398 47.8047 236.398 44.0234V43.2266C236.398 40.7109 236.875 38.4688 237.828 36.5C238.797 34.5156 240.141 32.9688 241.859 31.8594C243.594 30.7344 245.469 30.1719 247.484 30.1719C250.781 30.1719 253.344 31.2578 255.172 33.4297C257 35.6016 257.914 38.7109 257.914 42.7578V44.5625H240.734C240.797 47.0625 241.523 49.0859 242.914 50.6328C244.32 52.1641 246.102 52.9297 248.258 52.9297C249.789 52.9297 251.086 52.6172 252.148 51.9922C253.211 51.3672 254.141 50.5391 254.938 49.5078L257.586 51.5703C255.461 54.8359 252.273 56.4688 248.023 56.4688ZM247.484 33.7344C245.734 33.7344 244.266 34.375 243.078 35.6562C241.891 36.9219 241.156 38.7031 240.875 41H253.578V40.6719C253.453 38.4688 252.859 36.7656 251.797 35.5625C250.734 34.3438 249.297 33.7344 247.484 33.7344Z" fill="white"/>
                <circle cx="309" cy="40" r="32" fill="white"/>
                <g filter="url(#filter0_d)">
                <path d="M301 24L317 40.875L301 57" stroke="#5BA4FB" stroke-width="7" stroke-linejoin="round"/>
                </g>
                </g>
                <defs>
                <filter id="filter0_d" x="294.46" y="21.5919" width="30.0398" height="45.8734" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                </defs>
                </svg>
                </a>
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
    } else if (searchNumber >= 0){
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
      $('.similar-button').addClass('hidden');
      firstSearch = $('#js-search-term').val();
      getSimilarItems(inputFirstItem, limitResults, limitSearch, maxResults);
    });
}

//Checks if the search if 5 searches have been made to move the search to the final end pages.
function nextOrEnd(savedSearchArray){
    if(searchNumber <= 4){
        $(function(){
            watchForm2(savedSearchArray);
        });
    } else {
        $(function(){
            watchFormFinal(savedSearchArray);
        });
    }
}


//Selects the new Search Item, Saves the New Search Item to be used later
function watchForm2(savedSearchArray){
    slideIndex = 0
    let p = searchNumber;
    let newSearch;
    let arrayOne = $(`.results .after${p} button`).map(function(){return this.id;}).get();
    //loops to the buttons to add an event listener to start a new search
     for (let i=0; i < arrayOne.length; i++){
    document.body.addEventListener( 'click', function(event){
        if(event.srcElement.id == `${arrayOne[i]}`) {
            console.log('this is searched')
            let saveThis = savedSearchArray[p][i];
            saveChoice(saveThis);
            newSearch = $(`#${arrayOne[i]}`).val();
            searchNumber++;
            searchNumberIndex++;
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
    slideIndex = 0
        //creates an array from the results buttons
    let arraySix = $(`.results .after${p} button`).map(function(){return this.id;}).get();            
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
    }
}

//push familiar search info to finalPath array
function saveChoice(saveThis){
    finalPath.push(saveThis);
    console.log(finalPath);
}

//Display the 6 choices you have selected. gives you more information about it. 
function displayFinal6(){
            $('.degree-of-end').append(`
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
                $('.slideshow-container-end').append(`
                <div class="myDegree my-degree-${i}">
                    <div class="img-and-title-final"><p class="final-degrees">Degree ${i+1}</p>
                    <a href="#ending-popups${i}"><div id="imgfinal${i}" class="img-size"></div></a>
                    </div>
                    <a href="#ending-popups${i}"><p class="final-name">${finalPath[i].Name}</p></a>
                    <a href="#ending-popups${i}"><p class="final-type">${finalPath[i].Type}</p></a>
                    </div>
                       
                    <div id="ending-popups${i}" class="overlay">
                        <div class="popup-result input">
                        <h2>${finalPath[i].Name}</h2>
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                        ${finalPath[i].wTeaser}
                        <a href='${finalPath[i].wUrl}' target="blank">
                        <svg class="readmore" width="356" height="81" viewBox="0 0 356 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="356" height="81" rx="35" fill="#696969"/>
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="356" height="81">
                        <rect width="356" height="81" rx="35" fill="#696969"/>
                        </mask>
                        <g mask="url(#mask0)">
                        <circle cx="19.5" cy="40.5" r="51.5" fill="#3A90E0"/>
                        <circle cx="-5.5" cy="40.5" r="51.5" fill="#96CDFF"/>
                        <path d="M45.4766 42.1953H37.4609V56H32.9375V21.875H44.2344C48.0781 21.875 51.0312 22.75 53.0938 24.5C55.1719 26.25 56.2109 28.7969 56.2109 32.1406C56.2109 34.2656 55.6328 36.1172 54.4766 37.6953C53.3359 39.2734 51.7422 40.4531 49.6953 41.2344L57.7109 55.7188V56H52.8828L45.4766 42.1953ZM37.4609 38.5156H44.375C46.6094 38.5156 48.3828 37.9375 49.6953 36.7812C51.0234 35.625 51.6875 34.0781 51.6875 32.1406C51.6875 30.0312 51.0547 28.4141 49.7891 27.2891C48.5391 26.1641 46.7266 25.5938 44.3516 25.5781H37.4609V38.5156ZM72.3828 56.4688C68.9453 56.4688 66.1484 55.3438 63.9922 53.0938C61.8359 50.8281 60.7578 47.8047 60.7578 44.0234V43.2266C60.7578 40.7109 61.2344 38.4688 62.1875 36.5C63.1562 34.5156 64.5 32.9688 66.2188 31.8594C67.9531 30.7344 69.8281 30.1719 71.8438 30.1719C75.1406 30.1719 77.7031 31.2578 79.5312 33.4297C81.3594 35.6016 82.2734 38.7109 82.2734 42.7578V44.5625H65.0938C65.1562 47.0625 65.8828 49.0859 67.2734 50.6328C68.6797 52.1641 70.4609 52.9297 72.6172 52.9297C74.1484 52.9297 75.4453 52.6172 76.5078 51.9922C77.5703 51.3672 78.5 50.5391 79.2969 49.5078L81.9453 51.5703C79.8203 54.8359 76.6328 56.4688 72.3828 56.4688ZM71.8438 33.7344C70.0938 33.7344 68.625 34.375 67.4375 35.6562C66.25 36.9219 65.5156 38.7031 65.2344 41H77.9375V40.6719C77.8125 38.4688 77.2188 36.7656 76.1562 35.5625C75.0938 34.3438 73.6562 33.7344 71.8438 33.7344ZM102.969 56C102.719 55.5 102.516 54.6094 102.359 53.3281C100.344 55.4219 97.9375 56.4688 95.1406 56.4688C92.6406 56.4688 90.5859 55.7656 88.9766 54.3594C87.3828 52.9375 86.5859 51.1406 86.5859 48.9688C86.5859 46.3281 87.5859 44.2812 89.5859 42.8281C91.6016 41.3594 94.4297 40.625 98.0703 40.625H102.289V38.6328C102.289 37.1172 101.836 35.9141 100.93 35.0234C100.023 34.1172 98.6875 33.6641 96.9219 33.6641C95.375 33.6641 94.0781 34.0547 93.0312 34.8359C91.9844 35.6172 91.4609 36.5625 91.4609 37.6719H87.1016C87.1016 36.4062 87.5469 35.1875 88.4375 34.0156C89.3438 32.8281 90.5625 31.8906 92.0938 31.2031C93.6406 30.5156 95.3359 30.1719 97.1797 30.1719C100.102 30.1719 102.391 30.9062 104.047 32.375C105.703 33.8281 106.562 35.8359 106.625 38.3984V50.0703C106.625 52.3984 106.922 54.25 107.516 55.625V56H102.969ZM95.7734 52.6953C97.1328 52.6953 98.4219 52.3438 99.6406 51.6406C100.859 50.9375 101.742 50.0234 102.289 48.8984V43.6953H98.8906C93.5781 43.6953 90.9219 45.25 90.9219 48.3594C90.9219 49.7188 91.375 50.7812 92.2812 51.5469C93.1875 52.3125 94.3516 52.6953 95.7734 52.6953ZM112.367 43.1094C112.367 39.2188 113.289 36.0938 115.133 33.7344C116.977 31.3594 119.391 30.1719 122.375 30.1719C125.344 30.1719 127.695 31.1875 129.43 33.2188V20H133.766V56H129.781L129.57 53.2812C127.836 55.4062 125.422 56.4688 122.328 56.4688C119.391 56.4688 116.992 55.2656 115.133 52.8594C113.289 50.4531 112.367 47.3125 112.367 43.4375V43.1094ZM116.703 43.6016C116.703 46.4766 117.297 48.7266 118.484 50.3516C119.672 51.9766 121.312 52.7891 123.406 52.7891C126.156 52.7891 128.164 51.5547 129.43 49.0859V37.4375C128.133 35.0469 126.141 33.8516 123.453 33.8516C121.328 33.8516 119.672 34.6719 118.484 36.3125C117.297 37.9531 116.703 40.3828 116.703 43.6016ZM158.914 21.875L170.07 49.7188L181.227 21.875H187.062V56H182.562V42.7109L182.984 28.3672L171.781 56H168.336L157.156 28.4375L157.602 42.7109V56H153.102V21.875H158.914ZM193.18 43.0859C193.18 40.6016 193.664 38.3672 194.633 36.3828C195.617 34.3984 196.977 32.8672 198.711 31.7891C200.461 30.7109 202.453 30.1719 204.688 30.1719C208.141 30.1719 210.93 31.3672 213.055 33.7578C215.195 36.1484 216.266 39.3281 216.266 43.2969V43.6016C216.266 46.0703 215.789 48.2891 214.836 50.2578C213.898 52.2109 212.547 53.7344 210.781 54.8281C209.031 55.9219 207.016 56.4688 204.734 56.4688C201.297 56.4688 198.508 55.2734 196.367 52.8828C194.242 50.4922 193.18 47.3281 193.18 43.3906V43.0859ZM197.539 43.6016C197.539 46.4141 198.188 48.6719 199.484 50.375C200.797 52.0781 202.547 52.9297 204.734 52.9297C206.938 52.9297 208.688 52.0703 209.984 50.3516C211.281 48.6172 211.93 46.1953 211.93 43.0859C211.93 40.3047 211.266 38.0547 209.938 36.3359C208.625 34.6016 206.875 33.7344 204.688 33.7344C202.547 33.7344 200.82 34.5859 199.508 36.2891C198.195 37.9922 197.539 40.4297 197.539 43.6016ZM233.961 34.5312C233.305 34.4219 232.594 34.3672 231.828 34.3672C228.984 34.3672 227.055 35.5781 226.039 38V56H221.703V30.6406H225.922L225.992 33.5703C227.414 31.3047 229.43 30.1719 232.039 30.1719C232.883 30.1719 233.523 30.2812 233.961 30.5V34.5312ZM248.023 56.4688C244.586 56.4688 241.789 55.3438 239.633 53.0938C237.477 50.8281 236.398 47.8047 236.398 44.0234V43.2266C236.398 40.7109 236.875 38.4688 237.828 36.5C238.797 34.5156 240.141 32.9688 241.859 31.8594C243.594 30.7344 245.469 30.1719 247.484 30.1719C250.781 30.1719 253.344 31.2578 255.172 33.4297C257 35.6016 257.914 38.7109 257.914 42.7578V44.5625H240.734C240.797 47.0625 241.523 49.0859 242.914 50.6328C244.32 52.1641 246.102 52.9297 248.258 52.9297C249.789 52.9297 251.086 52.6172 252.148 51.9922C253.211 51.3672 254.141 50.5391 254.938 49.5078L257.586 51.5703C255.461 54.8359 252.273 56.4688 248.023 56.4688ZM247.484 33.7344C245.734 33.7344 244.266 34.375 243.078 35.6562C241.891 36.9219 241.156 38.7031 240.875 41H253.578V40.6719C253.453 38.4688 252.859 36.7656 251.797 35.5625C250.734 34.3438 249.297 33.7344 247.484 33.7344Z" fill="white"/>
                        <circle cx="309" cy="40" r="32" fill="white"/>
                        <g filter="url(#filter0_d)">
                        <path d="M301 24L317 40.875L301 57" stroke="#5BA4FB" stroke-width="7" stroke-linejoin="round"/>
                        </g>
                        </g>
                        <defs>
                        <filter id="filter0_d" x="294.46" y="21.5919" width="30.0398" height="45.8734" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
                        </a>
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
                url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=1`,
                method: "GET",
                dataType: "jsonp",
                success: function(newData) {
                if (newData.query.pages[0].hasOwnProperty("thumbnail") === true){
                    $(`#imgfinal${i}`).append(`<img src='${newData.query.pages[0].thumbnail.source}' class='thumbnail-have'>`)
                } else{
                $(`#imgfinal${i}`).append(`<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png' class='havenothumbnail'>`)
                  }
              },
            error: function() {
                console.log("second call unsuccessful");
            }
        })
        };
        $('#search-form').addClass('hidden')
        $('.result-end').removeClass('hidden');
        $('.previous').addClass('hidden');
        watchReset();
        watchStart();  
}

//goes back a search result
function goBackOne(){
    $('#goBackOne').click(event=> {
        event.preventDefault();
        let i = savedSearchArray.length;
        while (i--) {
            if (i !== searchNumberIndex){
                savedSearchArray.splice(-1, 1);
                finalPath.splice(-1, 1);
                console.log(savedSearchArray);
                console.log(finalPath);
                searchNumberIndex--;
                searchNumber--;
                break;
            }
        };
        console.log(savedSearchArray);
        console.log(finalPath);
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
      dots[i].className = dots[i].className.replace(' active', '');
  };
  slides[slideIndex-1].style.display = 'flex';  
  dots[slideIndex-1].className += ' active';
}

$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm();
    revealLimitSearch();
    goBackOne();
});