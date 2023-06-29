window.onload = () => {
    productsContainer = document.getElementById('itemsContainer');
    if (!localStorage.getItem('productsInCart')) {
        localStorage.setItem('productsInCart', '[]');
    }
    // Get the current products from cart
    const productsInCart = localStorage.getItem('productsInCart');
    const productsInCartArr = JSON.parse(productsInCart);
    loadItems(productsInCartArr, productsContainer);
};

async function loadItems(productsArray, container) {
    const fetchedData = await fetch('products.json');
    const data = await fetchedData.json();
    console.log(data);
    productsArray.forEach((obj) => {
        console.log(obj);
        data.every((dataEl) => {
            if (obj.id === dataEl.id) {
                createItem(
                    dataEl.imgSrc,
                    dataEl.name,
                    obj.cnt,
                    dataEl.priceEUR,
                    container
                );
                return false;
            }
            return true;
        });
    });
}

function createItem(imgSrc, name, cnt, price, container) {
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

    // Append ItemCount to Item
    const itemCntDiv = document.createElement('div');
    itemCntDiv.classList.add('itemCntDiv');
    item.append(itemCntDiv);
    const itemCnt = document.createElement('input');
    itemCnt.classList.add('itemCnt');
    itemCnt.setAttribute('value', cnt);
    itemCnt.setAttribute('type', 'number');
    itemCnt.addEventListener('change', updateItmCountFromInput);
    itemCntDiv.append(itemCnt);

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

async function updateItmCountFromInput(newInput) {
    const newCnt = newInput.target.value;
    const fetchedFata = await fetch('products.json');
    const data = fetchedFata.json();
    // Search in localStorage for the selected input
    // TODO
}
