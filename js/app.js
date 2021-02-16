'use strict';

var keywords = [];

function Album(image, title, description, keyword, horns) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    keywords.push(this.keyword);
}


Album.prototype.renderAlbum = function () {
    let sectionAlbum = $('.sec').clone();
    sectionAlbum.find('img').attr('src', this.image);
    sectionAlbum.find('h2').text(this.title);
    sectionAlbum.find('p').text(this.description);
    sectionAlbum.removeClass('sec');
    sectionAlbum.toggleClass(this.keyword);

    $('main').append(sectionAlbum);
};

function display() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
            jsAlbum.renderAlbum();

        });
        filtering();
        showKeywords();
    });
}

$('document').ready(display);

console.log(keywords);
var uniqueNames = [];
function filtering() {

    $.each(keywords, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    console.log(uniqueNames);
}

function showKeywords() {
    let showing = $('.showKeywords').clone();
    showing.removeClass('showKeywords');

    for (let index = 0; index < uniqueNames.length; index++) {
        let keyValue = uniqueNames[index];
        $("select").append(`<option>${keyValue}</option>`);
    }

}
let showHide = (event) => {
    $('section').hide();
    let selectKeyWord = event.target.value;
    $('section').hide();
    $(`.${selectKeyWord}`).fadeIn();

};
$('.showKeywords').on('change', showHide);
$('select').on('change',showHide);

function showAlbumTwo() {
    keywords = [];
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('../data/page-2.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
            jsAlbum.renderAlbum();
        });
        clearAndRender();
    });
}

let clearAndRender = (event) => {
    $('.sec').hide();
    let selectImages = event.target.id;
    $('.secP').hide();
    $(`.${selectImages}`).fadeIn();
};

$('.showKeywords').on('change', showAlbumTwo);