const global = {
    currentPage: window.location.pathname
};


function hightlightActiveLink () {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

function init (){
    switch (global.currentPage){
        case '/':
        case '/index.html':
            console.log("Home");
            break;
        case '/show.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;  
        case '/search.html':
            console.log('Search');
            break;     
    }
    hightlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)