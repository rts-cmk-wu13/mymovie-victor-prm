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
        }).ihtml(this._headerTitle)
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
                'image-title': this._movieTitle,
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
        }).ihtml(this._movieTitle + this._originalTitle)

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
            'class': `${this.className}__link genre-${_genre}`
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
        this._movieTitle = this.getAttribute("image-title");
        this._shadowSrc = this._imgSource.replace("/w500/", "/w200");

        //TEMPLATE(S)
        let wrapper = initElement("div", {
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
customElements.define("card-list", class CardList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        //HTML ATTRIBUTES
        this.className = "card-list"
        this.role = "region"
        this.render();
        this.createCarouselButtons()
    }

    render() {
        //CUSTOM ATTRIBUTES
        this._sectionTitle = this.getAttribute("section-title")
        this._direction = checkLayoutDirection(this)
        this._containerID = setMovieListID(this.id);
        this._includeButton = this.hasAttribute("button")

        this.ariaLabel = `Category ${this._sectionTitle}`//Setting this here because section title is needed

        //TEMPLATE(S)
        let sectionHeader = initElement("section-subheading", {
            'header-title': this._sectionTitle,
        })
        if (this._includeButton) sectionHeader.setAttribute("button", "")
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

        let buttonBack = initElement("button").ihtml(`<i class="fas fa-chevron-left"></i>`);
        buttonBack.addEventListener("click", () => {
            document.querySelector(`#${this._containerID}`).scrollLeft -= 200;
        })

        let buttonNext = initElement("button").ihtml(`<i class="fas fa-chevron-right"></i>`);
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
        }).ihtml(this._movieRating);

        let scale = initElement("span", {
            'class': `${this.className}__scale`
        }).ihtml("/ 10 IMDb");

        let voteCount = initElement("span", {
            'class': `${this.className}__vote-count`
        }).ihtml(`${this._voteCount} <i class='fas fa-user'></i>`)

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
            let heading = initElement("h2", {
                'class': `${this.className}__title`
            }).ihtml(this._headingTitle)
            hGroup.append(heading)
            if (window.location.pathname.includes("discover")) heading.classList.add(`${this.className}__title--discover`)

            if (this._includeButton) {
                let button = initElement("button", {
                    'class': `${this.className}__see-more-btn`
                }).ihtml("See more")
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
        this.updateIcon();
        document.documentElement.setAttribute("data-darkmode", this._isDarkMode);
    }


    render() {
        //CUSTOM ATTRIBUTES
        this._toggleID = "dark-mode-input";
        this._userPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let evaluateDarkMode = getLS("dark-mode")
        this._isDarkMode = evaluateDarkMode == null ? this._userPreference : evaluateDarkMode
        console.log("isDarkMode",this._isDarkMode)

        //TEMPLATE
        let toggleLabel = initElement("label", {
            'for': "dark-mode-input",
            'aria-label': "Dark mode",
        })
        let toggleIcon = initElement("i", {
            'class': `${this.className}__icon`
        })
        toggleLabel.append(toggleIcon)

        let toggleInput = initElement("input", {
            'type': "checkbox",
            'role': "switch",
            'id': this._toggleID
        })

        toggleInput.addEventListener("change", () => {
            this.toggleAttribute("checked", toggleInput.checked);
            setLS("dark-mode", toggleInput.checked)
            document.documentElement.setAttribute("data-darkmode", toggleInput.checked);
            this.updateIcon()
        });


        //Used for updating icon
        this.iconElm = toggleIcon;
        toggleInput.checked = this._isDarkMode;

        //APPEND
        this.append(toggleLabel, toggleInput)
    }
    updateIcon() {
        let isDarkMode = getLS("dark-mode")
        let iconSource = isDarkMode ? "far fa-moon" : "far fa-sun";
        this.iconElm.className = `${this.iconElm.className}__icon ${iconSource}`
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

        //TEMPLATE
        let homeNav = initElement("a", {
            'class': `${this.className}__nav-link`,
            'href': "/index.html",
            'aria-label': "navigate to home",
        }).ihtml(`<i class="fas fa-film ${this.className}__home-link"></i>`)

        let nowPlayingNav = initElement("a", {
            'class': `${this.className}__nav-link`,
            'href': "/nowplaying.html",
            'aria-label': "navigate to now playing",
        }).ihtml(`<i class="fa fa-ticket ${this.className}__now-playing-link"></i>`)

        let favoritesNav = initElement("a", {
            'class': `${this.className}__nav-link`,
            'href': "/favorites.html",
            'aria-label': "navigate to favorites",
        }).ihtml(`<i class="fas fa-heart ${this.className}__favorites-link"></i>`)

        //APPEND
        this.append(homeNav, nowPlayingNav, favoritesNav)
    }

    handleCurrentPage() {
        let links = this.querySelectorAll("a");
        let location = window.location.pathname;
        links.forEach(link => {
            let linkRef = link.getAttribute("href");
            if (linkRef === location) {
                console.log(linkRef)
                link.classList.add("nav-current-location")
            } else {
                link.classList.remove("nav-current-location")
            }
        })
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
        this._imageTitle = this.getAttribute("image-title");
        this._imgPath = this.getAttribute("image-path");
        this._imgSource = `${imageBasePath}original${this._imgPath}`;
        this._trailerSource = this.getAttribute("trailer-link");
        console.log(this._trailerSource)

        //TEMPLATE(S)
        let backdropContainer = initElement("div", {
            'class': `${this.className}__backdrop-container`
        })
        let backdrop = initElement("img", {
            'src': this._imgSource,
            'alt': `Backdrop image for ${this._imageTitle}`,
            'class': `${this.className}__backdrop-img`
        })
        backdropContainer.append(backdrop)

        if (this._trailerSource) {
            let playButtonContainer = initElement("div", {
                'class': `${this.className}__play-button-container`
            })

            let playVideoButton = initElement("button", {
                'class': `${this.className}__play-button`,
                'popovertarget': "trailer-modal"
            }).ihtml(`<i class="fas fa-play"></i>`)

            let playButtonText = initElement("p", {
                'class': `${this.className}__play-button-text`,
            }).ihtml("Play Trailer")

            let videoModal = initElement("div", {
                'class': `${this.className}__trailer-modal`,
                'id': "trailer-modal",
                'popover': ""
            })
            let closeVideoContainer = initElement("div", {
                'class': `${this.className}__close-button-container`,
            })
            let closeVideoButton = initElement("button", {
                'class': `${this.className}__close-button`,
            }).ihtml(`Close video <i class="fa fa-close"></i>`)

            closeVideoContainer.append(closeVideoButton)

            let videoParams = `autoplay=1;iv_load_policy=3`
            let video = initElement("iframe", {
                'class': `${this.className}__video`,
                'src': "",
                'title': "YouTube video player",
                'allow': "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                'referrerpolicy': "strict-origin-when-cross-origin",
                'allowfullscreen': ""
            })

            //Hacky way of start/stop the video is to set and reset the video's src attribute
            playVideoButton.addEventListener("click", () => {
                video.src = `https://www.youtube-nocookie.com/embed/${this._trailerSource}?si=bOnthSOlKCEOTKBr&amp;${videoParams}`;
                bodyElm.style.overflow = "hidden"
            })

            closeVideoButton.addEventListener("click", () => {
                videoModal.hidePopover();
                video.src = ""
                bodyElm.style.overflow = "auto"
            })

            videoModal.append(closeVideoContainer, video)
            playButtonContainer.append(playVideoButton, playButtonText, videoModal)

            backdropContainer.append(playButtonContainer)
        }

        this.append(backdropContainer)
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
        let itemContentContainer = initElement("div", {
            'class': `${this.className}__meta-item`
        }).ihtml(`<p class="${this.className}__meta-item-title">${_key}</p>
                  <p class="${this.className}__meta-item-value">${_value}</p>`)

        item.append(itemContentContainer)
        return item
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
    }

    render() {
        //CUSTOM ATTRIBUTES
        this._imgPath = this._dataObject.backdrop_path;
        this._movieRating = this._dataObject.vote_average
        this._voteCount = this._dataObject.vote_count;
        this._description = this._dataObject.overview
        this._movieTitle = this._dataObject.title
        this._originalTitle = checkOriginalTitle(this._dataObject);
        this._movieTagline = this._dataObject.tagline;
        this._metaArray = this.createMetaArray();
        this._castArray = this._dataObject.credits.cast
        this._castListID = "items-cast-members";

        //Find Trailer
        this._trailer = this._dataObject.videos.results.filter(video => (video.type === "Trailer" && video.site === "YouTube"))[0].key;
        console.log(this._trailer)

        //Format Genres
        this._genres = this._dataObject.genres
        this._genres = JSON.stringify(this._genres.map(genre => genre.id))
        //genres = genres.replaceAll('"',"&quot;") //Ugly but works


        //TEMPLATE(S)
        let backdrop = initElement("detail-backdrop", {
            'image-path': this._imgPath,
            'image-title': this._movieTitle,
            'trailer-link': this._trailer
        })
        let contentContainer = initElement("div", {
            'class': `${this.className}__content-container`
        })
        contentContainer.append(this.createHeading(), this.createMetaInfo(), this.createDescription(), this.createCastList())
        this.append(backdrop, contentContainer)
        this.fillCastList();
    }


    createHeading() {
        let hGroup = initElement("hgroup")
        let movieTitle = initElement("h1", {
            'class': `${this.className}__movie-title`
        }).ihtml(this._movieTitle + this._originalTitle)

        let tagline = initElement("p", {
            'class': `${this.className}__movie-tagline`
        }).ihtml(this._movieTagline)

        hGroup.append(movieTitle, tagline)
        return hGroup;
    }

    createMetaInfo() {
        let metaInfoContainer = initElement("div", {
            'class': `${this.className}__meta-information`
        })
        let movieRating = initElement("movie-rating", {
            'parent-class': this.className,
            'movie-rating': this._movieRating,
            'vote-count': this._voteCount
        })
        let genreTags = initElement("genre-tags", {
            'genres': this._genres,
        })
        let detailMetaList = initElement("detail-meta-list", {
            'meta-items': this._metaArray
        })
        metaInfoContainer.append(movieRating, genreTags, detailMetaList)
        return metaInfoContainer
    }

    createDescription() {
        let descriptionSection = initElement("section", {
            'class': `${this.className}__movie-description-section`
        })
        let subheading = initElement("section-subheading", {
            'header-title': "Description",
        })
        let descriptionText = initElement("p", {
            'class': `${this.className}__movie-description-text`
        }).ihtml(this._description)

        descriptionSection.append(subheading, descriptionText)
        return descriptionSection;
    }

    createCastList() {
        let castList = initElement("card-list", {
            'class': `${this.className}__cast-list`,
            'id': this._castListID,
            'section-title': "Cast",
            'horizontal': ""
        })
        return castList;
    }

    fillCastList() {
        this._castArray.map(crew => {
            this.querySelector(`#${getMovieListID(this._castListID)}`).appendChild(this.createCastCard(crew));
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

        let actorImage = initElement("clickable-image", {
            'image-path': imgPath,
            'image-title': _crew.name,
            'link-ref': actorLink
        })

        let actorName = initElement("h3", {
            'class': `${this.className}__cast-name`
        }).ihtml(crewName)

        let actorRole = initElement("p", {
            'class': `${this.className}__cast-role`
        }).ihtml(`<span class="${this.className}__cast-as">as </span>${_crew.character}`)

        castListItem.append(actorImage, actorName, actorRole)

        return castListItem;
    }

    createMetaArray() {
        //Runtime
        let runtime = convertMinsToHrsMins(this._dataObject.runtime)

        //Language
        let language = this._dataObject.original_language.toUpperCase()

        //Rating
        let ratings = this._dataObject.release_dates.results.filter(country => (country["iso_3166_1"] === "US"));
        let MPA_Rating = ratings[0] ? ratings[0].release_dates.find(item => item.certification.trim().length > 0)?.certification : "N/A";

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
            }])
        //.replaceAll('"', "&quot;")
    }
})
