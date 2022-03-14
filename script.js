const yearConst = {
    0: { budget: 0, purchase: [] },
    1: { budget: 0, purchase: [] },
    2: { budget: 0, purchase: [] },
    3: { budget: 0, purchase: [] },
    4: { budget: 0, purchase: [] },
    5: { budget: 0, purchase: [] },
    6: { budget: 0, purchase: [] },
    7: { budget: 0, purchase: [] },
    8: { budget: 0, purchase: [] },
    9: { budget: 0, purchase: [] },
    10: { budget: 0, purchase: [] },
    11: { budget: 0, purchase: [] },
};

const time = document.getElementById('time');
const button = document.getElementById("but");
const cash = document.getElementById("myInput1");
const spisok = document.getElementById("spisok");
const all = document.getElementById("total");
const clear = document.getElementById('clear');

let purchase = [];
let sumTrat = 0;
time.value = (new Date).toISOString().slice(0,7);
let currentMonth = (new Date).getMonth();

let year = JSON.parse(localStorage.getItem('key'));
if (year === null ){
    localStorage.setItem('key', JSON.stringify(yearConst));
    year = JSON.parse(localStorage.getItem('key'));
}



purchase = year[currentMonth].purchase;
cash.value = year[currentMonth].budget;
sumTrat = purchase.reduce((acc,item) => acc + +item.amount,0);
all.innerHTML =  " Итого осталось: " + (cash.value - sumTrat) + " руб";
showItems();


function changeBudget(budget){
    year[currentMonth].budget = budget;
    localStorage.setItem('key', JSON.stringify(year));
}

clear.onclick = () => {
    spisok.innerHTML = '';
    purchase = [];
    year[currentMonth].purchase = purchase;
    all.innerHTML =  " Итого осталось: " + (cash.value) + " руб";
    localStorage.setItem('key', JSON.stringify(year));
}



function changeMonth(date) {
    const month = date.slice(5) - 1;
    year[currentMonth].purchase = purchase;
    year[currentMonth].budget = cash.value;
    purchase = year[month].purchase;
    cash.value = year[month].budget;
    currentMonth = month;
    sumTrat = purchase.reduce((acc,item) => acc + +item.amount,0);
    all.innerHTML =  " Итого осталось: " + (cash.value - sumTrat) + " руб";
    showItems();
    localStorage.setItem('key', JSON.stringify(year));
}

button.onclick = () => {
    let nameTrata = document.getElementById("good").value;
    let sumTrata = +document.getElementById("num").value;
    if (nameTrata == "" || sumTrata == ""){
        alert("Заполните поле");
    }
    else{
    purchase.push({name:nameTrata, amount:sumTrata});
    sumTrat += sumTrata;
    all.innerHTML =  " Итого осталось: " + (cash.value - sumTrat) + " руб";
    document.getElementById('good').value = '';  
    document.getElementById('num').value = '';
    showItems()
    localStorage.setItem('key', JSON.stringify(year));
    }
}

spisok.addEventListener('click',  (ev) => {
   if(ev.target.tagName === "BUTTON" && ev.target.className.includes("close")) {
    purchase.splice(ev.target.className.split(" ")[1],1);
    showItems();
    localStorage.setItem('key', JSON.stringify(year));
    }
});

function showItems(){
    spisok.innerHTML = ''
    for (let i = 0 ; i < purchase.length; i++) {
        let product = document.createElement("div");
        product.classList.add("product");
        let name2 = document.createElement("span");
        name2.className = 'item-name';
        name2.innerHTML = purchase[i].name;
        let amount2 = document.createElement("span");
        amount2.className = 'item-cost';
        amount2.innerHTML = purchase[i].amount;
        product.appendChild(name2);
        product.appendChild(amount2);
        
        let button = document.createElement('BUTTON');
        let txt = document.createTextNode("X");
        button.className = "close " + i;
        button.appendChild(txt);
        product.appendChild(button);
        
        spisok.appendChild(product);
    }
}

