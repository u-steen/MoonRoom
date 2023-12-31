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
    productsArray.forEach((obj) => {
        // console.log(obj);
        data.every((dataEl) => {
            if (obj.id === dataEl.id) {
                createItem(
                    dataEl.id,
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
    updateSubtotalPrice();
}

function createItem(id, imgSrc, name, cnt, price, container) {
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
    itemCnt.addEventListener('change', (e) => {
        updateItmCountFromInput(id, e.target.value);
        priceText.innerText = getPriceString(price, e.target.value);
        updateSubtotalPrice();
    });
    itemCntDiv.append(itemCnt);

    // Append Delete Button to Item
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('productDelete');
    item.appendChild(deleteDiv);

    const delImgDiv = document.createElement('div');
    delImgDiv.classList.add('delImgDiv');
    deleteDiv.appendChild(delImgDiv);

    const delImg = document.createElement('img');
    delImg.setAttribute('src', '../img/deleteitem.svg');
    delImg.setAttribute('alt', 'delete-button');
    delImg.addEventListener('click', () => {
        deleteItem(id);
    });
    delImgDiv.appendChild(delImg);

    // Append Price to Item
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('productPrice');
    item.append(priceDiv);
    const priceText = document.createElement('h2');
    priceText.innerText = getPriceString(price, itemCnt.value);
    priceDiv.append(priceText);
}

async function updateItmCountFromInput(id, newInput) {
    newInput = parseInt(newInput);
    if (newInput === 0) {
        deleteItem(id);
    } else {
        const cartArray = JSON.parse(localStorage.getItem('productsInCart'));
        cartArray.forEach((el) => {
            if (el.id === id) {
                el.cnt = newInput;
            }
        });
        localStorage.setItem('productsInCart', JSON.stringify(cartArray));
    }
}

async function deleteItem(id) {
    deleteAlert();

    const cartArray = JSON.parse(localStorage.getItem('productsInCart'));
    console.log(cartArray);
    cartArray.forEach((el) => {
        if (el.id === id) {
            cartArray.splice(cartArray.indexOf(el), 1);
        }
    });
    localStorage.setItem('productsInCart', JSON.stringify(cartArray));
}

function deleteAlert() {
    // Create alarm
    const alert = document.createElement('div');
    alert.classList.add('alert');
    document.querySelector('body').append(alert);

    const textDiv = document.createElement('div');
    textDiv.classList.add('confirmationTextDiv');
    alert.appendChild(textDiv);

    const text = document.createElement('p');
    text.classList.add('confirmationText');
    text.innerText = 'The item was deleted!';
    textDiv.appendChild(text);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelBtn');
    cancelBtn.innerText = 'OK';
    alert.appendChild(cancelBtn);

    cancelBtn.addEventListener('click', (e) => {
        removeAlarm(e.target.parentNode, e.target.parentNode.parentNode);
    });

    const timeout = setTimeout(() => {
        removeAlarm(alert, document.querySelector('body'));
    }, 3000);

    function removeAlarm(alarm, alarmParent) {
        console.log(alarm, alarmParent);
        alarmParent.removeChild(alarm);
        clearTimeout(timeout);
        location.reload();
    }
}

function getPriceString(pricePerItem, cnt) {
    let string = '';
    if (cnt > 1) {
        string += pricePerItem + ' EUR * ' + cnt + '\n';
        const total = getItemTotalPrice(pricePerItem, cnt);
        string += total + ' EUR';
        return string;
    }
    return pricePerItem + ' EUR';
}

async function updateSubtotalPrice() {
    let price = 0;
    const fetchedData = await fetch('products.json');
    const data = await fetchedData.json();

    const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));

    productsInCart.forEach((el) => {
        data.every((dataEl) => {
            if (dataEl.id === el.id) {
                price += dataEl.priceEUR * el.cnt;
            }
            return true;
        });
    });

    const subtotalPrice = document.getElementById('subtotalPrice');
    subtotalPrice.innerText = price + ' EUR';
}

function getItemTotalPrice(pricePerItem, cnt) {
    return parseFloat(pricePerItem) * parseInt(cnt);
}
