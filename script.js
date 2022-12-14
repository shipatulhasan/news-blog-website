// mobile menu

const mobileMenu = () => {

    const myNav = document.getElementById("myLinks");
    if (myNav.style.display === "block") {
        myNav.style.display = "none";
    } else {
        myNav.style.display = "block";
    }

}

// preloader

const spinner = (isTrue) => {

    const loader = document.getElementById('spinner')


    if (isTrue) {
        loader.classList.remove('hidden')
    } else {
        loader.classList.add('hidden')
    }

}


// load categories and show on the menu

const loadCategories = async () => {

    try {
        let res = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await res.json()
        showCategories(data.data.news_category)
    } catch (error) {
        console.log(error)
    }

}

// categori show
const showCategories = (categoryList) => {

    const menuContainer = document.getElementById('menu-list')
    menuContainer.innerHTML = `
    <li class="menu px-4 py-1 font-semibold font-poppins text-primary bg-purple-600 bg-opacity-10 rounded text-md hover:cursor-pointer" onclick = "loadNewses('08')">Home</li>
    `

    categoryList.forEach(item => {

        const id = item.category_id
        const name = item.category_name

        const li = document.createElement('li')
        li.innerHTML = `
    <li class="menu font-semibold font-poppins text-md hover:cursor-pointer px-4 py-1" onclick="loadNewses('${id}','${name}')">${name}</li>
    `

        menuContainer.appendChild(li)

    });

    //    active function text-primary bg-purple-600 bg-opacity-10 rounded

    const tab = menuContainer.querySelectorAll('.menu')
    tab.forEach(item => {
        item.addEventListener('click', (e) => {
            tab.forEach(menu => menu.classList.remove('text-primary', 'bg-purple-600', 'bg-opacity-10', 'rounded'))

            e.target.classList.add('text-primary', 'bg-purple-600', 'bg-opacity-10', 'rounded')


        })

    })

}

// load news

const loadNewses = async (id, categoryName = "Today") => {
    try {
        spinner(true)
        let url = `https://openapi.programming-hero.com/api/news/category/${id}`
        let res = await fetch(url)
        const newses = await res.json()
        showNewses(newses.data.sort((a, b) => {
            return b.total_view - a.total_view
        }), categoryName)
    } catch (error) {
        console.log(error)
    }
}

// show news in feeds

const showNewses = (newses, categoryName) => {
    const countSection = document.getElementById('display-count')
    countSection.innerHTML = `

    <h2 class="text-slate-700 font-semibold bg-white rounded p-4 my-5">
       ${newses.length} Newses found for <span class="text-primary">${categoryName }</span>
      </h2>
    
    `
    // error handling

    errorText(newses)


    const newContainer = document.getElementById('news-container')
    newContainer.textContent = ''

    newses.forEach(element => {

        let {
            thumbnail_url,
            title,
            details,
            total_view,
            author
        } = element

        let {
            name,
            img,
            published_date
        } = author

        const date = new Date(published_date)

        const card = document.createElement('div')
        card.className = "card lg:card-side bg-base-100 shadow-xl"
        card.innerHTML = `
        
        <img src="${thumbnail_url}" alt="" class = "p-4">
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details.length > 330 ? details.slice(0,330) +'...' : details}</p>
          
        <div class="card-actions justify-between items-center space-y-3 lg:space-y-0 mt-4">
            <div class="w-full lg:w-1/2 flex gap-5">
                <div class="overflow-hidden w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="${img}" />
                </div>
                <div class="description">
                <h2 class="font-bold text-dark text-base md:text-lg font-poppins">
                ${name ? name :'no data found'}
                </h2>
                <p class="text-xs md:text-sm text-slate-500 font-poppins">
                ${published_date ? date.toDateString() : 'no data found'}
                </p>
                </div>
            </div>
                <div>
                    <p class="text-dark text-lg font-bold font-poppins">
                    <i class="fa-sharp fa-solid fa-eye text-primary "></i> 
                    ${total_view ? total_view +'k' : 'not found'}
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
                <label for="modal-3" class="modal-button hover:cursor-pointer" onclick="loadDetails('${element._id}')"><i class="fa-solid fa-arrow-right text-primary text-3xl"></i></label>
              </div>
        </div>
        </div>
        
        `

        newContainer.appendChild(card)

        spinner(false)


    })
}

loadNewses('08')
loadCategories()

// popup loading

const loadDetails = async (newsId) => {
    try {
        let url = `https://openapi.programming-hero.com/api/news/${newsId}`
        const response = await fetch(url)
        const info = await response.json()
        showDetails(info.data[0])
    } catch (error) {
        console.log(error)
    }
}

// popup showing

const showDetails = (information) => {

    const mydate = new Date(information.author.published_date)

    const container = document.getElementById('details-container')

    container.innerHTML = `
    
        <label for="modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">???</label>
        <div class = "h-5/6" ><img src="${information.image_url}" class="h- [200px] lg:h-[500px] w-full" alt="${information.title}"/>
        </div>

        <div class = "mt-4 lg:flex justify-between items-center gap-5 space-y-5 py-5 px-2">
            <div class = "w-full lg:w-auto flex items-center gap-5">
                <img src="${information.author.img}" class="overflow-hidden w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" />
                <h2 class="text-sm md:text-lg font-bold text-dark font-poppins">
                ${information.author.name ? information.author.name :'no data found'}
                </h2>
            </div>
            <div class = "lg:flex gap-5 items-center">
                <p class="font-bold font-poppins text-sm">
                ${information.author.published_date ? mydate.toDateString() : 'no data found'}
                </p>
                <p class="text-dark text-sm font-bold">
                <i class="fa-sharp fa-solid fa-eye text-primary text-sm"></i> 
                 ${information.total_view ? information.total_view + 'k' : 'not found'}
                </p>
                 <p class="text-orange-500 font-bold text-sm">${information.rating.number}<sup><i class="fa-solid fa-star"></i></sup><p>
                </p>
            </div>
        </div>
        <h3 class="text-lg font-bold">${information.title}</h3>
        <p class="py-4">${information.details}</p>

    `
}


// error handling
const errorText = (arr) => {

    const errorMsg = document.getElementById('error-msg')
    if (arr.length === 0) {
        spinner(false)
        errorMsg.classList.remove('hidden')

    } else {
        errorMsg.classList.add('hidden')

    }
}