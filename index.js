const cartSpan = document.querySelector('#nav-right>span');
let total = 0;
let cartAmount = 0;
let counterBtn1 = 0;
let counterBtn2 = 0;
let counterBtn3 = 0;

function removeCart(id) {
    switch (id) {
        case "switch-li":
            cartAmount -= counterBtn1;
            cartSpan.innerHTML = cartAmount;
            document.getElementById('cart-situation').innerHTML = `You have ${cartAmount} items in your cart.`
            total -= 250 * counterBtn1;
            document.getElementById('amount').innerHTML = total;
            counterBtn1 = 0;
            break;
        case "ps4-li":
            cartAmount -= counterBtn2;
            cartSpan.innerHTML = cartAmount;
            document.getElementById('cart-situation').innerHTML = `You have ${cartAmount} items in your cart.`
            total -= 350 * counterBtn2;
            document.getElementById('amount').innerHTML = total;
            counterBtn2 = 0;
            break;
        case "psone-li":
            cartAmount -= counterBtn3;
            cartSpan.innerHTML = cartAmount;
            document.getElementById('cart-situation').innerHTML = `You have ${cartAmount} items in your cart.`
            total -= 50 * counterBtn3;
            document.getElementById('amount').innerHTML = total;
            counterBtn3 = 0;
            break;
    }
    document.getElementById(id).remove();
    if (total === 0) {
        document.querySelector('#cart-bottom>button').style.display = "none";
        document.getElementById('cart-situation').innerHTML = `Your cart is empty`
        cartSpan.innerHTML = "Empty";
    }
}

function addCart(price, counterSelector, nameConsole, idLi, idAmount, idTotal, idDelete) {
    let counter;
    switch (counterSelector) {
        case 1:
            counter = counterBtn1;
            break;
        case 2:
            counter = counterBtn2;
            break;
        case 3:
            counter = counterBtn3;
            break;
    }
    if (counter === 0) {
        if (total === 0) {
            document.querySelector('#cart-bottom>button').style.display = "block";
        }
        const li = document.createElement('li');
        li.innerHTML = `${nameConsole} - Price: ${price}$ - Amount: <span>1</span> - Total: <span>${price}</span>$ <span>X</span>`;
        document.getElementById('cart-list').append(li);
        li.setAttribute('id', idLi);
        document.querySelector(`#${idLi}>span:first-child`).setAttribute('id', idAmount);
        document.querySelector(`#${idLi}>span:nth-child(2)`).setAttribute('id', idTotal);
        document.querySelector(`#${idLi}>span:last-child`).setAttribute('id', idDelete);
        document.querySelector(`#${idLi}>span:last-child`).setAttribute('class', "delete");
        document.getElementById(idDelete).addEventListener('click', () => {
            removeCart(idLi);
        });
        cartAmount++;
        cartSpan.innerHTML = cartAmount;
        document.getElementById('cart-situation').innerHTML = `You have ${cartAmount} items in your cart.`
        total += price;
        document.getElementById('amount').innerHTML = total;
        switch (counterSelector) {
            case 1:
                counterBtn1++;
                break;
            case 2:
                counterBtn2++;
                break;
            case 3:
                counterBtn3++;
                break;
        }
    } else {
        switch (counterSelector) {
            case 1:
                counterBtn1++;
                document.getElementById(idAmount).innerHTML = counterBtn1;
                document.getElementById(idTotal).innerHTML = counterBtn1 * price;
                break;
            case 2:
                counterBtn2++;
                document.getElementById(idAmount).innerHTML = counterBtn2;
                document.getElementById(idTotal).innerHTML = counterBtn2 * price;
                break;
            case 3:
                counterBtn3++;
                document.getElementById(idAmount).innerHTML = counterBtn3;
                document.getElementById(idTotal).innerHTML = counterBtn3 * price;
                break;
        }
        cartAmount++;
        cartSpan.innerHTML = cartAmount;
        document.getElementById('cart-situation').innerHTML = `You have ${cartAmount} items in your cart.`
        total += price;
        document.getElementById('amount').innerHTML = total;
    }
}

function secondPage() {
    document.getElementById('item-container').remove();
    document.querySelector('aside').remove();
    document.getElementById('nav-left').remove();
    document.getElementById('nav-right').remove();
    const newNav = document.createElement('h1');
    newNav.innerHTML = "Complete your Purchase";
    document.querySelector('nav').style.justifyContent = "center";
    document.querySelector('nav').append(newNav);
    newNav.style.textAlign = "center";
    const form = document.createElement('form');
    form.innerHTML = `<h1>Leave your email address<br /> in order to complete your purchase</h1>
    <h2>Amount to be paid: ${total}$</h2>
    <div>
    <label for="email">Email :</label>
    <input type="email" id="email" name="email">
    </div>
    <button type="button">Send</button>`;
    document.querySelector('main').style.justifyContent = "center";
    document.querySelector('main').append(form);
    document.querySelector('button').addEventListener('click', () => {
        const email = document.querySelector('input').value;
        if (!email.includes('@') || email.length <= 5) {
            alert('Please enter a valid email');
            return;
        }
        form.remove();
        const thankYou = document.createElement('h1');
        thankYou.innerHTML = `Thank you<br />We will contact you at<br />${email}`;
        thankYou.style.textAlign = 'center';
        document.querySelector('main').append(thankYou);
    });
}
document.getElementById('btn-1').addEventListener('click', () => {
    addCart(250, 1, "Nintendo Switch", "switch-li", "switch-amount", "switch-total", "switch-delete");
});
document.getElementById('btn-2').addEventListener('click', () => {
    addCart(350, 2, "Playstation 4", "ps4-li", "ps4-amount", "ps4-total", "ps4-delete");
});
document.getElementById('btn-3').addEventListener('click', () => {
    addCart(50, 3, "Playstation 1", "psone-li", "psone-amount", "psone-total", "psone-delete");
});
document.querySelector('#nav-right>i').addEventListener('click', () => {
    document.querySelector('aside').classList.toggle("open-side");
});
document.querySelector('#cart-bottom>button').addEventListener('click', () => {
    secondPage();
});