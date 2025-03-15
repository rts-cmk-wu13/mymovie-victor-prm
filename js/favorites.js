let bodyElm = document.body;
let fav_id = "items-favorites"
buildSite();
updateAndRenderFavorites();

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Favorites",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "content-main",
  })
  let listElm = initElement("card-list", {
    'section-title': "Movies just for you!",
    'id': fav_id,
  })
  mainElm.append(listElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
}

function updateAndRenderFavorites() {
  let listElm = document.querySelector(`#card-list__items-favorites`)

  listElm.innerHTML = ""
  fetchFavorites(getLS("favorites"), fav_id)

  setTimeout(() => {
    if(listElm.children.length == 0){
      console.log(listElm.children.length)
       let noItemsMessage = initElement("p",{
  
       }).ihtml("You have don't have any movies saved as favorites")
       listElm.append(noItemsMessage)
    }
  },50)
}

