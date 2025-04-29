let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
}

const imageUrls = [
    '/images/vance1.webp',
    '/images/vance2.jfif',
    '/images/vance3.jfif',
    '/images/vance4.jfif',
    '/images/vance5.jfif',
    '/images/vance6.jfif',
    '/images/vance7.jpeg',
    '/images/vance8.webp',
    '/images/vance9.jpeg'
];

var onloadCallback = function(){
    console.log("recaptcha ready")
};

function OnStartUp() {
    console.log("startup")
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = {page: 'about'};
    document.title = "About";
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = {page: 'contact'};
    document.title = "Contact";
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = {page: 'contact'};
    document.title = "Gallery";
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

document.getElementById('theme-toggle').addEventListener('click', (event) => {
    document.body.classList.toggle('dark-mode');
    console.log("dark mode changed");
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
            <h1 class="title">About Me</h1>
            <p>This is now about me main text, Lorem Ipsum</p>
            `
}

function RenderContactPage() {
    document.querySelector('main').innerHTML =
        `
        <h1 class="title">Contact with me</h1>
        <div class="container">
        <form id="contact-form">
        <div id="recaptcha-container"></div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
        </form>
        </div>
        `
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
        const token = grecaptcha.getResponse(); // Get the CAPTCHA token

        if (!token) {
            alert('Please complete the CAPTCHA before submitting.');
            return;
        }
    })
    setTimeout(() => {
        console.log(typeof grecaptcha)
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.render('recaptcha-container', {
                'sitekey': '6LdOtCcrAAAAAO-FTDGt7k3BuFh5OTzYUXxOkQeF'
            });
        } else {
            console.error('reCAPTCHA API not loaded yet.');
        }
    }, 100)
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
    <div class="grid" id="imageGrid">
    
    </div>

    <div class="modal" id="modal">
        <div class="modal-content" id="modalContent">
            <span class="close-btn" id="closeBtn">close</span>
            <img src="" alt="Full Image" id="modalImage">
        </div>
    </div>
            `

    const imageGrid = document.getElementById('imageGrid');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.getElementById('closeBtn');

    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.loading = "lazy";
        img.src = url;
        imageGrid.appendChild(img);
    });

    imageGrid.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modalImage.src = e.target.src;
            modal.style.display = 'flex';
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImage.src = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImage.src = '';
        }
    });
}

function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    console.log(window.location.href.toString().split(window.location.host)[1])

    if (loc === pageUrls.about) {
        RenderAboutPage();
    }
    if (loc === pageUrls.contact) {
        RenderContactPage();
    }
}

window.onpopstate = popStateHandler;
