// question 

const blog2 = {
    title:"Write the differece between Arrow and regular funciton?",
    details: `<b>Here is some key difference between arrow and regular function:</b>
    The syntex of arrow function is most simpler and sorter then regular function.

    Arrow function doesn't have their own this like regular function.
    The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function.


    Regular functions created using function declarations or expressions are constructible and callable. Regular functions are constructible; they can be called using the new keyword.

    However, the arrow functions are only callable and not constructible, i.e., arrow functions can never be used as constructor functions.`
}

const blog3 = {
    title: "Why we use template string ?",
    details: `There is so many benefits of using template string. We can use multiline multiline string inside the tmeplate string without any hasel. We also can insert variable and  expressions directly in the string`
}

const display = (obj)=>{
    const container = document.getElementById('container')
    const div = document.createElement('div')
    div.className = "card bg-base-100 shadow-xl"
    div.innerHTML = `

            <div class="card-body">
            <h2 class="card-title">${obj.title}</h2>
            <p>${obj.details}</p>
            </div>
    
    `
    container.appendChild(div)
}

const article = [blog2,blog3]
const displayArticel = (arr)=>{

    arr.forEach(item=>{
        display(item)
    })

}
displayArticel(article)



