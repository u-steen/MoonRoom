window.onload = () => {
    productsContainer = document.getElementById('itemsContainer');
    if (!localStorage.getItem('productsInCart')) {
        localStorage.setItem('productsInCart', '[]');
    }
    // Get the current products from cart
    const productsInCart = localStorage.getItem('productsInCart');
    const productsInCartArr = JSON.parse(productsInCart);
    loadItems(productsInCartArr);
};

async function loadItems(productsArray) {
    const fetchedData = await fetch('products.json');
    const data = await fetchedData.json();
    console.log(data);
    productsArray.every((itemId) => {
        data.forEach((el) => {
            if (el.id === itemId) {
                createItem(el.imgSrc, el.name, el.priceEUR, productsContainer);
            }
        });
        return true;
    });
}

function createItem(imgSrc, name, price, container) {
    // Add Item to container
    const item = document.createElement('div');
    item.classList.add('item');
    container.appendChild(item);

    // Append Image to Item
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('productImg');
    item.appendChild(imgDiv);
    const img = document.createElement('img');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', name);
    imgDiv.appendChild(img);

    // Append Name to Item
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('productName');
    item.append(nameDiv);
    const nameText = document.createElement('h2');
    nameText.innerText = name;
    nameDiv.append(nameText);

    // Append Delete Button to Item
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('productDelete');
    item.append(deleteBtn);
    const delBtnImg = document.createElement('img');
    delBtnImg.setAttribute('src', '../img/deleteitem.svg');
    delBtnImg.setAttribute('alt', 'delete-button');
    deleteBtn.appendChild(delBtnImg);

    // Append Price to Item
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('productPrice');
    item.append(priceDiv);
    const priceText = document.createElement('h2');
    priceText.innerText = price + ' EUR';
    priceDiv.append(priceText);
}
