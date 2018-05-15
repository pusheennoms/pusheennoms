const imgs = {
    'oshi sushi': 'https://vanfoodies.files.wordpress.com/2012/06/img_6971.jpg',
    'coffee': 'https://c1.staticflickr.com/4/3883/14893485196_6e69e18397_b.jpg',
    'dumplings': 'https://assets.epicurious.com/photos/57aa24b3de966cd27ad74905/2:1/w_1260%2Ch_630/pork-dumplings.jpg',
    'bubble tea': 'https://media1.fdncms.com/thecoast/imager/georges-bubble-tea/u/zoom/4683750/george_sbubbletea1.jpg',
    'macarons': 'https://s-i.huffpost.com/gen/1688019/images/o-MACARON-DAY-2014-facebook.jpg',
    'hoisin salmon': 'http://thequotablekitchen.com/wp-content/uploads/2013/10/IMG_9536_2.jpg',
    'perogies': 'https://www.leannebrown.com/wp-content/uploads/2016/12/perogies-4.jpg'
};

createGallery();

var slideIdx = 1;

showSlides(slideIdx);

function createGallery() {
    let cookbookContainer = document.getElementById('cookbookContainer');
    let slideRowDiv = document.getElementById('slideRow');

    var x;
    var currSlide = 1;
    for (x in imgs) {
        let slideDiv = document.createElement('div');

        slideDiv.className = 'cookbookSlides';
        let slideNameDiv = document.createElement('div');
        slideNameDiv.className = 'slideName';

        slideNameDiv.innerHTML = '# ' + currSlide.toString();
        let slideImg = document.createElement('img');
        slideImg.src = imgs[x];

        slideImg.className = 'cookbookImgs';
        slideDiv.appendChild(slideNameDiv);
        slideDiv.appendChild(slideImg);

        let slideColumnDiv = document.createElement('div');
        slideColumnDiv.className = 'slideColumn';

        let slideThumb = document.createElement('img');
        slideThumb.src = imgs[x];
        slideThumb.className = 'thumb';
        slideThumb.alt = x.toUpperCase();
        slideThumb.onclick = (function (i) {
            return () => {
                currentSlide(i);
            }
        })(currSlide);

        slideRowDiv.appendChild(slideColumnDiv);
        slideColumnDiv.appendChild(slideThumb);
        cookbookContainer.appendChild(slideDiv);
        cookbookContainer.appendChild(slideColumnDiv);

        currSlide += 1;
    }
}

function currentSlide(n) {
    showSlides(slideIdx = n);
}

function changeSlide(n) {
    showSlides(slideIdx += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("cookbookSlides");
    var dots = document.getElementsByClassName("thumb");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIdx = 1
    }
    if (n < 1) {
        slideIdx = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIdx - 1].style.display = "block";
    dots[slideIdx - 1].className += " active";
    captionText.innerHTML = dots[slideIdx - 1].alt;
}