


/// set the functionality of shopping cart button 
(
    function () {
        const cartinfo = document.getElementById('cart-info') // the shopping cart button (its a div infact)
        const cart = document.getElementById('cart') // the shopping cart itself

        cartinfo.addEventListener('click', function () {
            cart.classList.toggle('show-cart')
        })
    }
)();

var localstorage = {}
var addeditems = {} // esm va tedad e har item, addeditems = { item1name : item1number, item2name : item2number , ... }
var totalprice = 0; // kolle cost e basket e user

////adding items to the cart
(function () {

    ////setting functionality to add-to-cart button of 12 items

    const cartBtns = document.querySelectorAll('.store-item-icon') // selecting the add-to-cart button for 12 items

    cartBtns.forEach(function (cartBtn) {
        //itemname2 is the name of each item
        const itemname2 = cartBtn.parentElement.nextElementSibling.querySelector("#store-item-name").textContent  // darim baraye har button mirim name e item esh ro ham barmidarim
        addeditems[itemname2] = 0  //setting the number of each item 0 to have an empty basket at the beginning


        cartBtn.addEventListener("click", function (e) {

            ////parent e marboot be span ee ke rush click shode ro mikhaim select konim ke baadesh image esh ro bardarim be onvan e childesh

            var itemimg // itemimg ine : <div class="img-container">
            if (e.target.tagName == "SPAN") { //check if user clicked on span or i
                itemimg = e.target.parentElement
            } else { itemimg = e.target.parentElement.parentElement }

            ////inja mikhaim esme folder ex image ro az avval e address e image bardarim va esme ye folder dige ro bezarim ke bere thumbnail e un ax ro biare baramun

            imgaddress = itemimg.getElementsByTagName("img")[0].src //getting the address text from src property of img element
            imgindex = imgaddress.indexOf("img") + 3 //index of the end of img address
            img = imgaddress.slice(imgindex) // method e slice miad az un index be baad ro negah midare, inja esm e folder ro kick kardim az address ta tu khat e baad esm e folder e thumbnail ro be jash bechasbunim
            //img is like "/sweet-1.jpeg"
            img2address = `img-cart${img}` //address e thumbnail az folder e img-cart
            //img2address is like "img-carts/sweet-1.jpeg"

            ////sibling e parent e span ee ke rush click shode ro select mikonim ke esm va price e item ro az tush bekhunim
            var iteminfo = itemimg.nextElementSibling // iteminfo ine : <div class="card-body">
            //itemname = iteminfo.querySelector("#store-item-name").innerHTML
            itemname = itemname2

            itemprice = iteminfo.children[0].children[1].children[0].textContent

            addeditems[itemname] += 1
            //            alert(addeditems[itemname] + " " + itemname + " in your basket")

            // ba in item miaim too shopping cart bara har item e entekhab shode data darj mikonim.
            const item = {
                img: img2address,
                name: itemname,
                price: itemprice * addeditems[itemname]
            }

            ////age addeditems[itemname] =1 hast yaani taze avvalin bar click shode va bayad element create beshe va ella ghablan create shode va faghat +1 beshe
            ////ezafe kardan e item e jadid be cart

            if (addeditems[itemname] == 1) {

                //bara har item ye div be esme itemcart misazim
                var itemcart = document.createElement("div")
                itemcart.id = `cart${itemname}`
                //be itemcart ee ke misazim bakhsh haye mokhtalef midim
                itemcart.innerHTML = ` 
            <!-- cart item -->
          <div class="cart-item d-flex justify-content-between text-capitalize my-3">
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text align-self-start">
<div class="d-flex">
              <p id="${item.name}" class="font-weight-bold mb-0">${item.name}  </p> <p id="itemnumber"></p>
     </div>         <span>$</span>
              <span id="item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
          
          </div>
          <!--end of  cart item -->
            `
                ////total cart ghesmat e balayi e shopping cart e
                const totalcart = cart.querySelector('.cart-total-container.d-flex.justify-content-around.text-capitalize.mt-5')
                // az payin itemcart ha ro ezafe mikonim ke tartib e zamani shun hefz beshe
                cart.insertBefore(itemcart, totalcart) //total cart ghemsat e payini e cart e, total price o ina

                ////ezafe kardan e dokmeye delete 
                var dltbtn = document.createElement("a")
                dltbtn.id = 'cart-item-remove'
                dltbtn.href = '#'
                dltbtn.classList.add("cart-item-remove")
                dltbtn.innerHTML = '<i class="fas fa-trash"></i>'

                ////kam va hazf kardan e tedad e item ha too cart, ziad kardan ro ham mitunam ezafe konam
                dltbtn.addEventListener('click', function () {

                    itemname = itemname2 // dltbtn.previousElementSibling.children[0].children[0].innerHTML 
                    addeditems[itemname] -= 1
                    console.log(itemname, addeditems, addeditems[itemname])
                    if (addeditems[itemname] == 0) {
                        itemcart.remove()
                    }
                    ////namayesh majmoo e gheymat e har item too cart baad az kam shodan e 1 vahedi
                    else {
                        itemstotal(itemname)
                    }
                    totalcost()
                })
                itemcart.children[0].appendChild(dltbtn)
            }
            //inja migim age roo button e add-to-cart baraye bare 2nd,3rd, ... click shod bia price e kol ro update kon va hamchenin tedad e item ro ham jolo item benevis tu shopping cart, intori x1,x2,x3
            else {
                itemstotal(itemname)
            }
            totalcost()
        })
    })

})();

//shopping itemscart total number and total price : x4 $20
itemstotal = (itemname,) => {
    ////namayesh majmoo e gheymat e har item too itemcart
    const updateprice = document.getElementById(`cart${itemname}`).querySelector('#item-price')
    updateprice.innerHTML = itemprice * addeditems[itemname]

    ////namayesh e tedad e har item tu itemcart
    const itemnumber = document.getElementById(itemname).nextElementSibling
    itemnumber.innerHTML = `\u00A0x\u00A0${addeditems[itemname]}`
}



//// function for clear button // item ha ro az shopping cart pak mikonim
(
    function () {
        const clearcart = document.getElementById("clear-cart")
        const checkout = clearcart.nextElementSibling

        clearcart.addEventListener("click", () => {
            const items = [...cart.children] //mohtaviat e cart  (item haye add shode)
            items.forEach(item => {
                if (item.id != "total") { //gheir az dokme haye clear va checkout kolle cart ro pak mikone
                    item.remove()
                }
            }
            );

            for (const i in addeditems) { //array e tedad e item ha ro pak mikonim
                addeditems[i] = 0
            }

            totalcost()

        })
    }

)()

//// function for updating total price and items in the cart
totalcost = () => {

    totalprice = 0

    const items = [...cart.children]
    items.forEach(item => { // price haye item haye tooye cart ro jam mizane
        if (item.id != "total") {
            const price = item.querySelector("#item-price").textContent
            totalprice += parseInt(price)

        }
    })

    //// total price e payin e cart
    const totalcost = document.getElementById("cart-total")
    totalcost.textContent = totalprice

    // dokmeye navbar ke tedad e kolle item ha va total price ro neshun mide
    const cartinfo = document.getElementById('cart-info')
    const carttotalprice = cartinfo.children[1].children[1]
    const carttotalitems = cartinfo.children[1].children[0]

    let totalitems = 00 // har bar avval tedad e item ha ro sefr mikonim va baad jam mizanim ba array e addeditems

    const values = Object.values(addeditems)

    values.forEach((value) =>
        totalitems += value
    )

    //dokmeye navbar e tedad va total price ro update mikonim
    carttotalprice.innerHTML = totalprice
    carttotalitems.innerHTML = totalitems

    localstorage = {} // localstorage (addeditems ) // bayad biam ye function tashkil bedam baraye sakhtan e itemcart tu shopping cart ke ba load shodan e page biad az addeditems itemcart ha ro add kone. ya inke kollan html e ghesmat e cartitem ro berizam tu localstorage va load konam moghe ye load e page.

}

// filter buttons
(
    function () {
        const shopitems = document.querySelectorAll("[data-item]")
        const filterbtns = document.querySelectorAll("[data-filter]") // button haye filter ro migirim

        filterbtns.forEach(  //for each button check all shopitems
            (filterbtn) => {
                filterbtn.addEventListener('click',
                    () => {
                        //filter kardan ro ba method e filter ham bezanam ///////
                        shopitems.forEach(  //for each shop item check if it should be filtered or not
                            (shopitem) => {
                                shopitem.classList.remove("hide")
                                if (filterbtn.getAttribute("data-filter") !== "all") { //if the button is "all" do not filter

                                    if (filterbtn.getAttribute("data-filter") !== shopitem.getAttribute("data-item")) {
                                        shopitem.classList.add("hide")
                                    }

                                }
                            }
                        )
                    }
                )
            }
        )

        /// "div[id='doughnut']"


    }

)();




//search box

;
(
    function () {
        suggestionbox = document.createElement("div")
        const searchbox = document.getElementById('search-item')
        searchbox.addEventListener('input', (e) => {
            var suggestions = []
            const inputlength = e.target.value.length
            itemsname = document.querySelectorAll("#store-item-name")

            if (e.target.value !== "") {

                itemsname.forEach((itemname) => {

                    itemnameslice = itemname.innerHTML.slice(0, inputlength)

                    if (itemnameslice == e.target.value) {

                        suggestions.push(itemname.innerHTML)
                    }
                }
                )

            } else {
                var suggestions = []
            }

            suggestionbox.innerHTML = ""

            suggestions.forEach(
                (suggestion) => {
                    const suggestionelem = document.createElement("a")
                    suggestionelem.innerHTML = suggestion
                    suggestionelem.setAttribute('href', 'www.google.com')
                    suggestionelem.setAttribute('style', 'display : block')
                    suggestionbox.appendChild(suggestionelem)

                }
            )
            const form = document.querySelector('form')

            suggestionbox.setAttribute("class", "suggestionbox")
            //???? chera nemiad jolo???

            // chera be jaye searchbox be form appen kardim? chon searchbox flex hast va suggestionbox nemire payin, kenaresh gharar migire
            form.parentElement.appendChild(suggestionbox)

        })


    }


)()
