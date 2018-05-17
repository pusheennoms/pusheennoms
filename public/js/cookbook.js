const imgs = {
    'sushi': 'https://vanfoodies.files.wordpress.com/2012/06/img_6971.jpg',
    'coffee': 'https://c1.staticflickr.com/4/3883/14893485196_6e69e18397_b.jpg',
    'dumplings': 'https://assets.epicurious.com/photos/57aa24b3de966cd27ad74905/2:1/w_1260%2Ch_630/pork-dumplings.jpg',
    'bubble tea': 'https://media1.fdncms.com/thecoast/imager/georges-bubble-tea/u/zoom/4683750/george_sbubbletea1.jpg',
    'macarons': 'https://s-i.huffpost.com/gen/1688019/images/o-MACARON-DAY-2014-facebook.jpg',
    'hoisin salmon': 'http://thequotablekitchen.com/wp-content/uploads/2013/10/IMG_9536_2.jpg',
    'perogies': 'https://www.leannebrown.com/wp-content/uploads/2016/12/perogies-4.jpg'
};
var currIdx = 0;

createGallery();
changeSlide(0);

/**
 * Creates the cookbook slideshow gallery
 */
function createGallery() {
    let cookbookContainer = document.getElementById('cookbookContainer');
    let slideRowDiv = document.createElement('div');

    var x;
    var currSlide = 0;
    for (x in imgs) {
        let slideDiv = document.createElement('div');

        slideDiv.className = 'cookbookSlides';
        let slideNameDiv = document.createElement('div');
        slideNameDiv.className = 'slideName';

        slideNameDiv.innerHTML = '# ' + currSlide.toString();

        let slideImgUrl = document.createElement('a');
        slideImgUrl.href = '/search?q=' + x;
        let slideImg = document.createElement('img');
        slideImg.src = imgs[x];
        slideImg.className = 'cookbookImgs';
        slideImgUrl.appendChild(slideImg);
        slideDiv.appendChild(slideNameDiv);
        slideDiv.appendChild(slideImgUrl);

        let slideColumnDiv = document.createElement('div');
        slideColumnDiv.className = 'slideColumn';

        let slideThumb = document.createElement('img');
        slideThumb.src = imgs[x];
        slideThumb.className = 'thumb';
        slideThumb.alt = x.toUpperCase();
        slideThumb.onclick = (function (i) {
            return () => {
                changeSlide(i);
            }
        })(currSlide);

        cookbookContainer.appendChild(slideDiv);
        slideColumnDiv.appendChild(slideThumb);
        slideRowDiv.appendChild(slideColumnDiv);
        cookbookContainer.appendChild(slideRowDiv);

        currSlide += 1;
    }
}

/**
 * Changes the main slideshow img based on slide index
 * @param {int} idx - the index of the slide image being changed to
 */
function changeSlide(idx) {
    currIdx = idx;
    var slides = document.getElementsByClassName("cookbookSlides");
    var thumbs = document.getElementsByClassName("thumb");
    var captionText = document.getElementById("caption");

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].className = thumbs[i].className.replace(" active", "");
    }
    slides[idx].style.display = "block";
    thumbs[idx].className += " active";
    captionText.innerHTML = thumbs[idx].alt;
    captionText.href = '/search?q=' + thumbs[idx].alt;
}

/**
 * Changes to the previous slide img. If already on the first img, clicking
 * previous slide goes to the last img.
 */
function prevSlide() {
    currIdx = (((currIdx - 1) % 7) + 7) % 7;
    changeSlide(currIdx);
}

/**
 * Changes to the next slide img. If already on the last img, clicking
 * next slide goes to the first img.
 */
function nextSlide() {
    currIdx = (currIdx + 1) % 7;
    changeSlide(currIdx);
}