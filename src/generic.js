$(document).ready(function () {
    $('header').load('header.html', () => {
        addBubble();
    });
    $('footer').load('footer.html');
});

function addBubble() {
    const bubble = document.createElement('div');
    bubble.setAttribute('id', 'bubble');
    bubble.innerText = getItemsInCartCnt();
    if (bubble.innerText === '0') {
        bubble.style.display = 'none';
    }
    if (parseInt(bubble.innerText) >= 100) {
        bubble.style.width = '40px';
    }
    // TODO: is there a better method?
    setInterval(() => {
        bubble.innerText = getItemsInCartCnt();
        console.log(bubble.innerText);
        if (bubble.innerText === '0') {
            bubble.style.display = 'none';
        } else {
            bubble.style.display = 'flex';
        }
        if (parseInt(bubble.innerText) >= 100) {
            bubble.style.width = '40px';
        } else {
            bubble.style.width = '25px';
        }
    }, 1500);
    $('#cartBtn')[0].append(bubble);
}

function getItemsInCartCnt() {
    const items = JSON.parse(localStorage.getItem('productsInCart'));
    let length = 0;
    items.forEach((el) => {
        length += parseInt(el.cnt);
    });
    return length;
}
