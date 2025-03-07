let bodyElm = document.body;

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Now Playing",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, footerElm);
}

buildSite();