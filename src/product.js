window.onload = () => {
    const urlQuery = window.location.search;
    console.log(urlQuery);
    const urlParams = new URLSearchParams(urlQuery);
    console.log(urlParams);
    loadPage(urlParams.get('product'));
};

async function loadPage(param) {
    const fetchData = await fetch('./products.json');
    const data = await fetchData.json();
    console.log('data', data);
    let pageFound = false;
    data.every((el) => {
        console.log('check', el.id, '===', param);
        if (el.id === param) {
            pageFound = true;
            loadPageForProduct(el);
            return false;
        }
        return true;
    });
    if (pageFound === false) {
        loadNotFoundPage();
    }
}

function loadPageForProduct(objToLoad) {
    console.log('Loading: ', objToLoad);
    // Load Img
    const img = document.getElementById('productImg');
    img.children[0].setAttribute('src', objToLoad.imgSrc);
    console.log(img);
    // Load Name
    const name = document.getElementById('productName');
    name.children[0].innerText = objToLoad.name;
    // Load Price
    const price = document.getElementById('productPrice');
    price.children[0].innerText = objToLoad.priceEUR + ' EUR';
    // Load Description
    const desc = document.getElementById('productDescription');
    desc.children[0].innerText = objToLoad.description;
}

function loadNotFoundPage() {
    // Empty page
    const container = document.getElementById('container');
    container.innerHTML = '';

    // Create container
    const pageNotFoundContainer = document.createElement('div');
    pageNotFoundContainer.setAttribute('id', 'pageNF');
    container.appendChild(pageNotFoundContainer);

    // Create text
    const pageNFText = document.createElement('h1');
    pageNFText.innerText = 'The page you are looking for does not exist.';
    pageNotFoundContainer.appendChild(pageNFText);

    // Create div for img
    const pageNFImgDiv = document.createElement('div');
    pageNFImgDiv.setAttribute('id', 'pageNFImgDiv');
    pageNotFoundContainer.appendChild(pageNFImgDiv);

    //  Craete img
    const pageNFImg = document.createElement('img');
    pageNFImg.setAttribute('src', '../img/pagenf.svg');
    pageNFImgDiv.appendChild(pageNFImg);
}
