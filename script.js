// mobile menu

const mobileMenu=()=>{

    const myNav = document.getElementById("myLinks");
    if (myNav.style.display === "block") {
        myNav.style.display = "none";
    } else {
        myNav.style.display = "block";
    }

}


// load categories and show on the menu

const loadCategories = async()=>{

    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')

    const data = await res.json()

    showCategories (data.data.news_category) 

}


const showCategories = (categoryList)=>{

    const menuContainer = document.getElementById('menu-list')
    menuContainer.innerHTML = `
    <li class="font-semibold font-poppins text-md text-slate-700 hover:cursor-pointer">Home</li>
    `

   categoryList.forEach(element => {

    const id = element.category_id
    const name = element.category_name

    const li = document.createElement('li')
    li.innerHTML = `
    <li class="font-semibold font-poppins text-md text-slate-700 hover:cursor-pointer" onclick="loadDetails('${id}','${name}')">${name}</li>
    `
    
    menuContainer.appendChild(li)
  
   });
}

const loadDetails = async(id,name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    showDetails(data.data,name)
}

const showDetails = (data,name)=>{
    const section = document.getElementById('display-count')
    section.innerHTML = `

    <h2 class="text-slate-700 font-semibold">
       ${data.length} items found for category <span class="text-blue">${name}</span>
      </h2>
    
    `
    const newContainer = document.getElementById('news-container')
    newContainer.textContent = ''

    data.forEach(element=>{
        console.log(element)

        const {thumbnail_url,title,details,image_url,total_view,rating,author} =element
        const {name,img,published_date} = author

        const card = document.createElement('div')
        card.className = "card lg:card-side bg-base-100 shadow-xl"
        card.innerHTML =   `
        
        <img src="${thumbnail_url}" alt="" class = "p-4">
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details.length > 330 ? `<p>${details.slice(0,234)}<p><br><p> ${details.slice(234,330) + ' . . .'}</p>` : details}</p>
          
          <div class="card-actions justify-between items-center mt-4">
        <div class="flex gap-5">
            <div class="overflow-hidden w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="${img}" />
            </div>
            <div class="description">
              <h2 class="">
              ${name === null ||name === '' ?'no data found':name}
              </h2>
              <p class="title">
               ${published_date ? published_date : 'no data found'}
              </p>
            </div>
            </div>
            <div>
              <p class="text-dark text-lg font-bold">
                <i class="fa-sharp fa-solid fa-eye text-blue text-lg"></i> 
                ${total_view ? total_view : 'not found'}
              </p>
            </div>
              <div>
              <p class="text-orange-500">
              <i class="fa-solid fa-star filled"></i>
              <i class="fa-solid fa-star filled"></i>
              <i class="fa-solid fa-star filled"></i>
              <i class="fa-solid fa-star filled"></i>
              <i class="fa-solid fa-star-half-stroke filled"></i>
          </p>
              </div>
              <div>

                <label for="modal-3" class="modal-button hover:cursor-pointer"><i class="fa-solid fa-arrow-right text-primary text-3xl"></i></label>
              </div>
        </div>
        </div>
        
        `

        newContainer.appendChild(card)

    })
}

loadCategories()

{/* <p>${details.length > 200 ?details.slice(0,100) +". . ." : details }</p> */}