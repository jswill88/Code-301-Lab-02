'use strict';


let allHornedAnimals = [];
const jsonFiles = ['Data/page-1.json', 'Data/page-2.json'];
let showingFirstPage = true;

//Add keyword to constructor
//JQuery event listener on click
//When clicked, loop through images and keep keyword matches
//Use JQuery to create new option for each unique keyword

function Horned(obj, data) {
  this.image_url = obj.image_url;
  this.keyword = obj.keyword;
  this.data = data;
  this.horns = obj.horns;
  this.title = obj.title;
  allHornedAnimals.push(this);

}

Horned.prototype.render = function () {
  const photoTemplate = $('#photo-template').html();
  // eslint-disable-next-line no-undef
  let html = Mustache.render(photoTemplate, this);
  return html;

  // $newSection.find('img').attr('class', `${this.keyword} ${this.data}`);
  // // $newSection.find('img').attr('class', this.data);
  // $('main').prepend($newSection);
};

function getData(data) {
  $.ajax(jsonFiles[data], { method: 'GET', dataType: 'JSON' })
    .then(animal => {
      animal.forEach(value => {
        // let imageHtml =
        new Horned(value, data);
        // .render();
        // $('#gallery').append(imageHtml);
      })
    }).then(() => {
      if (data === 0) {
        const uniqueKeyword = [];
        allHornedAnimals.forEach(value => {
          if (!(uniqueKeyword.includes(value.keyword))) {
            uniqueKeyword.push(value.keyword);
          }
        })
        uniqueKeyword.forEach(value => {
          let $newOption = $(`<option>${value}</option>`)
          $('select').append($newOption);
        })
      }
    }).then(()=> {
      sortByKeyword();
    })
}
// test
getData(0);
getData(1);



$('.change').change(function () {
  $('img').hide();
  if (this.value === 'default') {
    sortByKeyword();
  } else {
    if (showingFirstPage) {
      $('img.' + this.value + '.0').fadeIn(1000);
    } else {
      $('img.' + this.value + '.1').fadeIn(1000);
    }
    // showingFirstPage = !(showingFirstPage);
  }
})

$('#page-two').click(function () {
  sortByKeyword();
  if (showingFirstPage){
    $('img').toggle();
  }
  showingFirstPage = !showingFirstPage;
})

$('#sort-by-horns').click(function () {
  allHornedAnimals.sort((a,b) => a.horns - b.horns);
  console.log(allHornedAnimals);
  $('#gallery').html('');
  allHornedAnimals.forEach(value => {
    let imageHtml = value.render();
    $('#gallery').append(imageHtml);
  })
  if(showingFirstPage) {
    $('.1').hide();
  } else {
    $('.0').hide();
  }
})

$('#sort-by-title').click(function () {
  allHornedAnimals.sort((a,b) => a.title > b.title ? 1 : -1);
  console.log(allHornedAnimals);
  $('#gallery').html('');
  allHornedAnimals.forEach(value => {
    let imageHtml = value.render();
    $('#gallery').append(imageHtml);
  })
  if(showingFirstPage) {
    $('img.1').hide();
  } else if (!showingFirstPage) {
    $('img.0').hide();
  }
})

function sortByKeyword() {
  allHornedAnimals.sort((a,b) => a.keyword > b.keyword ? 1 : -1);
  console.log(allHornedAnimals);
  $('#gallery').html('');
  allHornedAnimals.forEach(value => {
    let imageHtml = value.render();
    $('#gallery').append(imageHtml);
  })
  $('img.1').hide();
}

