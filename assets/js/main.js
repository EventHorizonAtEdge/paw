/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})




/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})





sr.reveal('.person-card', {
    origin: 'left',
    interval: 100,
})

sr.reveal('.container2', {
    origin: 'right',
    interval: 100,
})





/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})








sr.reveal('.notes__card',{
    origin:'bottom',
    interval:150,
})



/*========== SMART NOTES SEARCH ==========*/

const input = document.getElementById("notesSearch");
const results = document.getElementById("searchResults");

if(input){

const chapters=[...document.querySelectorAll(".chapter-card")];

let selected=-1;

function showResults(value){

results.innerHTML="";

selected=-1;

if(value===""){

results.style.display="none";

return;

}

const search = value.toLowerCase();

const matches = chapters.filter(card => {

    const title = card.querySelector("h3").innerText.toLowerCase();

    const tags = (card.dataset.tags || "").toLowerCase();

    return title.includes(search) || tags.includes(search);

});

if(matches.length===0){

results.style.display="none";

return;

}

matches.forEach(card=>{

    const item=document.createElement("div");
    item.className="search-item";

    const title = card.querySelector("h3").innerText;

    const pdf = card.querySelector("a").href;

    let status = "";

    const tags = (card.dataset.tags || "").toLowerCase();

    if (tags.includes("not-started")) {
        status = '<span class="search-badge not-started">Not Started</span>';
    }
    else if (tags.includes("in-progress")) {
        status = '<span class="search-badge in-progress">In Progress</span>';
    }
    else if (tags.includes("incomplete")) {
        status = '<span class="search-badge incomplete">Incomplete</span>';
    }

    item.innerHTML = `
        <div class="search-title">${title}</div>

        ${status}

        <div class="search-actions">
            <i class="ri-arrow-down-line search-scroll" title="Go to Chapter"></i>
            <a href="${pdf}" target="_blank" class="search-open" title="Open PDF">
                <i class="ri-eye-line"></i>
            </a>
        </div>
    `;

    item.querySelector(".search-scroll").onclick=(e)=>{
        e.stopPropagation();

        card.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

        results.style.display="none";
        input.value="";
    };

    item.querySelector(".search-open").onclick=(e)=>{
        e.stopPropagation();
    };

    results.appendChild(item);

});

results.style.display="block";

}

input.addEventListener("input",()=>{

showResults(input.value);

});

document.addEventListener("click",(e)=>{

if(!e.target.closest(".notes-search")){

results.style.display="none";

}

});

input.addEventListener("keydown",(e)=>{

const items=document.querySelectorAll(".search-item");

if(items.length===0)return;

if(e.key==="ArrowDown"){

selected++;

if(selected>=items.length)selected=0;

}

if(e.key==="ArrowUp"){

selected--;

if(selected<0)selected=items.length-1;

}

items.forEach(x=>x.style.background="");

if(selected>=0){

items[selected].style.background="var(--first-color)";

items[selected].style.color="#fff";

}

if(e.key==="Enter" && selected>=0){

items[selected].click();

}

});

}

