window.onload = () => {
    const products = document.getElementById('products');
    async function getDataFromJSON(url) {
        const result = await fetch(url);
        const data = await result.json();
        console.log(data);
        data.forEach((p) => {
            generateProduct(p.id, p.name, p.priceEUR, p.imgSrc, products);
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
