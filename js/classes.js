//SITE HEADER
customElements.define("site-header", class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        //PROPERTIES
        let backButton = this.hasAttribute("back");
        let headerTitle = this.getAttribute("header-title");
        let toggleSwitch = this.hasAttribute("toggle");
        let className = this.getAttribute("class");

        //TEMPLATE(S)
        backButton = backButton ? `<button><i class="fas fa-arrow-left ${className}__back-button"></i></button>` : ""
        headerTitle = headerTitle ? `<h1>${headerTitle}</h1>` : ""
        toggleSwitch = toggleSwitch ? `<dark-mode-toggle mounted></dark-mode-toggle>` : ""

        //INNER HTML
        this.innerHTML = `
             ${backButton}
             ${headerTitle}
             ${toggleSwitch}
             `
    }

    connectedCallback() {
        this.render();
    }

})

//MOVIE CARD
customElements.define("movie-card", class MovieCard extends HTMLElement {

    constructor() {
        super();
        this._dataObject = {};
    }

    set dataObject(value) {
        this._dataObject = value;
        //console.log(this._dataObject)
        this.render();
    }

    render() {
        //PROPERTIES
        let imgSource = `https://image.tmdb.org/t/p/${devOrProd("w500", "original")}/${this._dataObject.poster_path}`;
        let movieTitle = this._dataObject.original_title
        let movieRating = this._dataObject.vote_average.toFixed(1);
        let voteCount = (this._dataObject.vote_count / 1000).toFixed(1);
        let className = this.getAttribute("class");
        console.log(className)

        //TEMPLATE(S)
        let template = `
         <clickable-image image-src="${imgSource}" movie-title="${movieTitle}"></clickable-image>
         <div class="${className}__info-container">
             <h3 class="${className}__movie-title">${movieTitle}</h3>
             <p class="${className}__rating">
                 <i class="fa fa-star ${className}__star-icon"></i>
                 <em class="${className}__rating-score">${movieRating}</em>/
                 <span>10 IMDb</span>
                 <span class="${className}__vote-count">${voteCount}k</span><i class="fas fa-user"></i>
             </p>
             <genre-tags genres=""></genre-tags>
         </div>
        
         `
        template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})

//GENRE TAGS
customElements.define("genre-tags", class GenreTags extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        //PROPERTIES    
        this.className = "genre-tags"

        //TEMPLATE(S)
        let template = `    
            <ul class="${this.className}__list">
                
            </ul>
        `

        //INNER HTML
        this.innerHTML = template;
    }

    createListItem(params) {
        return `<li class="${this.className}__item"><a href="#" aria-label="navigate to category page for ...">Horror</a></li>`
    }
})

//CLICKABLE IMAGE
customElements.define("clickable-image", class ClickableImage extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        //PROPERTIES
        this.className = "clickable-image"
        let imgSource = this.getAttribute("image-src");
        let movieTitle = this.getAttribute("movie-title");
        let backlightSrc = imgSource.replace("/w500/", "/w200");

        //TEMPLATE(S)
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
    }

    render() {
        //PROPERTIES
        let id = this.getAttribute("id");
        let sectionTitle = this.getAttribute("section-title");
        this.className = "movie-list";
        this.role = "region"
        this.ariaLabel = `Movie list for category ${sectionTitle}`
        this.containerAttribute = checkLayoutDirection(this)
        let containerID = setMovieListID(id);

        //TEMPLATE(S)
        let template = `
        <section-subheader header-title="${sectionTitle}" button="true"></section-subheader>
        <ul id="${containerID}" class="${this.className}__items-container" ${this.containerAttribute}></ul>
        `
        //template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
    connectedCallback(){
        this.render();
    }
})

//SECTION SUBHEADER
customElements.define("section-subheader", class SectionSubheader extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        //PROPERTIES
        let headerTitle = this.getAttribute("header-title");
        this.className = "section-subheader"
        this.role = "group"
        this.ariaLabel = `${headerTitle} header group`

        //let button = this.getAttribute("button");

        //TEMPLATE(S)
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
        this.render()
    }
    render(){
        //PROPERTIES
        let mounted = this.hasAttribute("mounted");
        this.className = "dark-mode-toggle"
        let isDarkMode = getLS("dark-mode")

        //TEMPLATE(S)
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

//STICKY NAV FOOTER
customElements.define("nav-footer", class NavFooter extends HTMLElement {
    constructor() {
        super();
    }
    render(){
        //PROPERTIES
        /* let current = this.getAttribute("current"); */
        let className = this.getAttribute("class")

        //TEMPLATE(S)
        let homeButton = `<a href="/" aria-label="navigate to home page"><i class="fas fa-film ${className}__home-link"></i></a>`
        let nowPlayingButton = `<a href="/nowplaying.html" aria-label="navigate to now playing page"><i class="fa fa-ticket ${className}__now-playing-link"></i></a>`
        let favoritesButton = `<a href="/favorites.html" aria-label="navigate to favorites page"><i class="fas fa-heart ${className}__favorites-link"></i></a>`

        //INNER HTML
        this.innerHTML = `
        ${homeButton}
        ${nowPlayingButton}
        ${favoritesButton}
        `
    }


    connectedCallback() {
        this.render();

        let links = this.querySelectorAll("a");
        let location = window.location.pathname;
        links.forEach(link => {
            let linkRef = link.getAttribute("href");
            if (linkRef === location) {
                link.classList.add("nav-current-location")
            } else {
                link.classList.remove("nav-current-location")
            }
        })
    }

})


