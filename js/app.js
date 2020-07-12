'use strict';

// const { on } = require("process");

let allHornedAnimals = [];
const jsonFiles = ['Data/page-1.json', 'Data/page-2.json'];
let showingFirstPage = true;

function Horned(obj, data) {
  this.image_url = obj.image_url;
  this.keyword = obj.keyword;
  this.data = data;
  this.horns = obj.horns;
  this.title = obj.title;
  this.description = obj.description;
  allHornedAnimals.push(this);

}

Horned.prototype.render = function () {
  const photoTemplate = $('#photo-template').html();
  // eslint-disable-next-line no-undef
  let html = Mustache.render(photoTemplate, this);
  return html;
};

function getData(data) {
  $.ajax(jsonFiles[data], { method: 'GET', dataType: 'JSON' })
    .then(animal => animal.forEach(value => new Horned(value, data))
    ).then(() => {
      if (data === jsonFiles.length - 1) {
        const uniqueKeyword = allHornedAnimals
          .map(obj => obj.keyword)
          .reduce((acc, keyword) => {
            if (!acc.includes(keyword)) {
              acc.push(keyword)
            }
            return acc;
          }, [])
        uniqueKeyword
          .sort((a, b) => a > b ? 1 : -1)
          .forEach(value => $('select')
            .append(`<option>${value}</option>`))
      }
    }).then(() => {
      sortByKeyword();
    })
}


$('.change').change(function () {
  $('.1, .0').hide();
  if (this.value === 'default') {
    sortByKeyword();
  } else {
    if (showingFirstPage) {
      $(`.${this.value}`).fadeIn(1000);
    } else {
      $(`.${this.value}`).fadeIn(1000);
    }
  }
  $('#page-two').hide();
  $('h3').show();
})

$('#page-two').click(function () {
  $('.0, .1').toggle();
  showingFirstPage = !showingFirstPage;
})

$(document).ready(function() {
  $('h1').hide()
  $('h1').fadeIn(1000);
})

$('#gallery').on('click', '.box', function () {
  $('#gallery').find('.clone').hide();
  const clone = $(this).clone();
  clone.attr('id', 'close-up').addClass('clone')
  clone.removeClass('box');
  clone.find('p').show()
  clone.find('i').show()
  clone.insertAfter(this);
  clone.hide();
  clone.slideDown(200,'linear');
  $('body').css('overflow','hidden')
})

$('#gallery').on('click','i', function () {
  $('#gallery').find('.clone').slideUp(200,'linear', () => {
    $('#gallery').find('.clone').remove();
    $('body').css('overflow','auto')
  })
})

$('h3').click(function () {
  $('.1, .0').hide();
  showingFirstPage ? $('.0').fadeIn(1000) : $('.1').fadeIn(1000);
  $('h3').hide();
  $('#page-two').show();
})

$('#sort-by-horns').click(function () {
  $('h3').hide();
  $('#page-two').show();
  allHornedAnimals.sort((a, b) => a.horns - b.horns);
  $('#gallery').html('');
  allHornedAnimals.forEach(obj => $('#gallery').append(obj.render()))
  showingFirstPage ? $('.1').hide() : $('.0').hide();
  $('p').hide();
  $('i').hide();
})

$('#sort-by-title').click(sortByKeyword)

function sortByKeyword() {
  $('h3').hide();
  $('#page-two').show();
  allHornedAnimals.sort((a, b) => a.title > b.title ? 1 : -1);
  $('#gallery').html('');
  allHornedAnimals.forEach(obj => $('#gallery').append(obj.render()))
  showingFirstPage ? $('.1').hide() : $('.0').hide();
  $('p').hide();
  $('i').hide();
}

getData(0);
getData(1);

