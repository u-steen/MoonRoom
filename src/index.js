window.onload = () => {
    const container = document.getElementById('cardContainer');
    loadRandomProducts(container, 4);
};

async function loadRandomProducts(container, cnt) {
    const fetchedData = await fetch('products.json');
    const data = await fetchedData.json();
    console.log(data);

    for (let i = 0; i < cnt; i++) {
        const index = Math.floor(Math.random() * data.length);
        generateProduct(
            data[index].id,
            data[index].name,
            data[index].priceEUR,
            data[index].imgSrc,
            container
        );
        console.log('before remove', data);
        data.splice(index, 1);
        console.log('after remove', data);
    }
}

function generateProduct(id, name, price, imgSrc, container) {
    const product = document.createElement('div');
    product.classList.add('product');
    container.appendChild(product);

    const pImg = document.createElement('img');
    pImg.setAttribute('src', imgSrc);
    product.appendChild(pImg);

    const pNameDiv = document.createElement('div');
    pNameDiv.setAttribute('id', 'pNameDiv');
    product.appendChild(pNameDiv);

    const pName = document.createElement('h2');
    pName.innerText = name;
    pNameDiv.appendChild(pName);

    const pPriceDiv = document.createElement('div');
    pPriceDiv.setAttribute('id', 'pPriceDiv');
    product.appendChild(pPriceDiv);

    const pPrice = document.createElement('h2');
    pPrice.innerText = price + ' EUR';
    pPriceDiv.appendChild(pPrice);

    const pBtn = document.createElement('button');
    pBtn.innerText = 'Add to Cart';
    pBtn.addEventListener('click', () => {
        addToCart(id);
    });
    product.appendChild(pBtn);

    const pViewPageDiv = document.createElement('div');
    pViewPageDiv.setAttribute('class', 'pViewPageDiv');
    product.appendChild(pViewPageDiv);
    const viewPage = document.createElement('a');
    viewPage.setAttribute('href', './product.html?product=' + id);
    pViewPageDiv.appendChild(viewPage);
    const viewPageBtn = document.createElement('button');
    viewPageBtn.innerText = 'View Page';
    viewPage.appendChild(viewPageBtn);
}

function addToCart(id) {
    // If storage in local storage does not exist, create it
    if (!localStorage.getItem('productsInCart')) {
        localStorage.setItem('productsInCart', '[]');
    }
    // Get the current products from cart
    const productsInCart = localStorage.getItem('productsInCart');
    // console.log('productsInCart', productsInCart);
    const productsArray = JSON.parse(productsInCart);

    if (checkItemInProducts(id, productsArray)) {
        increaseCount(id, productsArray);
    } else {
        // If the product doesn't exist, insert is with cnt 1
        productsArray.push({ id: id, cnt: 1 });
    }
    localStorage.setItem('productsInCart', JSON.stringify(productsArray));
    addedItemAlert();

    function addedItemAlert() {
        // Create alarm
        const alert = document.createElement('div');
        alert.classList.add('alert');
        document.querySelector('body').append(alert);

        const textDiv = document.createElement('div');
        textDiv.classList.add('confirmationTextDiv');
        alert.appendChild(textDiv);

        const text = document.createElement('p');
        text.classList.add('confirmationText');
        text.innerText = 'The item was added to the cart!';
        textDiv.appendChild(text);

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('okBtn');
        cancelBtn.innerText = 'OK';
        alert.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', (e) => {
            removeAlarm(e.target.parentNode, e.target.parentNode.parentNode);
        });

        const timeout = setTimeout(() => {
            removeAlarm(alert, document.querySelector('body'));
        }, 2000);

        function removeAlarm(alarm, alarmParent) {
            console.log(alarm, alarmParent);
            alarmParent.removeChild(alarm);
            clearTimeout(timeout);
        }
    }
}

// Checks if an item is already in products
function checkItemInProducts(itemId, allItems) {
    let found = false;
    allItems.forEach((el) => {
        if (itemId === el.id) {
            found = true;
        }
    });
    return found;
}

function increaseCount(id, productsArray) {
    productsArray.forEach((el) => {
        if (el.id === id) {
            el.cnt++;
        }
    });
}
