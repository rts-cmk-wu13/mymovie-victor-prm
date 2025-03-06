//SITE HEADER
customElements.define("site-header", class SiteHeader extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        let backButton = this.hasAttribute("back");
        let headerTitle = this.getAttribute("header-title");
        let toggleSwitch = this.hasAttribute("toggle");
        this.className = "site-header";
        this.ariaLabel = "header";
   

        //TEMPLATES(S)
        backButton = backButton ? `<button><i class="fas fa-arrow-left ${this.className}__back-button"></i></button>` : ""
        headerTitle = headerTitle ? `<h1>${headerTitle}</h1>` : ""
        toggleSwitch = toggleSwitch ? `<dark-mode-toggle mounted></dark-mode-toggle>` : ""

        //INNER HTML
        this.innerHTML = `
        ${backButton}
        ${headerTitle}
        ${toggleSwitch}
        `
    }

})

//MOVIE CARD
customElements.define("movie-card", class MovieCard extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        let imgSource = this.getAttribute("image-src");
        let movieTitle = this.getAttribute("movie-title");
        let movieRating = this.getAttribute("rating");
        this.className = "movie-card"
        this.ariaLabel = `Movie Card`
        

        //TEMPLATES(S)
        let template = `
        <clickable-image image-src="${imgSource}" movie-title="${movieTitle}"></clickable-image>
        <div class ="${this.className}__info-container">
            <h3>${movieTitle}</h3>
            <p class="${this.className}__rating"><i class="fa fa-star ${this.className}__star-icon"></i> ${movieRating}/10 IMDb</p>
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
        let movieTitle = this.getAttribute("movie-title");
        let backlightSrc = imgSource.replace("/w500/", "/w200");

        //TEMPLATES(S)
        let template = `    
        <div class= "${this.className}__wrapper">
            <div class= "${this.className}__backlight-wrapper">
                <img class="${this.className}-card__backlight" src="${backlightSrc}" alt="">
            </div>
            <a href="#" aria-label="Go to detail page for movie ${movieTitle}"><img src="${imgSource}" alt=""></a>
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
        let id = this.getAttribute("id");
        let sectionTitle = this.getAttribute("section-title");
        this.className = "movie-list";
        this.role = "region"
        this.ariaLabel = `Movie list for category ${sectionTitle}`
        this.containerAttribute = checkLayoutDirection(this)
        let containerID = setMovieListID(id);

        //TEMPLATES(S)
        let template = `
        <section-subheader header-title="${sectionTitle}" button="true"></section-subheader>
        <ul id="${containerID}" class="${this.className}__items-container" ${this.containerAttribute}></ul>
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
        let headerTitle = this.getAttribute("header-title");
        this.className = "section-subheader"
        this.role = "group"
        this.ariaLabel = `${headerTitle} header group`
    
        //let button = this.getAttribute("button");

        //TEMPLATES(S)
        let template = `
        <h2 class="${this.className}__title">${headerTitle}</h2>
        <button class="${this.className}__see-more-btn">See more</button>
        `
        template = headerTitle ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})


//DARKMODE TOGGLE
customElements.define("dark-mode-toggle", class DarkModeToggle extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        let mounted = this.hasAttribute("mounted");
        this.className = "dark-mode-toggle"
        let isDarkMode = getLS("dark-mode")

        //TEMPLATES(S)
        let template = `
        <label for="ms1" aria-label="Dark mode"><i class="${this.className}__icon"></i></label>
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
            let iconElement = thisElm.parentNode.querySelector(`.${thisElm.className}__icon`);
            let isDarkMode = getLS("dark-mode")
            let iconSource = isDarkMode ? "far fa-moon" : "far fa-sun";
            iconElement.className = `${thisElm.className}__icon ${iconSource}`
        }
    }
})


