if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
} //kjo pjese kodi kontrollon nese dokumenti eshte load para se te aksesojme pjeset e tij qe javascrip te funksionoje ne menyre te rregullt
  //nqs javascript lodohet para bodyt te html athere ajo nuk do arrij te gjej elementet e specifikuar te html sepse nuk jan gjeneruar

function ready() {
   var removeCartItemButtons = document.getElementsByClassName('btn-danger') //kap elementet HTML me ane te klases se tyre
   for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
   }   //krijojme ciklin for per te ber loop te te gjith butonat dhe me ane te event listener 
   //degjojme kur behet < click > butoni dhe ekzekutohet funksioni removeCartItem

   var quantityInputs = document.getElementsByClassName('cart-quantity-input') //i ngjashem me funksionin lart, sherben per te kapur sasine dhe per ta updatuar
   for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged) //vleta change per te kapur sa her inputi ndryshon vleren e tij
   }

   var addToCartButtons = document.getElementsByClassName('shop-item-button')//per te futur elemtente ne faqe ne shporte me ane te butonit add to cart te cilin e kapim nga klasa shop-item-button
   for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i] //loop ndermjet butonave add to cart
    button.addEventListener('click', addToCartClicked) //shtojm eventlistener per te kuptuar cili buton eshte klikuar
   }

   document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked) //per te kapur butonin purchase te cilit i vendosim event listener dhe nje funksion
}

function purchaseClicked() {
    alert('Thank you for your purchase') //kur klik butonin purchase shfaqet ky msg ne faqe
    var cartItems = document.getElementsByClassName('cart-items')[0] //per te marr elementet e shportes
    while (cartItems.hasChildNodes()) { //cikli konrollon nese ka akoma element ne shporte,nese po, procedon me fshirjen e tyre,pasi kur klienti klikon purchase,shporta duhet te boshatiset
        cartItems.removeChild(cartItems.firstChild)
    }//per te fshire rreshtat pasi klikojme butonin purchase
    updateCartTotal() //te behet update totali ne 0 pas fshirjes se rreshtave

}

function removeCartItem(event){ //funksion per te hequr produktin nga shporta kur klik butonin remove
      var buttonClicked = event.target //merr elementin ku ndodh eventi apo click
        buttonClicked.parentElement.parentElement.remove() //kap elementn prind baze po divin qe perfshin te gjith produktin (foton sasin cmim butonin )per ta fshire te gjithin
        updateCartTotal() //per te updatuar apo perditesuar totalin pasi hiqet elementi kur klikojme butonin
}

function quantityChanged(event) { //ndryshon sasin e elementit sipas asaj cfare deshiron perdoruesi
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) { //kontrollon nese sasia e vendosur nuk eshte numer ose vlera e saj me e vogel baras se 0 sepse nuk kane kuptim 
        input.value = 1//inicializohet me vleren 1 sasia
    }
    updateCartTotal() //updatohet totali ne baze edhe te ndryshimit te sasise
}

function addToCartClicked(event) {
    var button = event.target //percakton cili button add to cart eshte klikuar
    var shopItem = button.parentElement.parentElement //kap divin i cili ka permbajtjen e te gjithe produktit
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText //merr emrin e produktit 
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText //merr cmiin e produktit
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src //merr linkun e img
    addItemToCart(title, price, imageSrc) //tre elementet qe kapim lart i fusim si parametra te funksionit addItemToCart
    updateCartTotal() //qe te updatohet totali me shtimin e elementit
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div') //krijojme nje element div per ta shtuar si rresht te shportes
    cartRow.classList.add('cart-row') //shtojme klasen cart-row qe elementet te stilohen ne rregull
    var cartItems = document.getElementsByClassName('cart-items')[0] //klasa cart-items perfshin elementet e shportes
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title') //duam elementin e titullit te produktit
    for (var i = 0; i < cartItemsNames.length; i++) { //loop pergjat emrave te produkteve
        if (cartItemsNames[i].innerText == title) { //kontroll nese emri i produktit ne shporte eshte = me emrin e prod qe duam te shtojme
            alert('This item is already added to the cart') //nese eshte shfaqet mesazhi qe produkti gjendet ne shporte
            return  //kthejhemi nga fuksioni dhe produkti nuk shtohet
        }
    } //bejme kontrollin qe te mos futen dy elemente te njejte ne shporte
    var cartRowContents = `
        <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
           </div>
           <span class="cart-price cart-column">${price}</span>
           <div class="cart-quantity cart-column">
           <input class="cart-quantity-input" type="number" value="1">
           <button class="btn btn-danger" type="button">REMOVE</button>
           </div>` //marrim html nga faqja store per te krijuar nje rresht te ngjashem sic kemi ber te store dhe vendosim variablat title price qe te funksionoje per te gjithe elementet,qe secili te mund te shtohet ne shporte
    cartRow.innerHTML = cartRowContents //mbushim div me kodin e html duke perdorur innerHTML
    cartItems.append(cartRow) //shton elementin div, qe eshte bosh per momentin, ne fund te elementeve te shportes
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) //duke qen se kur u be faqja kto elemente nuk ishin dhe shtohen mbrapa, buroni remove dha sasia nuk funksionojne
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)//duhet ti marrim e ti japim funksionet perkatese
}



function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] //kap elementin e pare te klases cart-items sepse kjo klase permban gjithe rreshtat e shportes
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') //kap rreshtat brenda cartItemContainer qe kane klasen cart-row 
    var total = 0   //inicializohet var totali me vleren 0 para se te filloj cikli
    for(var i = 0; i < cartRows.length; i++) {  //ben loop brenda rreshtave
        var cartRow = cartRows[i]      //variabli cartRow inicializohet me vleren e rreshtit ku ndodhemi
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] //ne rreshtin ku jemi marrim elementin e pare te cmimit me ane klases cart-price
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]//si me cmimin por ne kte rast kapim sasine
        var price = parseFloat(priceElement.innerText.replace('$', ''))//kap tekstin brenda priceElement,duhet te heqim shenjen $ me ane te funksionit replace dhe ta kthejme nga string ne numer me ane te parseFloat per te kryer veprime
        var quantity = quantityElement.value //marrim vleren e sasise nga variabli quantityElement dhe jo innerText duke qene se eshte input dhe ka value 
        total = total + (price * quantity) //shprehja per te gjetur totalin
    }
    total = Math.round(total*100) / 100 //e rrumbullakosim totalin qe te na dal me 2 shifra pas presjes dhjetore qe mos te na dalin shum numra
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //per te ndryshuar vleren e totalit sipas funksionit updateCartTotal

}
