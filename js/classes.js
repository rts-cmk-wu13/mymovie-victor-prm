//SITE HEADER
customElements.define("site-header", class SiteHeader extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "site-header"
        let backButton = this.getAttribute("back");
        let title = this.getAttribute("title");
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
        let imgSource = this.getAttribute("image-src");
        let title = this.getAttribute("title");
        let rating = this.getAttribute("rating");

        //TEMPLATES(S)
        let template = `
        <clickable-image image-src="${imgSource}"></clickable-image>
        <h3>${title}</h3>
        <p>${rating}/10 IMDB</p>
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
customElements.define("now-playing-carousel", class NowPlayingCarousel extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "now-playing-carousel"

        //TEMPLATES(S)
        let template = `
        <section-subheader title="Now Showing" button="true"></section-subheader>
        <div class="now-playing-carousel__items-container">
            <now-playing-card image-src="https://picsum.photos/900/300" title="Title 1" rating="6.5"></now-playing-card>
            <now-playing-card image-src="https://picsum.photos/800/300" title="Title 2" rating="7.6"></now-playing-card>
            <now-playing-card image-src="https://picsum.photos/240/800" title="Title 3" rating="6.8"></now-playing-card>
            <now-playing-card image-src="https://picsum.photos/900/300" title="Title 1" rating="6.5"></now-playing-card>
            <now-playing-card image-src="https://picsum.photos/800/300" title="Title 2" rating="7.6"></now-playing-card>
            <now-playing-card image-src="https://picsum.photos/240/800" title="Title 3" rating="6.8"></now-playing-card>
        </div>
        `
        //template = imgSource ? template : ""

        //INNER HTML
        this.innerHTML = template;
    }
})

//DARKMODE TOGGLE
customElements.define("section-subheader", class SectionSubheader extends HTMLElement {
    constructor() {
        super();

        //PROPERTIES
        this.className = "section-subheader"
        let title = this.getAttribute("title");
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


