$(function () {
    const tips = [5, 10, 15, 25, 50];
    let currentTip = 0;
    let persons = 1;

    let bill = document.getElementById('bill');
    let customTip = document.getElementById('custom_tip');
    let tipRes = document.getElementById('tip_amount');
    let totalRes = document.getElementById('total_amount');
    let personNum = document.getElementById("people-num");
    let resetBtn = document.querySelector('.enable');

    //assign onclick to every button
    tips.forEach(function (value) {
        document.getElementById(value).onclick = function () {
            currentTip = value;
            customTip.value = null;
            tips.forEach(function (value) {
                document.getElementById(value).classList.remove('active');
            })
            document.getElementById(value).classList.add('active');
            showResult();
        }
    });


    bill.onkeyup = function () {
        let result = calculate(this.value, currentTip, persons)
        tipRes.innerHTML = '$' + result.tipPerson.toFixed(2);
        totalRes.innerHTML = '$' + result.totalPerson.toFixed(2);
        resetBtn.disabled = false;
    }
    customTip.onkeyup = function () {
        currentTip = this.value;
        showResult();
        tips.forEach(function (value) {
            document.getElementById(value).classList.remove('active');
        })
        resetBtn.disabled = false;

    }
    personNum.onkeyup = function () {
        persons = this.value;
        if (this.value === '') {
            console.log('we are here');
            persons = 1;
        }
        console.log(persons);
        showResult();
        resetBtn.disabled = false;
    }

    resetBtn.onclick = function () {
        bill.value = '';
        customTip.value = null;
        personNum.value = ''
        currentTip = 0;
        persons = 1;
        tipRes.innerHTML = '$0.00';
        totalRes.innerHTML = '$0.00';
        this.disabled = true;
    }

    function calculate(bill, tip, no_persons) {
        let totalTip = bill * tip / 100;
        let totalBill = totalTip + Number(bill);
        let tipPerPerson = totalTip / no_persons;
        let totalPerPerson = totalBill / no_persons;
        return { tipPerson: tipPerPerson, totalPerson: totalPerPerson };
    }
    function showResult(){
        if (bill.value != null) {
            let result = calculate(bill.value, currentTip, persons)
            tipRes.innerHTML = '$' + result.tipPerson.toFixed(2);
            totalRes.innerHTML = '$' + result.totalPerson.toFixed(2);
        }
    }
});