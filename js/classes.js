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
        this._backLink = this.hasAttribute("back");
        this._headerTitle = this.getAttribute("header-title");
        this._toggleSwitch = this.hasAttribute("toggle");
        if (window.location.pathname == "/details.html") this.classList.add(`${this.className}--details`)

        //TEMPLATE(S)
        if (this._backLink) this.createBackLink();
        if (this._headerTitle) this.createHeaderTitle();
        if (this._toggleSwitch) this.createToggleSwitch();
    }

    createBackLink() {
        let backLink = initElement("a", {
            'href': "index.html",
            'aria-label': "back to home",
        })
        let backLinkIcon = initElement("i", {
            'class': `fas fa-arrow-left ${this.className}__back-button`,
        })
        backLink.append(backLinkIcon)
        this.append(backLink)
    }

    createHeaderTitle() {
        let headerTitle = initElement("h1", {
            'class': `${this.className}__header-title`,
        })
        headerTitle.innerHTML = this._headerTitle;
        this.append(headerTitle)
    }

    createToggleSwitch() {
        let toggleSwitch = initElement("dark-mode-toggle")
        this.append(toggleSwitch)
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
        this._imgPath = this._dataObject.poster_path;
        this._movieTitle = this._dataObject.title
        this._movieRating = this._dataObject.vote_average
        this._voteCount = this._dataObject.vote_count;
        this._genres = JSON.stringify(this._dataObject.genre_ids);
        this._originalTitle = checkOriginalTitle(this._dataObject);
        this._movieID = this._dataObject.id;

        //Only include extra info on cards with horizontal layout
        this._includeExtraInfo = this.hasAttribute("horizontal");

        //TEMPLATE(S)
        if (this._imgPath) {
            //Clickable Image
            let clickableImage = initElement("clickable-image", {
                'image-path': this._imgPath,
                'movie-title': this._movieTitle,
                'link-ref': `details.html?id=${this._movieID}`,
            })
            this.append(clickableImage)
            this.append(this.createInfoContainer())
        }

    }

    createInfoContainer() {
        //Info Container
        let infoContainer = initElement("div", {
            'class': `${this.className}__info-container`,
        })

        let movieTitle = initElement("h3", {
            'class': `${this.className}__movie-title`,
        })
        movieTitle.innerHTML = this._movieTitle + this._originalTitle;

        let movieRating = initElement("movie-rating", {
            'parent-class': this.className,
            'movie-rating': this._movieRating,
            'vote-count': this._voteCount,
        })
        infoContainer.append(movieTitle, movieRating);

        //Extra Info
        if (this._includeExtraInfo) {
            let genreTags = initElement("genre-tags", {
                'genres': this._genres,
            })
            infoContainer.append(genreTags, this.createRuntime());
        }
        //Append
        return infoContainer;
    }

    createRuntime() {
        let runtime = initElement("span", {
            'class': `${this.className}__runtime`
        })
        runtime.append(
            initElement("i", {
                'class': `${this.className}__runtime-icon far fa-clock`
            }),
            initElement("p", {
                'class': `${this.className}__runtime-length`
            })
        )
        return runtime;
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
        this._genreItems = JSON.parse(this.getAttribute("genres"))

        //TEMPLATE
        let list = initElement("ul", {
            'class': `${this.className}__list`,
        })
        this._genreItems.map(genre => {
            list.append(this.createListItem(genre, this.className))
        })
        this.append(list)
    }

    createListItem(_genre) {
        let link = `discover.html?&sort_by=popularity.desc&with_genres=${_genre}&dTopic=${_genre}`
        let item = initElement("li", {
            'class': `${this.className}__item`
        })
        item.append(initElement("a", {
            'href': link,
            'aria-label': "navigate to category",
            'class': `genre-${_genre}`
        }))
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
        this._imgPath = this.getAttribute("image-path");
        this._linkRef = this.getAttribute("link-ref");
        this._fallBackImageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019";
        this._imgSource = this._imgPath === "null" ? this._fallBackImageSrc : `${imageBasePath}${devOrProd("w300", "w500")}${this._imgPath}`
        this._movieTitle = this.getAttribute("movie-title");
        this._shadowSrc = this._imgSource.replace("/w500/", "/w200");

        //TEMPLATE(S)
        let wrapper = initElement("figure", {
            'class': `${this.className}__wrapper`
        })

        wrapper.append(this.createShadow(), this.createImage())
        this.append(wrapper)
    }

    createShadow() {
        let shadowWrapper = initElement("div", {
            'class': `${this.className}__shadow-wrapper`
        })
        shadowWrapper.append(initElement("img", {
            'class': `${this.className}__shadow`,
            'src': this._shadowSrc,
            'alt': "shadow for movie poster"
        }))
        return shadowWrapper
    }
    createImage() {
        let imageLink = initElement("a", {
            'href': this._linkRef,
            'aria-label': `navigate to ${this._movieTitle} page`
        })
        imageLink.append(initElement("img", {
            'src': this._imgSource,
            'alt': `Poster for movie ${this._movieTitle}`
        }))
        return imageLink
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
        this.createCarouselButtons()
    }

    render() {
        //CUSTOM ATTRIBUTES
        this._sectionTitle = this.getAttribute("section-title")
        this._direction = checkLayoutDirection(this)
        this._containerID = setMovieListID(this.id);
        console.log(this._containerID)
        this.ariaLabel = `Category ${this._sectionTitle}`//Setting this here because section title is needed

        //TEMPLATE(S)
        let sectionHeader = initElement("section-subheading", {
            'header-title': this._sectionTitle,
            'button': ""
        })
        let cardList = initElement("ul", {
            'id': `${this._containerID}`,
            'class': `${this.className}__items-container`,
            [`${this._direction}`]: ""
        })

        this.append(sectionHeader, cardList)
    }


    createCarouselButtons() {
        if (this._direction != "horizontal") return "";
        let buttonContainer = initElement("div", {
            'class': `${this.className}__buttons-container`
        })

        let buttonBack = initElement("button")
        buttonBack.innerHTML = `<i class="fas fa-chevron-left"></i>`
        buttonBack.addEventListener("click", () => {
            document.querySelector(`#${this._containerID}`).scrollLeft -= 200;
        })

        let buttonNext = initElement("button")
        buttonNext.innerHTML = `<i class="fas fa-chevron-right"></i>`
        buttonNext.addEventListener("click", () => {
            document.querySelector(`#${this._containerID}`).scrollLeft += 200;
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
        this._movieRating = Number(this.getAttribute("movie-rating")).toFixed(1);
        this._voteCount = this.getAttribute("vote-count")
        if (this._voteCount > 1000) this._voteCount = (this._voteCount / 1000).toFixed(1) + "k"

        //TEMPLATE(S)
        let rating = initElement("p", {
            'class': `${this.className}__rating`
        })

        //Rating Content
        let starIcon = initElement("i", {
            'class': `fa fa-star ${this.className}__star-icon`
        })

        let score = initElement("em", {
            'class': `${this.className}__rating-score`
        })
        score.innerHTML = this._movieRating;

        let scale = initElement("span", {
            'class': `${this.className}__scale`
        })
        scale.innerHTML = "/ 10 IMDb"

        let voteCount = initElement("span", {
            'class': `${this.className}__vote-count`
        })
        voteCount.innerHTML = `${this._voteCount} <i class='fas fa-user'></i>`

        rating.append(starIcon, score, scale, voteCount)
        this.append(rating)
    }
})

//SECTION SUBHEADING
customElements.define("section-subheading", class Sectionsubheading extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = "section-subheading"
        this.role = "group"
        this.render();
    }

    render() {
        this._includeButton = this.hasAttribute("button") ? `<button class="${this.className}__see-more-btn">See more</button>` : ""
        //CUSTOM ATTRIBUTES
        this._headingTitle = this.getAttribute("header-title");
        this.ariaLabel = `${this._headingTitle} header group` //Setting this here because section title is needed


        if (this._headingTitle) {
            let hGroup = initElement("hgroup", {

            })
            let heading = initElement("h2",{
                'class': `${this.className}__title`
            })
            heading.innerHTML = this._headingTitle
            hGroup.append(heading)

            if(this._includeButton){
                let button = initElement("button", {
                    'class': `${this.className}__see-more-btn`
                })
                button.innerHTML = "See more";
                hGroup.append(button)
            }
            this.append(hGroup)
        }
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
                <section-subheading header-title="Description"></section-subheading>
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
