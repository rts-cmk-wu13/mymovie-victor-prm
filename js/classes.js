//SITE HEADER
customElements.define("site-header", class SiteHeader extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "site-header"
        let backButton = this.getAttribute("back");
        let title = this.getAttribute("item-title");
        let toggle = this.getAttribute("toggle");

        //TEMPLATES(S)
        backButton = backButton ? `<button>Back</button>` : ""
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
customElements.define("now-playing-card", class NowPlayingCard extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "now-playing-card"
        this.setAttribute("role", "article");
        let imgSource = this.getAttribute("image-src");
        let title = this.getAttribute("item-title");
        let rating = this.getAttribute("rating");

        //TEMPLATES(S)
        let template = `
        <clickable-image image-src="${imgSource}" item-title="${title}"></clickable-image>
        <h3>${title}</h3>
        <p class="now-playing-card__rating"><i class="fa fa-star now-playing-card__star-icon"></i> ${rating}/10 IMDb</p>
        `
        template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})

//CLICKABLE IMAGE
customElements.define("clickable-image", class ClickableImage extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "clickable-image"
        let imgSource = this.getAttribute("image-src");
        let title = this.getAttribute("item-title");

        //TEMPLATES(S)
        let template = `    
        <div class= "clickable-image-wrapper">
            <a href="#" aria-label="Test Label"><img src="${imgSource}" alt=""></a>
        </div>
        `
        template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})

//NOW PLAYING CAROUSEL
customElements.define("now-playing-section", class NowPlayingCarousel extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "now-playing-section";
        this.setAttribute("role", "section");

        //TEMPLATES(S)
        let template = `
        <section-subheader item-title="Now Showing" button="true"></section-subheader>
        <div class="now-playing-section__items-container"></div>
        <div class="now-playing-section__fade now-playing-section__fade--left"></div>
        <div class="now-playing-section__fade now-playing-section__fade--right"></div>
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
        let title = this.getAttribute("item-title");
        //let button = this.getAttribute("button");

        //TEMPLATES(S)
        let template = `
        <h2>${title}</h2>
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

        //TEMPLATES(S)
        let template = `
        <label for="ms1">Light mode</label>
        <input type="checkbox" role="switch" id="ms1" />
        `
        template = mounted ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})


