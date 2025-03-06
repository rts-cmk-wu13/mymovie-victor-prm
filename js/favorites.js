let bodyElm = document.body;

function buildSite() {
  // Create Header
  let headerElm = document.createElement("header");
  //Populate Header
  let headerComp = `<site-header back header-title="Favorites" toggle></site-header>`;
  headerElm.insertAdjacentHTML("beforeend", headerComp);
  bodyElm.append(headerElm);

  //Create Footer
  let footerElm = document.createElement("footer");
  let footerComp = `<nav-footer></nav-footer>`
  footerElm.insertAdjacentHTML("beforeend", footerComp);
  //Append
  bodyElm.append(headerElm, footerElm);
}

buildSite();