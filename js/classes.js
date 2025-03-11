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
        if (window.location.pathname == "/details.html") this.classList.add(`${this.className}--details`)

        //TEMPLATE(S)
        backButton = backButton ? `<button aria-label="back to home" onclick="window.location = 'index.html'"><i class="fas fa-arrow-left ${this.className}__back-button"></i></button>` : ""
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
        this.id = `movie-card--${this._dataObject.id}`
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let imgPath = this._dataObject.poster_path;
        let movieTitle = this._dataObject.title
        let movieRating = this._dataObject.vote_average
        let voteCount = this._dataObject.vote_count;
        let genres = JSON.stringify(this._dataObject.genre_ids);
        let originalTitle = checkOriginalTitle(this._dataObject);
        let movieID = this._dataObject.id;

        //Only include extra info on cards with horizontal layout
        let includeExtraInfo = this.hasAttribute("horizontal") ? "mounted" : ""

        //TEMPLATE(S)
        let template = `
         <clickable-image image-path="${imgPath}" movie-title="${movieTitle}" link-ref="details.html?id=${movieID}"></clickable-image>
         <div class="${this.className}__info-container">
             <h3 class="${this.className}__movie-title">${movieTitle}${originalTitle}</h3>
            <movie-rating parent-class="${this.className}" movie-rating="${movieRating}" vote-count="${voteCount}"></movie-rating>
            <genre-tags genres="${genres}" ${includeExtraInfo}></genre-tags>
            ${this.createRuntime(includeExtraInfo)}
        </div>
         `
        template = imgPath ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
    createRuntime(bool) {
        if (!bool) return "";
        return ` 
        <span class="${this.className}__runtime">
            <i class="${this.className}__runtime-icon far fa-clock"></i>
            <p class="${this.className}__runtime-length"></p>
        </span>`
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
        this.mounted = this.hasAttribute("mounted")
        if (!this.mounted) {
            this.remove()
            return
        }
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES    
        this.genreItems = JSON.parse(this.getAttribute("genres"))
        //console.log(this.genreItems)

        //TEMPLATE
        let list = initElement("ul", {
            'class': `${this.className}__list`,
        })
        this.genreItems.map(genre => {
            list.append(this.createListItem(genre, this.className))
        })
        this.append(list)
    }

    createListItem(_genre) {
        let link = `discover.html?&sort_by=popularity.desc&with_genres=${_genre}&dTopic=${_genre}`
        let item = initElement("li", {
            'class': `${this.className}__item`
        })

        item.innerHTML = `<a href="${link}" aria-label="navigate to category" class="genre-${_genre}"></a>`;
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
        let imgPath = this.getAttribute("image-path");
        let linkRef =  this.getAttribute("link-ref");
        let imgSource = imgPath == "null" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019" : `${imageBasePath}${devOrProd("w300", "w500")}${imgPath}` 
        let movieTitle = this.getAttribute("movie-title");
        //let movieID = this.getAttribute("movie-id");
        let backlightSrc = imgSource.replace("/w500/", "/w200");

        //TEMPLATE(S)
        let template = `    
        <div class= "${this.className}__wrapper">
            <div class= "${this.className}__backlight-wrapper">
                <img class="${this.className}-card__backlight" src="${backlightSrc}" alt="">
            </div>
            <a href="${linkRef}" aria-label="navigate to ${movieTitle} page"><img src="${imgSource}" alt=""></a>
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
        this.createCarouselButtons(this.containerAttribute, this.className, this.containerID)
    }

    render() {
        //CUSTOM ATTRIBUTES
        let sectionTitle = this.getAttribute("section-title")
        this.containerAttribute = checkLayoutDirection(this)
        this.containerID = setMovieListID(this.id);
        this.ariaLabel = `Category ${sectionTitle}`//Setting this here because section title is needed

        //TEMPLATE(S)
        let template = `
        <section-subheader header-title="${sectionTitle}" button="true"></section-subheader>
        <ul id="${this.containerID}" class="${this.className}__items-container" ${this.containerAttribute}></ul>

        `

        //INNER HTML
        this.innerHTML = template;
    }
    createCarouselButtons(direction, parentClass, scrollContainerID) {
        if (direction != "horizontal") return "";
        let buttonContainer = initElement("div", {
            'class': `${parentClass}__buttons-container`
        })

        let buttonBack = initElement("button")
        buttonBack.innerHTML = `<i class="fas fa-chevron-left"></i>`
        buttonBack.addEventListener("click", () => {
            document.querySelector(`#${scrollContainerID}`).scrollLeft -= 150;
        })

        let buttonNext = initElement("button")
        buttonNext.innerHTML = `<i class="fas fa-chevron-right"></i>`
        buttonNext.addEventListener("click", () => {
            document.querySelector(`#${scrollContainerID}`).scrollLeft += 150;
        })

        buttonContainer.append(buttonBack, buttonNext)
        this.append(buttonContainer)
    }
})

//MOVIE RATING
customElements.define("movie-rating", class MovieRating extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = "movie-rating"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        let headerTitle = this.getAttribute("header-title");
        let movieRating = Number(this.getAttribute("movie-rating")).toFixed(1);
        let voteCount = this.getAttribute("vote-count")
        if (voteCount > 1000) voteCount = (voteCount / 1000).toFixed(1) + "k"
        this.ariaLabel = `${headerTitle} header group` //Setting this here because section title is needed

        //TEMPLATE(S)
        let template = `
            <p class="${this.className}__rating">
                 <i class="fa fa-star ${this.className}__star-icon"></i>
                 <em class="${this.className}__rating-score">${movieRating}</em>/
                 <span class="${this.className}__scale">10 IMDb</span>
                 <span class="${this.className}__vote-count">${voteCount}</span><i class="fas fa-user"></i>
             </p>
        `

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
        let includeButton = this.hasAttribute("button") ? `<button class="${this.className}__see-more-btn">See more</button>` : ""
        //CUSTOM ATTRIBUTES
        let headerTitle = this.getAttribute("header-title");
        this.ariaLabel = `${headerTitle} header group` //Setting this here because section title is needed

        //TEMPLATE(S)
        let template = `
        <h2 class="${this.className}__title">${headerTitle}</h2>
        ${includeButton}
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

//DETAIL CARD
customElements.define("detail-card", class DetailCard extends HTMLElement {
    constructor() {
        super();
        this._dataObject = {};
    }

    set dataObject(value) {
        this._dataObject = value;
    }


    connectedCallback() {
        this.className = "detail-card"
        this.render();
        this.createCastList(this._dataObject.credits.cast);
    }

    render() {
        //CUSTOM ATTRIBUTES
        //let headerTitle = this.getAttribute("header-title");
        //this.ariaLabel = `${headerTitle} header group` //Setting this here because section title is needed
        let imgPath = this._dataObject.backdrop_path;
        let movieRating = this._dataObject.vote_average
        let voteCount = this._dataObject.vote_count;
        let genres = this._dataObject.genres
        let description = this._dataObject.overview

        //Format Genres
        genres = JSON.stringify(genres.map(genre => genre.id))
        //genres = genres.replaceAll('"',"&quot;") //Ugly but works

        let movieTitle = this._dataObject.title
        let originalTitle = checkOriginalTitle(this._dataObject);
        let movieTagline = this._dataObject.tagline;
        let metaArray = this.createMetaArray();
        //console.log(metaArray)

        //TEMPLATE(S)
        let template = `
        <detail-backdrop image-path="${imgPath}"></detail-backdrop>
        <div class="${this.className}__content-container">
            <hgroup>
                <h1 class="${this.className}__movie-title">${movieTitle}${originalTitle}</h1>
                <p class="${this.className}__movie-tagline">${movieTagline}</p>
            </hgroup>
            <div class="${this.className}__meta-information">
                <movie-rating parent-class="${this.className}" movie-rating="${movieRating}" vote-count="${voteCount}"></movie-rating>
                <genre-tags genres="${genres}" mounted></genre-tags>
                <detail-meta-list meta-items="${metaArray}"></detail-meta-list>
            </div>
            <section class="${this.className}__movie-description-section">
                <section-subheader header-title="Description"></section-subheader>
                <p class="${this.className}__movie-description-text">${description}</p> 
            </section>
            <movie-list class="${this.className}__cast-list" id="items-cast-members" section-title="Cast" horizontal></movie-list>
        </div>
        `

        //INNER HTML
        this.innerHTML = template;
    }

    createCastList(_castArray) {
        let castListElm = document.querySelector(`#${getMovieListID("items-cast-members")}`)
        _castArray.map(crew => {
            castListElm.append(this.createCastCard(crew));
            //console.log(this.createCastCard(crew))
        })
    }

    createCastCard(_crew) {
        let imgPath = `${_crew.profile_path}`
        let crewName = _crew.name
        let crewID = _crew.id;
        let castListItem = initElement("li", {
            'class': `${this.className}__cast-item`
        })
        let actorLink = `discover.html?language=en-US&sort_by=release_date.asce&page=1&with_cast=${crewID}&dTopic=${crewName}`

        castListItem.innerHTML = `
            <clickable-image image-path="${imgPath}" movie-title="${_crew.name}" link-ref="${actorLink}"></clickable-image>
            <h3 class="${this.className}__cast-name">${crewName}</h3>
            <p class="${this.className}__cast-role"><span class="${this.className}__cast-as">as </span>${_crew.character}</p>
           
        `
        return castListItem;
    }

    createMetaArray() {
        //Runtime
        let runtime = convertMinsToHrsMins(this._dataObject.runtime)

        //Language
        let language = this._dataObject.original_language.toUpperCase()

        //Rating
        let ratings = this._dataObject.release_dates.results.filter(country => (country["iso_3166_1"] === "US"))
        let MPA_Rating = ratings[0].release_dates.find(item => item.certification.trim().length > 0)?.certification || "N/A";

        return JSON.stringify([
            {
                'title': "Length",
                'value': runtime,
            },
            {
                'title': "Language",
                'value': language,
            },
            {
                'title': "Rating",
                'value': MPA_Rating,
            }]).replaceAll('"', "&quot;")
    }
})

//DETAIL BACKDROP
customElements.define("detail-backdrop", class DetailBackdrop extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = "detail-backdrop"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES
        //let headerTitle = this.getAttribute("header-title");
        //this.ariaLabel = `${headerTitle} header group` //Setting this here because section title is needed
        let imgPath = this.getAttribute("image-path");
        let imgSource = `${imageBasePath}original${imgPath}`;


        //TEMPLATE(S)
        let template = `
        <div class="${this.className}__backdrop-container">
            <img src="${imgSource}" alt="" class="${this.className}__backdrop-img">
        </div>
        `

        //INNER HTML
        this.innerHTML = template;
    }
})

//DETAIL META LIST
customElements.define("detail-meta-list", class DetailMetaList extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "detail-meta-list"
        this.render();
    }

    render() {
        //CUSTOM ATTRIBUTES    
        this.metaItems = JSON.parse(this.getAttribute("meta-items"))
        //console.log(this.metaItems)

        //TEMPLATE
        let list = initElement("ul", {
            'class': `${this.className}__list`,
        })
        this.metaItems.map(item => {
            list.append(this.createListItem(item.title, item.value))
        })
        this.append(list)
    }

    createListItem(_key, _value) {
        let item = initElement("li", {
            'class': `${this.className}__item`
        })

        item.innerHTML = `
        <div class="${this.className}__meta-item">
            <p class="${this.className}__meta-item-title">${_key}</p>
            <p class="${this.className}__meta-item-value">${_value}</p>
        </div>`
        return item
    }
})
