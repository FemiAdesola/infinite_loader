'use strict';

// const url = 'https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,region,languages,borders';

const url = 'https://script.google.com/macros/s/AKfycbxFlQXkvna9jYamLWhTQ1k3cJItWZDvCYoCmLTcN-CJcr7vZw/exec';

// const url = 'https://pokeapi.co/api/v2/ability/';

const perPage = { page: 1 };
const page = {};
page.loadMorePage = true;
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
      div.innerHTML = `
      <h3>${country[8]}</h3>
      <div>${country[5]} stars by ${country[6]} students </div>
    <hr>
      `;
    page.container.appendChild(div);
  })
}

// to fetch data 
function getData(){
    // const baseURL = url + '?limit=20' + perPage.page;
    const baseURL = url + '?p=' + perPage.page;
    page.message.textContent= "loading....."
    fetch(baseURL).then((rep) => rep.json())
      .then((json) => {
      if(json.data.pages.next != null){
        page.loadMorePage = true;
        
        // Message function for user to load more
        page.message.textContent = "-Page "+perPage.page+" --Scroll to load more---";
        }else{
            page.message.style.display = "none";
        }
          //
        console.log(json.data);
        renderData(json.data.posts)
  })
}

// For loading scroll 
window.onscroll = function(ev){
    if (
        (window.innerHeight + window.scrollY) >=
        (document.body.offsetHeight - 300)) {
        if (page.loadMorePage) {
            page.loadMorePage = false;
            addNewData();
        }
    }
}

function addNewData(){
  perPage.page++;
  getData();
}

// for emptying initial data 
initialLoading();
function initialLoading() {
    page.container.innerHTML = "";
    getData
}