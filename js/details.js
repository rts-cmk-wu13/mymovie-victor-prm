let params = new URLSearchParams(document.location.search);
let id = params.get("id"); // is the string "Jonathan"
console.log(id)


let bodyElm = document.body;

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Favorites",
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