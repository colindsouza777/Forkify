

function getdata() {
  var x = String(document.getElementById("search").value);
  x = x.toLowerCase()
  url = "https://forkify-api.herokuapp.com/api/search?q=" + x;

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // Work with JSON data here
      // console.log(json)
      // console.log(data.recipes)
      y = data.recipes
      // var outside = URL.createObjectURL(data.image_url)
      let output = "<h3>Recepies</h3>";
      // output +="<ul>"
      y.forEach(recipe => {
        output += `
           <span id="${recipe.recipe_id}" class="dishtable" onclick="getrecipe(this.id)"><img class="recpimg" src="${recipe.image_url}" > ${recipe.title}<br> ${recipe.publisher}</span>    
           `;
      })
      // output +="</ul>"

      // console.log(output)
      document.getElementById("output").innerHTML = output
      return y
    })

    .catch((err) => {
      console.log(err)
    })


  // fetch("https://forkify-api.herokuapp.com/api/get?rId=47746")
  // .then((res)=>{
  //     return res.json()
  // })
  // .then((json)=>{
  //     console.log(json)
  // })
  // document.getElementById("p").innerHTML = x
  // console.log(x);
  // Get the input field
  // var input = document.getElementById("search");

  // // Execute a function when the user releases a key on the keyboard
  // input.addEventListener("keyup", function(event) {
  // // Number 13 is the "Enter" key on the keyboard
  // if (event.keyCode === 13) {
  //     // Cancel the default action, if needed
  //     event.preventDefault();
  //     // Trigger the button element with a click
  //     document.getElementById("myBtn").click();
  // }
  // });

}

var likedRecipe;
var currRecipe
function getrecipe(clicked_id) {
  currRecipeId = clicked_id;
  var getreq = "https://forkify-api.herokuapp.com/api/get?rId=";
  var name = clicked_id;
  //  console.log(name)
  recipe_url = getreq + name;
  // console.log(recipe_url)
  var info = fetch(recipe_url)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      var info = data

      y = data.recipe.ingredients

      currRecipe = data
      likedRecipe = {
        title: data.recipe.title,
        image: data.recipe.image_url,
        publisher: data.recipe.publisher,
        id: data.recipe.recipe_id,
        ingridients: y,
        clicked_num: 1
      }
      //  console.log( "this is liked"+ likedRecipe)


      otp = JSON.parse(sessionStorage.getItem('liked'))
      var i = 0
      let display = "<p>Hi there</p>"
      y.forEach(ingridient => {
        if (i == 0) {
          display += `
              <div class="display">
                <span class="ingridient"><i class = "fa fa-check-circle"></i> &nbsp ${ingridient}</span>
             `
          i += 1;
        }
        else if (i == 1) {
          display += `<span class="ingridient"><i class = "fa fa-check-circle"></i> &nbsp ${ingridient}</span>
              </div>
              `
          i -= 1
        }

      })

      document.getElementById("recipedetails").innerHTML = display
      document.getElementById("dishes").innerHTML = data.recipe.title
      document.getElementById("titleimg").style.backgroundImage = 'url(' + data.recipe.image_url + ')'
      document.getElementById("directions").href = data.recipe.source_url

      console.log(otp)
      console.log(likearr)
      if (likearr.length > 0) {

        for (var j = 0; j < likearr.length; j++) {
          if (otp[j]["id"] === likedRecipe.id) {
            if (otp[j]["clicked_num"] == 0) {
              document.getElementById("heart").className = "fa fa-heart"
              console.log(otp[j]["title"])
              break
            } else if (otp[j]["clicked_num"] == 1) {
              document.getElementById("heart").className = "fa fa-heart-o"
              console.log(otp[j]["id"])
            }
            else { continue }
          } else {
            document.getElementById("heart").className = "fa fa-heart-o"
          }
        }
      }
      // for(var i=0;i<sessionStorage.length;i++){ 
      //  if(likedRecipe.clicked_num == otp[i]["clicked_num"] && likedRecipe.title == otp[i]["title"]){
      //   document.getElementById("heart").className = "fa fa-heart-o"
      //  }
      //  else{
      //   document.getElementById("heart").className = "fa fa-heart"
      //  }
      // }
      // console.log(likearr)
      //  console.log(data.recipe.source_url)
      return y
    })
    .catch((err) => {
      console.log(err)
    })
  return info
}


var likearr = []
function likedish() {
  var name;
  if (likearr.length == 0) {
    if (likedRecipe.clicked_num == 1) {
      // likedRecipe.clicked_num = 0
      likedRecipe.clicked_num = 0
      name = likedRecipe
      console.log(name)
      likearr.push(name)
      sessionStorage.setItem('liked', JSON.stringify(likearr))
      //  console.log(name)
      console.log(sessionStorage)
      //  console.log(likearr)
      var output = "";

      likearr.forEach((ele) => {
        output += `<span id="${ele.id}" class="dishtable" onclick="getrecipe(this.id)"><img class="recpimg" src="${ele.image}" > ${ele.title}<br> ${ele.publisher}</span>`
      })
      document.getElementById("likeditems").innerHTML = output
      document.getElementById("heart").className = "fa fa-heart"


    }
    else {
      likedRecipe.clicked_num = 1
      name = likedRecipe

      document.getElementById("heart").className = "fa fa-heart-o"
      var index
      for(var z = 0;z<likearr.length;z++){
        if(likearr[z]["id"]==likedRecipe.id){
      indx = z
      break
        }
      }
      if (index > -1) {
        likearr.splice(index, 1);
    }
      sessionStorage.setItem('liked', JSON.stringify(likearr))
      output = ""
      likearr.forEach((ele) => {
        output += `<span id="${ele.id}" class="dishtable" onclick="getrecipe(this.id)"><img class="recpimg" src="${ele.image}" > ${ele.title}<br> ${ele.publisher}</span>`
      })
      document.getElementById("likeditems").innerHTML = output
      // console.log(sessionStorage)

    }
  }
  else {
    for (var j = 0; j < likearr.length; j++) {
      if (likearr[j]["id"] == likedRecipe.id) {
        likedRecipe.clicked_num = 1
        name = likedRecipe

        document.getElementById("heart").className = "fa fa-heart-o"
        var index
        for(var z = 0;z<likearr.length;z++){
          console.log("Entered the tomb")
          if(likearr[z]["id"]==likedRecipe.id){
        index = z
        console.log(z)
        break
          }
        }
        if (index > -1) {
          likearr.splice(index, 1);
      }
      console.log(likearr)
        sessionStorage.setItem('liked', JSON.stringify(likearr))
        output = ""
        likearr.forEach((ele) => {
          output += `<span id="${ele.id}" class="dishtable" onclick="getrecipe(this.id)"><img class="recpimg" src="${ele.image}" > ${ele.title}<br> ${ele.publisher}</span>`
        })
        document.getElementById("likeditems").innerHTML = output
        break
      }
      if (likedRecipe.clicked_num == 1) {
        // likedRecipe.clicked_num = 0
        likedRecipe.clicked_num = 0
        name = likedRecipe
        console.log(name)
        likearr.push(name)

        sessionStorage.setItem('liked', JSON.stringify(likearr))
        //  console.log(name)
        console.log(sessionStorage)
        //  console.log(likearr)
        var output = "";

        likearr.forEach((ele) => {
          output += `<span id="${ele.id}" class="dishtable" onclick="getrecipe(this.id)"><img class="recpimg" src="${ele.image}" > ${ele.title}<br> ${ele.publisher}</span>`
        })
        document.getElementById("likeditems").innerHTML = output
        document.getElementById("heart").className = "fa fa-heart"

        break
      }
      else {
        likedRecipe.clicked_num = 1
        name = likedRecipe

        document.getElementById("heart").className = "fa fa-heart-o"
        var index
        for(var z = 0;z<likearr.length;z++){
          if(likearr[z]["id"]==likedRecipe.id){
        index = z
        break
          }
        }
        if (index > -1) {
          likearr.splice(index, 1);
      }
        sessionStorage.setItem('liked', JSON.stringify(likearr))
        output = ""
        likearr.forEach((ele) => {
          output += `<span id="${ele.id}" class="dishtable" onclick="getrecipe(this.id)"><img class="recpimg" src="${ele.image}" > ${ele.title}<br> ${ele.publisher}</span>`
        })
        document.getElementById("likeditems").innerHTML = output
        // console.log(sessionStorage)
        break
      }
    }
  }
  if (likearr.length > 0) {
    document.getElementById("likehead").style.visibility = "visible"
  } else {
    document.getElementById("likehead").style.visibility = "hidden"
  }

}


// console.log(currRecipe)

// document.getElementById("likehead").addEventListener('mouseover', document.getElementById("likeditems").style.visibility = "visible")


var itemarr = []
var output;
var n=0
var m = 500
function addcart() {
  ing = currRecipe.recipe.ingredients
  console.log(sessionStorage)
  console.log(ing)

  ing.forEach((stuff) => {
    if(itemarr.length ==0){
      var x = stuff
      output += `<div class="spanandbut"><span id="${m}" class="addeditem">${stuff}</span><button id="${n}" class="deletecart" onclick="deleteitem(${m})"><i class="fa fa-times"></i></button></div>`
      n++
      m++
    sessionStorage.setItem("cart", stuff)
    itemarr.push(stuff)
    console.log("1")
    console.log(x)
    }
    else{
    for(var i =0;i<itemarr.length;i++){
      if(stuff == itemarr[i]){
        console.log("Already in")
        break
      }
      else{
    output += `<div class="spanandbut"><span id="${m}" class="addeditem">${stuff}</span><button id="${n}" class="deletecart" onclick="deleteitem(${m})"><i class="fa fa-times"></i></button></div>`
    n++
    m++
    sessionStorage.setItem("cart", ing)
    itemarr.push(stuff)
    console.log("Adding extra stuff")
    
    break
  }

  }
}
})

  // console.log(itemarr)
  document.getElementById("cartstuff").innerHTML = output
}



function deleteitem(smth){
  console.log(smth)
  var x = document.getElementById(smth).innerHTML
  console.log(x)
  for(var i=0;i<itemarr.length;i++){
    if(itemarr[i]==x){
      var index = i
      console.log("found a match")
      if(index > -1){
        itemarr.splice(index,1)
      }
    }
  }
  console.log(itemarr)
  output = ""
  for(var i=0;i<itemarr.length;i++){
    output += `<div class="spanandbut"><span id="${m}" class="addeditem">${itemarr[i]}</span><button id="${n}" class="deletecart" onclick="deleteitem(${m})"><i class="fa fa-times"></i></button></div>`
    n++
    m++
  }
  document.getElementById("cartstuff").innerHTML = output
}


