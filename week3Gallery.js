// Objektumok, amik a képek adatait tárolja.

let data0 = 
{
    photo: "img/photo0.jpg",
    title: "The Lake",
    description: "Fold in the remaining egg whites and mix until just incorporated. (Mixture should be fluffy.) Fold in the thyme and most of the parsley (save some for topping). Transfer batter to prepared pan and sprinkle with remaining herbs."
};

let data1 = 
{
    photo: "img/photo1.jpg",
    title: "Top View of Valley Near Body of Water",
    description: "Use whatever chocolate and nuts you have in your pantry in this quick and easy cookie recipe that's perfect for when you're stuck inside. You can freeze the balls of uncooked dough and cook for 20 minutes at 180°C."
};

let data2 = 
{
    photo: "img/photo2.jpg",
    title: "Beautiful Landscape of Grass Field",
    description: "Sure, cheeseburgers are delicious. Sometimes though, we like to switch it up. These Greek(ish) lamb burgers are full of flavor and a cinch to make! We're particularly fond of the of the feta yogurt sauce, similar to tzatziki sauce, so we slather it on both sides of the bun. If you end up with anything left over, it's a perfect dip for raw veggies or pita chips. These will make you rethink making the same old hamburger ever again!"
};

let data3 = 
{
    photo: "img/photo3.jpg",
    title: "Golden Gate Bridge",
    description: "A Golden Gate híd (magyarul Aranykapu) az Amerikai Egyesült Államok második leghosszabb függőhídja, amely a Csendes-óceánt és a San Francisco-öblöt elválasztó szorost íveli át. A San Francisco-félsziget északi csúcsán elterülő San Franciscót köti össze Marin megyével. A Golden Gate híd építését 1933. január 5-én kezdték el, és 1937. május 27-én adták át a gyalogos forgalomnak, ezt követően 27 évig, a New York-i Verrazano-Narrows híd elkészültéig; a világ leghosszabb függőhídja volt."
};

let data4 = 
{
    photo: "img/photo4.jpg",
    title: "Budapest",
    description: "This is Budapest at night. Beautiful isn't it?"
};

let data5 = 
{
    photo: "img/photo5.jpg",
    title: "Grey and Brown Mountain",
    description: "A beautiful mountain which is good to look at, right?"
};

// currentPhoto változóval indexelek az imagesData tömben.
// imagesData tömb tárolja a data objektumokat.
let currentPhoto = 0;
let imagesData = [data0, data1, data2, data3, data4, data5];

// loadPhoto függvénnyel töltöm be a képeket és a hozzájuk tartozó címet, feliratot.
let loadPhoto = (photoNumber) =>
{
    $("#photo").attr("src", imagesData[photoNumber].photo);
    $("#photo-title").text(imagesData[photoNumber].title);
    $("#photo-description").text(imagesData[photoNumber].description);
}

// Meghívom a fv-t, hogy betöltse a képeket, címet, feliratot.
loadPhoto(currentPhoto);


// forEach metódussal végig megyek az imagesData tömbön. jQuery-vel kiegészítem az html fájlt.
// forEach paraméterei az jelenlegi tömb elem értékét és indexét tárolja és azt megfelelően elhelyezem a jQuery html struktúrában.
imagesData.forEach((item, index) => 
{
    $(".thumbnails-wrapper").append(`
    <div class="thumbnail-arrowUpDown-wrapper thumbnail-active-${index}">
        <div class="subtitle">${item.title}</div>
        <div class="arrowDown"></div>
        <div class="arrowUp"></div>
        <img src="img/photo${index}.jpg" class="thumbnail-${index} thumbnail" data-number=${index}>
    </div>`);
});


// Ezzel állítom be a kezdő állapotot. Oldal frissítésénél az első kép lesz kiválasztva a img viewerben és az thumbnailben.
$(".thumbnail-active-0").addClass("focus-on");
$(".thumbnail-0").siblings("div .arrowUp").css("opacity", "1");


// Document ready fv megvárja, hogy a html teljesen betöltsön és aztán kezelje a js fájlt.
// Ha nincs ez, akkor lehet az is egy megoldás, hogy a záró body tag előtt van a js fájl inkludálása.
$(document).ready(function () 
{
    // img viewer jobb nyíl esemény kezelése
    $(".right-arrow").click(() =>
    {
        // A nyíl eseménnyel tudunk mozogni a képek között és fontos számon tartani, hogy jelenleg melyik képnél vagyunk. Ha balra megyünk akkor csökken az index, ha jobbra akkor nő.
        currentPhoto++;
    
        // Ez egy feature, hogy a lista valamelyik végénél tovább haladva a másik véghez jutunk.
        if(currentPhoto > imagesData.length-1)
        {
            currentPhoto = 0;
        }
    
        // Újra betöltünk mindent (frissítés).
        loadPhoto(currentPhoto);

        // Minden egyes mozgásnál a képek között, mindegyikről eltávolítom a focus-on osztályt, aztán ahhoz adom hozzá, amelyik jelenleg ki van jelölve.
        $(`.thumbnail-arrowUpDown-wrapper`).removeClass("focus-on");
        $(`.thumbnail-active-${currentPhoto}`).addClass("focus-on");
        

        // Kiválasztott kép thumbnail felső keretén van egy nyíl ami jelzi, hogy az van most kijelölve, csak dizájn, animáció. Itt kezelem, szépen jelenjen meg és csak ott ahol van a focus-on osztály. De lőtte mindenhol eltűntetem, aztán csak a jelenleginál tűnik fel.
        $(".thumbnail").siblings("div .arrowUp").css("opacity", "0");
        if($(`.thumbnail-active-${currentPhoto}`).hasClass("focus-on"))
        {
            $(`.thumbnail-active-${currentPhoto}`).children("div .arrowUp").css("opacity", "1");
        }
    });
    
    // img viewer bal nyíl esemény kezelése 
    $(".left-arrow").click(() =>
    {
        currentPhoto--;
    
        if(currentPhoto < 0)
        {
            currentPhoto = imagesData.length-1;
        }
    
        loadPhoto(currentPhoto);

        $(`.thumbnail-arrowUpDown-wrapper`).removeClass("focus-on");
        $(`.thumbnail-active-${currentPhoto}`).addClass("focus-on");

        $(".thumbnail").siblings("div .arrowUp").css("opacity", "0");
        if($(`.thumbnail-active-${currentPhoto}`).hasClass("focus-on"))
        {
            $(`.thumbnail-active-${currentPhoto}`).children("div .arrowUp").css("opacity", "1");
        }
    });

    // thumbnail kezelése
    $(document).on("click", ".thumbnail", function (event)
    {
        // A kiválasztott thumbnail képét betöltjük az img viewerbe.
        // Figyelünk a currentPhoto indexre.

        // $("#photo").attr("src", $(event.target).attr("src"));
        currentPhoto = $(event.target).attr("data-number");
        loadPhoto(currentPhoto);

        // Ahogy a nyíl eseménynél, itt is amikor a thumbnailre kattintunk jelezni kell, hogy melyik van kiválasztva. Először eltávolítjuk thumbnail-arrowUpDown-wrapper osztályokon a focus-on osztályt, szóval mindegyikről levesszük a kijelölés jelzőt. Aztán kattintáskor hozzáadjuk a kijelölt thumbnailhez a focus-on osztályt jelezve, hogy az van jelenleg kiválasztva.
        $(".thumbnail-arrowUpDown-wrapper").removeClass("focus-on");
        $(event.target).parent().addClass("focus-on");
        
        // Mint a nyíl eseménynél itt is meganimálom a thumbnail felső keretén a felfelé mutató kis nyilat. Először mindenhol eltűntetem, aztán a kiválasztottnál megjelenítem.
        $(".thumbnail").siblings("div .arrowUp").css("opacity", "0");
        if($(event.target).parent().hasClass("focus-on"))
        {
            $(event.target).siblings("div .arrowUp").css("opacity", "1");
        }
    });
});