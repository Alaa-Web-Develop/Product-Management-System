//==Elements :
let title = document.getElementById("title");
let price = document.getElementById("price");
let Tax = document.getElementById("Tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let cateogry = document.getElementById("cateogry");
let submitBtn = document.getElementById("submit");
let searchInput = document.getElementById("search");
let deleteAllDiv = document.getElementById("deleteAll");
let tbody = document.getElementById("tbody");

let mode = 'create';
//======Events:
let products;
if(localStorage.product != null){
    products = JSON.parse(localStorage.product);
}else{
    products =[];  
}

submitBtn.onclick = function(){
    //create new product :
    let newProd = {
       title : title.value.toLowerCase(),
       price : price.value,
       tax : Tax.value,
       ads : ads.value,
       discount : discount.value,
       total : total.innerHTML,
       cateogry : cateogry.value.toLowerCase(),
       count : count.value
    };
    if(title.value != '' && price.value != '' && cateogry.value != '' && newProd.count < 100){
        if(mode === 'create'){
            if(newProd.count > 1){
                for(let x = 0; x < newProd.count ; x++){
                    products.push(newProd);
                }
            }else{
                products.push(newProd);
            }
        }else{
            //update mode :
            products[tmp] = newProd;

            //return default create
            mode = 'create';
            submitBtn.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();
    }
    
    localStorage.setItem('product',JSON.stringify(products));
    
    showProds();
    
}
//===show Products :
function showProds(){
    let newRow = '';
    for(let x = 0 ; x < products.length ; x++){
        newRow += `
        <tr>
                <td>${x + 1}</td>
                <td>${products[x].title}</td>
                <td>${products[x].price}</td>
                <td>${products[x].tax}</td>
                <td>${products[x].ads}</td>
                <td>${products[x].discount}</td>
                <td>${products[x].total}</td>
                <td>${products[x].cateogry}</td>
                <td><button id="update" onclick="updateprod(${x})">update</button></td>
                <td><button id="delete" onclick="deleteprod(${x})">delete</button></td>
            </tr>
        `
    }
    tbody.innerHTML = newRow; //after loop

    //==create deletaall if products not empty :
    if(products.length > 0){
        deleteAllDiv.innerHTML = `<button onclick="deleteAll()">DeleteAll (${products.length})</button>`
    }
}
showProds(); // still running

//======Functions:
function getTotal (){
if(price.value != ''){
    let result = (+price.value + +Tax.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
}else{
    total.innerHTML = '';
    total.style.backgroundColor = "red";
}
}

//===clear data :
function clearData(){
    title.value = '';
    title.value.toLowerCase(),
    price.value='';
    Tax.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML ='';
    cateogry.value='';
    count.value = '';
};
//==deleteAll :
function deleteAll(){
    localStorage.clear();
    products.splice(0);
    showProds(); //must run show to updateloop and table

}

//==deleta Product :
function deleteprod(x){
products.splice(x,1);
localStorage.product = JSON.stringify(products);
showProds();
}

//===update :
let tmp;
function updateprod(x){
    title.value = products[x].title;
    price.value = products[x].price;
    Tax.value=products[x].tax;
    ads.value = products[x].ads;
    discount.value = products[x].discount;
    count.value = products[x].count;
    cateogry.value = products[x].cateogry;

    //update total
    getTotal();
    count.style.display = 'none';
    submitBtn.innerHTML = 'update';
    mode = 'update';
    tmp = x;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//===search :
let searchMode = 'title';
function getSearchMode(id){
if(id === 'searchTitle'){
    searchMode = 'title';
}else{
    searchMode = 'cateogry'
}
searchInput.placeholder = "search by " + searchMode;
searchInput.focus();
searchInput.value='';
showProds();
}
function searchData(value){

    let row = '';
    for(let x = 0;x<products.length;x++){
        if(searchMode === 'title'){
            if(products[x].title.includes(value.toLowerCase())){
                //show in table only values match search :
                row += `
                <tr>
                <td>${x + 1}</td>
                <td>${products[x].title}</td>
                <td>${products[x].price}</td>
                <td>${products[x].tax}</td>
                <td>${products[x].ads}</td>
                <td>${products[x].discount}</td>
                <td>${products[x].total}</td>
                <td>${products[x].cateogry}</td>
                <td><button id="update" onclick="updateprod(${x})">update</button></td>
                <td><button id="delete" onclick="deleteprod(${x})">delete</button></td>
            </tr>
                `;
            }
        }
        else{
            if(products[x].cateogry.includes(value.toLowerCase())){
                row += `
                <tr>
                <td>${x + 1}</td>
                <td>${products[x].title}</td>
                <td>${products[x].price}</td>
                <td>${products[x].tax}</td>
                <td>${products[x].ads}</td>
                <td>${products[x].discount}</td>
                <td>${products[x].total}</td>
                <td>${products[x].cateogry}</td>
                <td><button id="update" onclick="updateprod(${x})">update</button></td>
                <td><button id="delete" onclick="deleteprod(${x})">delete</button></td>
            </tr>
                `;
            }
        }
        
    }
    tbody.innerHTML = row;
    
}