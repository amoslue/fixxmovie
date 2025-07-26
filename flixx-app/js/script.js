const global = {
  currentPage: window.location.pathname,
  searchObject: {
    term:'',
    page:1,
    totalPages:1
  },
  API_KEY : 'af94c83c5fecd3e4081de8e9e1f388ae',
  API_URL : 'https://api.themoviedb.org/3/',
};

async function displayPopularMovie() {
  const results = await fetchAPIData("movie/popular");
  results.results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `        <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />
            `
              : `       <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}
async function fetchAPIData(endpoint) {
const apiUrl = global.API_URL;
const apiKey = global.API_KEY;
  try {
    const response = await fetch(
      `${apiUrl}${endpoint}?api_key=${apiKey}&language=en-US`
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    hideSpinner();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  const div = document.createElement("div");
  displayBackgroundImage(movie, movie.backdrop_path);

  div.innerHTML = `
  <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `        <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="Movie Title"
      />
        `
        : `       <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`
    }


      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>${movie.overview}
      </p>

      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    `;

  document.querySelector("#movie-details").appendChild(div);
}

function displayBackgroundImage(type, path) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${path})`;
  overlayDiv.style.position = "fixed"; // Sticks to viewport
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = '0.5'
  document.querySelector("#movie-details").appendChild(overlayDiv);
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

async function displaySlider() {
    const results = await fetchAPIData('movie/now_playing');
    console.log(results);
    results.results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> 8 / 10
        </h4>
        `
        console.log(div);
     document.querySelector('.swiper-wrapper').appendChild(div);
     initSwiper();
    });
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 5,         // Fixed typo: slidesPreView → slidesPerView
        spaceBetween: 10,
        loop: true,
        freeMode: true,

        // Optional movie-like features
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

async function search() {
    const query = window.location.search;
    const url = new URLSearchParams(query);
    global.searchObject.term = url.get('search-term');
    if (global.searchObject.term !== '' && global.searchObject.term!== null){
        const results = await searchAPIData();
        console.log('search', results)
        results.results.forEach((movie)=>{
            const div = document.createElement('div');
            div.classList.add('card')
            div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `        <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="Movie Title"
              />
                `
                : `       <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title"
              />`
            }
              <h2>${movie.title}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average} / 10
              </p>
              <p class="text-muted">Release Date: ${movie.release_date}</p>
              <p>${movie.overview}
              </p>
        
              <a href="${
                movie.homepage
              }" target="_blank" class="btn">Visit Movie Homepage</a>
            `;
            document.querySelector('#search-results').appendChild(div);
        })
        
    } else {
        alert('enter search term!')
    }
}

async function searchAPIData() {
    const apiUrl = global.API_URL;
    const apiKey = global.API_KEY;
      try {
        const response = await fetch(
          `${apiUrl}search/movie?api_key=${apiKey}&language=en-US&query=${global.searchObject.term}`
        );
        console.log(`${apiUrl}$search/movie?api_key=${apiKey}&language=en-US&query=${global.searchObject.term}`
        )
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        hideSpinner();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


function hightlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovie();
      displaySlider();
      break;
    case "/show.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      displayMovieDetails();
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      search();
      break;
  }
  hightlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
