const readline = require("readline-sync");
let products = [
    {name:'Vitamin C Serum',category:'Glow', amount:1095, rating:4.3},
    {name:'Pink Clay Mask',category:'Glow', amount:845, rating:4.7},
    {name:'Day Cream',category:'Dry', amount:845, rating:4.1},
    {name:'Night Cream',category:'Dry', amount:945, rating:4.7},
    {name:'Hyaluronic Acid Serum',category:'Dry', amount:975, rating:4.9},
    {name:'Acne Busting Serum',category:'Acne', amount:975, rating:4.6},
    {name:'Green Clay Mask',category:'Acne', amount:695, rating:4.7},
    {name:'Day Gel',category:'Dry', amount:645, rating:4.9},
    {name:'AHA Serum',category:'Dry', amount:1095, rating:4.5},
    {name:'AHA Sleep Mask',category:'Glow', amount:995, rating:4.3}
]


//take input
console.log("product name")
let product_name;
let product_rating;
product_name = String(readline.question());
if(product_name){
    console.log("product rating")
    product_rating = Number(readline.question());
}


function findRatingProduct(rating){
    return products.filter(item=>item.rating >rating && item.name !=product_name)
}

// function sortProductByRating(items){
//     items.sort(function(item_1, item_2) {
//         if (item_1.rating > item_2.rating) {
//           return -1;
//         }
//         if (item_1.amount < item_2.amount) {
//           return 1;
//         }
//         return 0;
//       });
//     return items  
// }

// 4-5 rating product
function findFinalProduct(products, category){
    let stack = []
    products.forEach((ele, index) => {
        if(index == 0){
            stack.push(ele)
        } 
        else if(stack[0].rating < ele.rating) {
            stack.pop()
            stack.push(ele)
        } 
        else if(stack[0].rating == ele.rating && stack[0].ele == category) {
            stack.pop()
            stack.push(ele)
        }
        else if(stack[0].rating == ele.rating && stack[0].ele != category && stack[0].amount < ele.amount){
            stack.pop()
            stack.push(ele)
        } 
    });
    return stack[0]
}

//for below 4 rating
function findFinalProductForBelowRating(products, category){
    let stack = []
    products.forEach((ele, index) => {
        if(stack.length == 0 && ele.category !=category){
            stack.push(ele)
        } 
        else if(stack[0].rating < ele.rating && ele.category !=category) {
            stack.pop()
            stack.push(ele)
        } 
        else if(stack[0].rating == ele.rating &&  stack[0].amount > ele.amount && ele.category !=category){
            stack.pop()
            stack.push(ele)
        } 
    });
    return stack[0]
}

//condition check
function recomendProduct(){
    if(product_rating >4.5){
        let actual_product = products.filter(item=>item.name == product_name)
        if(actual_product.length == 0){
            console.log("product not found")
            return
        }
        let rating_product = findRatingProduct(4.3)
        // let sorted_poduct = sortProductByRating(rating_product)
        let final_poduct = findFinalProduct(rating_product,actual_product[0].category)
        console.log(final_poduct.name)
    }
    else if(product_rating >= 4.0 && product_rating <= 4.5){
        let actual_product = products.filter(item=>item.name == product_name)
        if(actual_product.length == 0){
            console.log("product not found")
            return
        }
        let rating_product = findRatingProduct(4.5)
        // let sorted_poduct = sortProductByRating(rating_product)
        let final_poduct = findFinalProduct(rating_product,actual_product[0].category)
        console.log(final_poduct.name)
    }
    else if(product_rating < 4.0){
        let actual_product = products.filter(item=>item.name == product_name)
        if(actual_product.length == 0){
            console.log("product not found")
            return
        }
        let rating_product = findRatingProduct(4.5)
        // let sorted_poduct = sortProductByRating(rating_product)
        let final_poduct = findFinalProductForBelowRating(rating_product,actual_product[0].category)
        console.log(final_poduct.name)
    }
}

recomendProduct()




