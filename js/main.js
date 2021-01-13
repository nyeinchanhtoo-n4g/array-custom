let userincomeDataEL = document.getElementById('userincomeData');
let doubleIncomeEL = document.getElementById('doubleIncomeBtn');
let showMillionEL = document.getElementById('showMillionBtn');
let sortRichesEL = document.getElementById('sortRichesBtn');
let totalIncomeEL = document.getElementById('totalIncomeBtn');
let searchEL = document.getElementById('searchInput');
let addNameEL = document.getElementById('addName');
let addIncomeEL = document.getElementById('addIncome');
let addRecordBtnEL = document.getElementById('addRecortBtn');
let actionEL = document.getElementById('actionButton');

let users = [{
        "name": "Nyein Chan Htoo",
    },
    {
        "name": "Ervin Howell",
    },
    {
        "name": "Clementine Bauch",
    },
    {
        "name": "Patricia Lebsack",
    },
    {
        "name": "Chelsey Dietrich",
    },
    {
        "name": "Dennis Schulist",
    },
    {
        "name": "Kurtis Weissnat",
    },
    {
        "name": "Leanne Graham",
    },
    {
        "name": "Glenna Reichert",
    },
    {
        "name": "Clementina DuBuque",
    }
];

users = users.map((user) => {
    return {
        name: user.name,
        income: Math.floor(Math.random() * 1000000)
    }
});

function updateDom(userData) {
    userincomeDataEL.innerHTML = `
        <div class = "d-flex mb-2">
            <div class="col-5 text-left"> User </div>
            <div class="col-5 text-right pr-5"> Income </div>
            <div class="col-2 text-center">Action</div>
        </div>
        <div>
            <hr>
        </div>
    `;
    userData.forEach((user,i) => {
        const domElement = document.createElement('div');
        domElement.classList.add('d-flex','mb-2');
        domElement.innerHTML = `
            <div class="col-5 text-left">${user.name}</div>
            <div class="col-5 text-right pr-5">${formatNumber(user.income)}</div>
            <div class="col-2">
                <button onclick="actionEdit(${i})" class="btn btn-primary" data-index=${i}>
                    <i class="fa fa-edit">
                    </i>
                </button>
                <button onclick="actionDelete(${i})" class="btn btn-danger" data-index=${i}>
                    <i class="fa fa-trash">
                    </i>
                </button>
            </div>
        `;

        userincomeDataEL.appendChild(domElement); 
    });
}

function actionDelete(index){
    users.splice(index,1);
    updateDom(users)
};

function actionEdit(index) {
    alert(index)
    alert('Button is under construction')
};


function formatNumber(num) {
    return Number(num).toLocaleString('mmk');
};

updateDom(users);

doubleIncomeEL.addEventListener('click', () => {
    users = users.map((user) => {
        return {
            name: user.name,
            income: user.income * 2
        }
    });
    updateDom(users);
});

showMillionEL.addEventListener('click', () => {
    million = users.filter((user) => {
        return user.income > 1000000
    });
    updateDom(million);
});

sortRichesEL.addEventListener('click', () => {
    let sort = users.sort((sf, sl) => {
        return sl.income - sf.income
    });
    updateDom(sort);
});

totalIncomeEL.addEventListener('click', () => {
    let total = users.reduce((all, user) => (all += user.income), 0);
    let totalelement = document.createElement('div');
    totalelement.classList.add('d-flex', 'justify-content-between', 'mt-4');
    totalelement.innerHTML = `
            <div>Total</div>
            <div class="pr-3">${formatNumber(total)}</div>
    `;
    userincomeDataEL.appendChild(totalelement);
});

// Search Input Box Section

searchEL.addEventListener('input', (e) => {
    let shUser = users;
    if (e.target.value !== '') {
        let search = e.target.value.toLowerCase();
        shUser = shUser.filter(v => {
            return v.name.toLocaleLowerCase().indexOf(search) > -1;
        });
    }
    updateDom(shUser);
});


// Add New Record Section
addNameEL.value = '';
addIncomeEL.value = '';
addNameEL.addEventListener('input', () => {
    if (addNameEL.value === '') {
        alert('Please Add New Name');
    }

});

addIncomeEL.addEventListener('input', () => {
    if (addIncomeEL.value === '') {
        alert('Please Add New Income');
    }

});

addRecordBtnEL.addEventListener('click', () => {
    if (addNameEL.value !== '' && addIncomeEL.value !== '') {
        let addrec = {
            name: addNameEL.value,
            income: addIncomeEL.value
        };
        users.push(addrec);
    } else {
        alert('Please Fill Both Name and Income ')
    }
    updateDom(users);
    addNameEL.value = '';
    addIncomeEL.value = '';
});

