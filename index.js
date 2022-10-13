'use strict';

// const url = 'https://restcountries.com/v2/all?fields=name,capital,currencies,population,flags,region,languages,borders';

const url = 'https://script.google.com/macros/s/AKfycbxFlQXkvna9jYamLWhTQ1k3cJItWZDvCYoCmLTcN-CJcr7vZw/exec';

// const url = 'https://pokeapi.co/api/v2/ability/';

const perPage = { page: 1 };

getData();

// to fetch data 
function getData(){
    // const baseURL = url + '?limit=20' + perPage.page;
    const baseURL = url + '?p=' + perPage.page;
  fetch(baseURL).then((rep)=> rep.json())
  .then((json) => {
    console.log(json.data);
    renderData(json.data.posts)
  })
}
