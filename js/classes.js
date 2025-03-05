//SITE HEADER
customElements.define("site-header", class SiteHeader extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "site-header"
        let backButton = this.hasAttribute("back");
        let title = this.getAttribute("title");
        let toggle = this.getAttribute("toggle");

        //TEMPLATES(S)
        backButton = backButton ? `<button><i class="fas fa-arrow-left site-header__back-button"></i></button>` : ""
        title = title ? `<h1>${title}</h1>` : ""
        toggle = toggle ? `<dark-mode-toggle mounted="true"></dark-mode-toggle>` : ""

        //INNER HTML
        this.innerHTML = `
        ${backButton}
        ${title}
        ${toggle}
        `
    }

})

//NOW PLAYING CARD
customElements.define("movie-card", class NowPlayingCard extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "movie-card"
        //this.cardModifier = checkLayoutDirection(this)
        this.setAttribute("role", "article");
        let imgSource = this.getAttribute("image-src");
        let movieTitle = this.getAttribute("movie-title");
        let rating = this.getAttribute("rating");

        //TEMPLATES(S)
        let template = `
        <clickable-image image-src="${imgSource}" movie-title="${movieTitle}"></clickable-image>
        <div class ="movie-card__info-container">
            <h3>${movieTitle}</h3>
            <p class="movie-card__rating"><i class="fa fa-star movie-card__star-icon"></i> ${rating}/10 IMDb</p>
        </div>
       
        `
        template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
    connectedCallback() {

    }
})



//CLICKABLE IMAGE
customElements.define("clickable-image", class ClickableImage extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "clickable-image"
        let imgSource = this.getAttribute("image-src");
        let title = this.getAttribute("movie-title");
        let backlightSrc = imgSource.replace("/w500/", "/w200");

        //TEMPLATES(S)
        let template = `    
        <div class= "clickable-image__wrapper">
            <div class= "clickable-image__backlight-wrapper">
                <img class="clickable-image-card__backlight" src="${backlightSrc}" alt="">
            </div>
            <a href="#" aria-label="Go to detail page for movie ${title}"><img src="${imgSource}" alt=""></a>
        </div>
        `
        template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})

//MOVIE LIST SECTION
customElements.define("movie-list", class MovieList extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "movie-list";
        this.containerAttribute = checkLayoutDirection(this)
        console.log(this.containerAttribute)
        let id = this.getAttribute("id");
        let title = this.getAttribute("title");
        this.setAttribute("role", "section");

        let containerID = setMovieListID(id);

        //TEMPLATES(S)
        let template = `
        <section-subheader title="${title}" button="true"></section-subheader>
        <div id="${containerID}" class="movie-list__items-container" ${this.containerAttribute}></div>
        `
        //template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})

//SECTION SUBHEADER
customElements.define("section-subheader", class SectionSubheader extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "section-subheader"
        let title = this.getAttribute("title");
        //let button = this.getAttribute("button");

        //TEMPLATES(S)
        let template = `
        <h2 class="section-subheader__title">${title}</h2>
        <button>See more</button>
        `
        template = title ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})


//DARKMODE TOGGLE
customElements.define("dark-mode-toggle", class DarkModeToggle extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "dark-mode-toggle"
        let mounted = this.getAttribute("mounted");
        let isDarkMode = getLS("dark-mode")

        //TEMPLATES(S)
        let template = `
        <label for="ms1" aria-label="Dark mode"><i class="dark-mode__toggle-icon"></i></label>
        <input type="checkbox" role="switch" id="ms1"/>
        `
        template = mounted ? template : ""

        //INNER HTML
        this.innerHTML = template;
        this.checkbox = this.querySelector("input");
        this.checkbox.checked = isDarkMode;

    }
    connectedCallback() {
        if (this.hasAttribute("checked")) this.checkbox.checked = true;
        changeIcon(this)

        this.checkbox.addEventListener("change", () => {
            this.toggleAttribute("checked", this.checkbox.checked);
            setLS("dark-mode", this.checkbox.checked)
            changeIcon(this)
        });

        function changeIcon(thisElm) {
            let iconElement = thisElm.parentNode.querySelector(".dark-mode__toggle-icon");
            let isDarkMode = getLS("dark-mode")
            let iconSource = isDarkMode ? "far fa-moon" : "far fa-sun";
            iconElement.className = `dark-mode__toggle-icon ${iconSource}`
        }
    }
})


