const ITEMSPERPAGE = 20; // 4 by 5 gird
productsUrl = 'products.json';
window.onload = () => {
    const products = document.getElementById('products');
    if (!products) {
        console.log('There was an error selectring products!');
    }
    // Get url params
    const urlQuery = window.location.search;
    const urlParams = new URLSearchParams(urlQuery);
    console.log(urlParams);
    //      Page
    let page;
    if (urlParams.has('page')) {
        page = urlParams.get('page');
    } else {
        page = 1;
    }
    //      Tag
    let tag;
    if (urlParams.has('tag')) {
        tag = urlParams.get('tag');
    } else {
        tag = 'all';
    }
    const selectedTag = document.getElementById(tag);
    console.log(selectedTag);
    selectedTag.setAttribute('selected', 'selected');
    //      Order By
    let order;
    if (urlParams.has('order')) {
        order = urlParams.get('order');
    } else {
        order = 'alphabetic';
    }
    const selectedOrder = document.getElementById(order);
    console.log(selectedOrder);
    selectedOrder.setAttribute('selected', 'selected');

    const tagActive = document.getElementById('tag');
    const orderBy = document.getElementById('orderBy');
    tagActive.addEventListener('change', () => {
        goToNewLink(tagActive, orderBy);
    });
    orderBy.addEventListener('change', () => {
        goToNewLink(tagActive, orderBy);
    });

    function goToNewLink(tagActive, orderBy) {
        window.location.replace(
            'products.html?page=1' +
                '&tag=' +
                tagActive.value +
                '&order=' +
                orderBy.value
        );
    }
    // console.log('Get and use data from', productsUrl, tag, order);
    getAndUseDataFromJSON(productsUrl, tag, order);

    // Display items by page
    async function getAndUseDataFromJSON(url, tag, order) {
        const result = await fetch(url);
        const data = await result.json();
        let newData = [];
        // NewData has the elements containing the selected tag
        data.forEach((el) => {
            // console.log(el);
            if (tag === 'all' || el.tags.includes(tag)) {
                newData.push(el);
            }
        });
        // Ordering newData by the order value
        switch (order) {
            case 'alphabetic':
                newData.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    else return -1;
                });
                break;
            case 'priceAsc':
                newData.sort((a, b) => {
                    if (a.priceEUR > b.priceEUR) return 1;
                    else return -1;
                });
                break;
            case 'priceDesc':
                newData.sort((a, b) => {
                    if (a.priceEUR > b.priceEUR) return -1;
                    else return 1;
                });
                break;
        }
        displayData(newData, page);
        displayPageBar(newData, tag, order);
    }

    function displayPageBar(data, tag, order) {
        // Diplay pageBar
        const pageBarContainer = document.getElementById('pageBar');
        if (!pageBarContainer) {
            console.log('There was an error selectring the page bar!');
        }
        const maxPage = Math.ceil(data.length / ITEMSPERPAGE);
        const pageBarArr = createPageBar(page, maxPage, tag, order);
        pageBarArr.forEach((element) => {
            pageBarContainer.appendChild(element);
        });
    }
};

function displayData(data, page) {
    // console.log(data);
    let currProduct = 0;
    data.forEach((p) => {
        currProduct++;
        if (
            (page - 1) * ITEMSPERPAGE < currProduct &&
            currProduct <= page * ITEMSPERPAGE
        ) {
            // console.log('bag', p, 'in', products);
            generateProduct(p.id, p.name, p.priceEUR, p.imgSrc, products);
        }
    });
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
    product.appendChild(pBtn);
}

// Function that returns the page bar html object
function createPageBar(currPage, maxPage, appliedTag, appliedOrder) {
    currPage = parseInt(currPage);
    maxPage = parseInt(maxPage);
    // Fuction that creates div with h3 containing text
    function createPageBarElement(n, selected = false) {
        const link = document.createElement('a');
        const cont = document.createElement('div');
        const text = document.createElement('h3');
        link.setAttribute(
            'href',
            'products.html?page=' +
                n +
                '&tag=' +
                appliedTag +
                '&order=' +
                appliedOrder
        );
        text.innerText = n;
        if (selected) {
            cont.setAttribute('id', 'selected');
        }
        cont.appendChild(text);
        if (!isNaN(n)) {
            link.appendChild(cont);
            return link;
        } else {
            cont.appendChild(text);
            return cont;
        }
    }

    let pageArr = [];
    switch (true) {
        // Cand nu ne trebuie '...'
        case maxPage <= 5:
            for (let i = 1; i <= maxPage; i++) {
                if (currPage === i) {
                    pageArr.push(createPageBarElement(i, true));
                } else {
                    pageArr.push(createPageBarElement(i));
                }
            }
            break;
        // Cand ne trebuie '...'
        case maxPage > 5:
            switch (true) {
                case currPage === 1:
                    pageArr.push(createPageBarElement(1, true));
                    pageArr.push(createPageBarElement(2));
                    pageArr.push(createPageBarElement(3));
                    pageArr.push(createPageBarElement(4));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(maxPage));
                    break;
                case currPage === 2:
                    pageArr.push(createPageBarElement(1));
                    pageArr.push(createPageBarElement(2, true));
                    pageArr.push(createPageBarElement(3));
                    pageArr.push(createPageBarElement(4));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(maxPage));
                    break;
                case currPage === 3:
                    pageArr.push(createPageBarElement(1));
                    pageArr.push(createPageBarElement(2));
                    pageArr.push(createPageBarElement(3, true));
                    pageArr.push(createPageBarElement(4));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(maxPage));
                    break;
                case currPage === maxPage:
                    pageArr.push(createPageBarElement(1));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(maxPage - 1));
                    pageArr.push(createPageBarElement(maxPage, true));
                    break;
                case currPage === maxPage - 1:
                    pageArr.push(createPageBarElement(1));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(maxPage - 2));
                    pageArr.push(createPageBarElement(maxPage - 1, true));
                    pageArr.push(createPageBarElement(maxPage));
                    break;
                default:
                    // Nici una
                    pageArr.push(createPageBarElement(1));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(currPage - 1));
                    pageArr.push(createPageBarElement(currPage, true));
                    pageArr.push(createPageBarElement(currPage + 1));
                    pageArr.push(createPageBarElement('. . .'));
                    pageArr.push(createPageBarElement(maxPage));
                    break;
            }
    }

    return pageArr;
}
