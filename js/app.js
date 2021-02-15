'use strict';

console.log('please work');

function Album(image, title, description, keyword, horns) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

}

Album.prototype.renderAlbum = function () {
    let sectionAlbum = $('.sec').clone();
    sectionAlbum.find('img').attr('src', this.image);
    sectionAlbum.find('h2').text(this.title);
    sectionAlbum.find('p').text(this.description);
    sectionAlbum.removeClass('sec');
    $('main').append(sectionAlbum);

};

function display() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('../data/page-1.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let jsAlbum = new Album(element.image_url, element.title, element.description, element.keyword, element.horns);
            jsAlbum.renderAlbum();
        });
    });
}

$('document').ready(display);