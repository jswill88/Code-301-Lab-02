'use strict';


let allHornedAnimals = [];
// let keyWords = [];

//Add keyword to constructor
//JQuery event listener on click
//When clicked, loop through images and keep keyword matches
//Use JQuery to create new option for each unique keyword

function Horned(obj){
  this.image_url = obj.image_url;
  this.keyword = obj.keyword;
  allHornedAnimals.push(this);

}

Horned.prototype.render = function(){
  console.log('in the render function')
  const photoTemplate = $('#photo-template').html();
  const $newSection = $(`<section>${photoTemplate}</section>`);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('class', this.keyword);
  $('main').append($newSection);
};

$.ajax('Data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(animal => {
    animal.forEach(value => {
      new Horned(value).render();
    })}).then(() => {

    const uniqueKeyword = [];
    allHornedAnimals.forEach(value =>{
      if(!(uniqueKeyword.includes(value.keyword))){
        uniqueKeyword.push(value.keyword);
      }
    })
    uniqueKeyword.forEach(value =>{
      let $newOption = $(`<option>${value}</option>`)
      $('select').append($newOption);
    })

    console.log(uniqueKeyword);
  })

$('.change').change(function(){
  $('img').hide();
  $('img.' + this.value).show();
})
