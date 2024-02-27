let objectdata;
async function recepiedata() {
  const options = {
    method: "GET",
  };
  let json_data = await fetch("http://localhost:4000/api", options);
  let data = await json_data.json();
   objectdata= data;
  console.log(objectdata)
  card(Object.values(data));

}
recepiedata();
function card(data) {
  data.forEach((element) => {
    console.log(element.imageurl)
    let article_element = document.createElement("article");
    article_element.setAttribute("class", "card");
    //creating an image
    let img = new Image(218, 128);
    img.src = `${element.imageurl}`;
    //creating text
    let span_element = document.createElement("span");
    span_element.setAttribute("class", "card-header");
    span_element.append(document.createTextNode(`${element.name}`));
    //appending into article
    article_element.appendChild(img);
    article_element.appendChild(span_element);
    article_element.setAttribute("name_of_recepie", `${element.name}`);
    // appending into html element
    document.querySelector(".wrapperproduct").appendChild(article_element);
  });
}
function clicking() {
  document.querySelectorAll(".wrapperproduct").forEach((element) => {
    element.addEventListener("click", (event) => {
     
      objectdata.forEach(ele =>{
        if(ele.name==event.target.parentNode.getAttribute("name_of_recepie")){
                      console.log(event.target.childNodes.length)
                     // event.target.parentNode.style.display="none"
                      const childnodes = event.target.parentNode.innerHTML
                    //  let ingredient_block =document.createElement("article")
                    //  ingredient_block.setAttribute("class","card")
                     ele.ingredients.forEach(ele=>{
                       const text = document.createTextNode(ele)
                       const breaking = document.createElement("br")

                      event.target.parentNode.appendChild(text)
                      event.target.parentNode.appendChild(breaking)
                     })

                     
                     setTimeout(()=>{
                      event.target.parentNode.innerHTML=childnodes
                      
                      },10000)
          console.log(ele.ingredients)
        }
      })
    } );
  });
}
// <article class="card" name_of_recepie="Chicken Curry"><img width="218" height="128" src="uploads/curry.jpg"><span class="card-header">Chicken Curry</span></article>

document.addEventListener("DOMContentLoaded",()=>{
  clicking()
})
  