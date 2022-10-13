'use strict';

// const url = 'https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,region,languages,borders';

// const url = 'https://pokeapi.co/api/v2/ability/';

const url = 'https://restcountries.com/v2/all';

const currentYear = new Date().getFullYear();
document.getElementById('date').innerHTML = currentYear;

// const perPage = { page: 1 };
const page = {};
const formatter = new Intl.NumberFormat()

// page.loadMorePage = true;
page.container = document.createElement('div');
page.main = document.querySelector('section');
page.main.append(page.container);

page.message = document.createElement('div');
page.message.textContent = "---Scroll to load more---";
page.main.append(page.message);

getData();

// Forloading data 
function renderData(data){
  data.forEach(function(country){
    const div = document.createElement('div');
    div.innerHTML = 
     ` 
     <div class="countries">
      <div class="country">
        <div class="cardTop">
          <img src=${country.flags.png} alt="country flag"/>
          <h3>${country.name}</h3>
          <p>City: ${country.capital}</p>
        <div>
        <p>Population: <small>${(formatter.format(country.population))}</small></p>
      <div>
    </div>
      `;
    page.container.appendChild(div);
  })
}


function getData() {
  const baseURL = url ;
  //  page.message.textContent= "loading....."
   fetch(baseURL).then((rep)=> rep.json())
     .then((data) => {
      if(data.page != null){
            page.loadMorePage = true;
        
            // Message function for user to load more
            page.message.textContent = "-Page "+perPage.page+" --Scroll to load more---";
        }else{
            page.message.style.display = "none";
        }
      console.log(data)
      renderData(data)
  })
    .catch(err => console.log('Error:', err.message))
}




// For loading scroll 
window.onscroll = function(ev){
    if (
        (window.innerHeight + window.scrollY) >=
        (document.body.offsetHeight - 200)) {
        if (page.loadMorePage) {
            page.loadMorePage = false;
            addNewData();
        }
    }
}

function addNewData(){
  perPage.page++;
  getData()
}
