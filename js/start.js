function startSite(){
    $('#start-here').click(event => {
        event.preventDefault();
        window.location='main.html';
    });
}

$(function(){
    console.log('App loaded! Waiting for submit!');
    startSite();
});