
const cardsBox = document.querySelector(".cards-box");
const getProducts = async () => {
    try{
    let res = await fetch('https://fakestoreapi.com/products')
    if(!res.ok) {
        console.log("res not ok")
    }
    else{
    let products = await res.json()
    products.forEach( (prod) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="image">
            <img loading="lazy" src=${prod.image} alt="">
        </div>
        <br/>
        <div class="content">
        <h3>${prod.title}</h3>
        <div class="price">
        <span>$${prod.price}</span>
        </div>
        
        <div class="buttons">
        <a href="#" class="add-to-cart-btn " >Add To Cart</a>
        </div>
        </div>`

        if(cardsBox) {
            cardsBox.appendChild(card)
        }
        else {
            console.error("Element with class 'cards-box' not found");
        }
        cardsBox.appendChild(card);
    });
}
    }
    catch(error) {
        console.error(error.message)
    }
}
getProducts();

// add new products

document.getElementById("Product-Form").addEventListener("submit" ,async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const productData = {
        title : name,
        price,
        category,
        description,
        image
    };
    try {
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Creating..."
        const response = await fetch('https://fakestoreapi.com/products',{
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(productData)
        });
        if(!response.ok){
            throw error ("http error stauts : ",response.status);
        }
        const data = await response.json();
        const result = await document.getElementById("result");
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <h3>Product created successully</h3>
        <p><strong>name : </strong>${data.title}</p>
        <p><strong>price : </strong>${data.price}</p>
        <p><strong>category : </strong>${data.category}</p>
        <p><strong>description : </strong>${data.description}</p>
        <p><strong>image url : </strong>${data.image}</p>
        `;
        result.appendChild(newDiv);
        newDiv.classList.add("newProduct");
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = `<p>Error creating product: ${error.message}</p>`;
    }
    finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Add The Product";
    }

})
