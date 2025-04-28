let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact'
}

function OnStartUp() {
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

document.getElementById('theme-toggle').addEventListener('click', (event) => {
   document.body.classList.toggle('dark-mode');
   console.log("dark mode changed");
});

function RenderAboutPage(){
    fetch('about.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('main').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });
}

function RenderContactPage(){
    fetch('contact.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('main').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching the HTML file:', error);
        });

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');

    })
}

function popStateHandler(){
    let loc = window.location.href.toString().split(window.location.host)[1];
    console.log(window.location.href.toString().split(window.location.host)[1])

    if (loc === pageUrls.about) {RenderAboutPage();}
    if (loc === pageUrls.contact) {RenderContactPage();}
}

window.onpopstaet = popStateHandler;
