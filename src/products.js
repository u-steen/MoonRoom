const ITEMSPERPAGE = 20; // 4 by 5 gird
window.onload = () => {
    const products = document.getElementById('products');
    if (!products) {
        console.log('There was an error selectring products!');
    }
    // Get url params
    const urlQuery = window.location.search;
    const urlParams = new URLSearchParams(urlQuery);
    let page;
    if (urlParams.has('page')) {
        page = urlParams.get('page');
    } else {
        page = 1;
    }

    // Display items by page
    let currProduct = 0;
    async function getDataFromJSON(url) {
        const result = await fetch(url);
        const data = await result.json();
        // Diplay pageBar
        // first .. page-1 page page+1 .. last
        const pageBarContainer = document.getElementById('pageBar');
        if (!pageBarContainer) {
            console.log('There was an error selectring the page bar!');
        }
        const maxPage = Math.ceil(data.length / ITEMSPERPAGE);
        const pageBarArr = createPageBar(page, maxPage);
        pageBarArr.forEach((element) => {
            pageBarContainer.appendChild(element);
        });
        data.forEach((p) => {
            currProduct++;
            if (
                (page - 1) * ITEMSPERPAGE < currProduct &&
                currProduct <= page * ITEMSPERPAGE
            ) {
                generateProduct(p.id, p.name, p.priceEUR, p.imgSrc, products);
            }
        });
    }
    getDataFromJSON('products.json');
};

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
function createPageBar(currPage, maxPage) {
    currPage = parseInt(currPage);
    maxPage = parseInt(maxPage);
    // Fuction that creates div with h3 containing text
    function createPageBarElement(n, selected = false) {
        const link = document.createElement('a');
        const cont = document.createElement('div');
        const text = document.createElement('h3');
        link.setAttribute('href', 'products.html?page=' + n);
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

        return link;
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
