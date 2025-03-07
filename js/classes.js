//SITE HEADER
customElements.define("site-header", class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "site-header"
        this.ariaLabel = "header";
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let backButton = this.hasAttribute("back");
        let headerTitle = this.getAttribute("header-title");
        let toggleSwitch = this.hasAttribute("toggle");

        //TEMPLATE(S)
        backButton = backButton ? `<button aria-label="back to home"><i class="fas fa-arrow-left ${this.className}__back-button"></i></button>` : ""
        headerTitle = headerTitle ? `<h1>${headerTitle}</h1>` : ""
        toggleSwitch = toggleSwitch ? `<dark-mode-toggle></dark-mode-toggle>` : ""

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
        this._dataObject = {};
    }

    set dataObject(value) {
        this._dataObject = value;
    }

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "movie-card"
        this.ariaLabel = "Movie Card"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let imgSource = `https://image.tmdb.org/t/p/${devOrProd("w500", "original")}/${this._dataObject.poster_path}`;
        let movieTitle = this._dataObject.original_title
        let movieRating = this._dataObject.vote_average.toFixed(1);
        let voteCount = (this._dataObject.vote_count / 1000).toFixed(1);
        let genres = JSON.stringify(this._dataObject.genre_ids)

        //TEMPLATE(S)
        let template = `
         <clickable-image image-src="${imgSource}" movie-title="${movieTitle}"></clickable-image>
         <div class="${this.className}__info-container">
             <h3 class="${this.className}__movie-title">${movieTitle}</h3>
             <p class="${this.className}__rating">
                 <i class="fa fa-star ${this.className}__star-icon"></i>
                 <em class="${this.className}__rating-score">${movieRating}</em>/
                 <span>10 IMDb</span>
                 <span class="${this.className}__vote-count">${voteCount}k</span><i class="fas fa-user"></i>
             </p>
             <genre-tags genres="${genres}"></genre-tags>
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

    }

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "genre-tags"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES    
        this.genreItems = JSON.parse(this.getAttribute("genres"))
        console.log(this.genreItems)

        //TEMPLATE
        let list = initElement("ul", {
            'class': `${this.className}__list`,
        })
        this.genreItems.map(genre => list.append(this.createListItem(genre, this.className)))
        this.append(list)
    }

    createListItem(_genre, _className) {
        let item = initElement("li", {
            'class' : `${_className}__item`
        })
        item.innerHTML = `<a href="#" aria-label="navigate to category page for ..." class="${_genre}"></a>`;
        return item
    }
})

//CLICKABLE IMAGE
customElements.define("clickable-image", class ClickableImage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "clickable-image"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let imgSource = this.getAttribute("image-src");
        let movieTitle = this.getAttribute("movie-title");
        let backlightSrc = imgSource.replace("/w500/", "/w200");

        //TEMPLATE(S)
        let template = `    
        <div class= "${this.className}__wrapper">
            <div class= "${this.className}__backlight-wrapper">
                <img class="${this.className}-card__backlight" src="${backlightSrc}" alt="">
            </div>
            <a href="#" aria-label="navigate to ${movieTitle} page"><img src="${imgSource}" alt=""></a>
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

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "movie-list"
        this.role = "region"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let sectionTitle = this.getAttribute("section-title")
        let containerAttribute = checkLayoutDirection(this)
        let containerID = setMovieListID(this.id);
        this.ariaLabel = `Category ${sectionTitle}`//Setting this here because section title is needed

        //TEMPLATE(S)
        let template = `
        <section-subheader header-title="${sectionTitle}" button="true"></section-subheader>
        <ul id="${containerID}" class="${this.className}__items-container" ${containerAttribute}></ul>
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
    }

    connectedCallback() {
        this.className = "section-subheader"
        this.role = "group"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let headerTitle = this.getAttribute("header-title");
        this.ariaLabel = `${headerTitle} header group` //Setting this here because section title is needed

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

    }
    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "dark-mode-toggle"
        this.render();
        this.handleToggle();
    }


    render() {
        //CUSTOM ATTRIBUTES
        let isDarkMode = getLS("dark-mode")

        //TEMPLATE(S)
        let template = `
        <label for="ms1" aria-label="Dark mode"><i class="${this.className}__icon"></i></label>
        <input type="checkbox" role="switch" id="ms1"/>
        `

        //INNER HTML
        this.innerHTML = template;
        this.checkbox = this.querySelector("input");
        this.checkbox.checked = isDarkMode;
    }
    handleToggle() {
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

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "nav-footer"
        this.ariaLabel = "navigation footer"

        this.render();
        this.handleCurrentPage();
    }

    render() {
        //CUSTOM ATTRIBUTES
        /* let current = this.getAttribute("current"); */

        //TEMPLATE(S)
        let homeButton = `<a href="/" aria-label="navigate to home"><i class="fas fa-film ${this.className}__home-link"></i></a>`
        let nowPlayingButton = `<a href="/nowplaying.html" aria-label="navigate to now playing"><i class="fa fa-ticket ${this.className}__now-playing-link"></i></a>`
        let favoritesButton = `<a href="/favorites.html" aria-label="navigate to favorites"><i class="fas fa-heart ${this.className}__favorites-link"></i></a>`

        //INNER HTML
        this.innerHTML = `
        ${homeButton}
        ${nowPlayingButton}
        ${favoritesButton}
        `
    }

    handleCurrentPage() {
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


