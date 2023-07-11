(function () {

    // call popup
    let addExp = new Cpopup({
        btn: eById('add-exp'),
        src: eById('add-exp-popup')
    });

    let setInc = new Cpopup({
        btn: eById('set-inc'),
        src: eById('set-inc-popup')
    });

    const flash = new Flash();

    let saveBtn = eById('save');
    let saveIncBtn = eById('save-inc');
    let storage = new Storage('expenses');
    let expSaved = storage.getData('exp');


    // call multifield
    let multiRefs = eByClass('multi-field-ref');
    multiRefs[0].multifields({
        addCtrl: '.add-ctrl',
        minCtrl: '.min-ctrl',
        count: expSaved.length
    }, function (ref) {
        ref.querySelectorAll('input').forEach(function (v, k) {
            v.value = '';
        })
    }, function () {

    });

    let expMultiRefs = eByClass('exp-ref');
    expMultiRefs[0].multifields({
        count: expSaved.length
    });


    // inputs
    let inc = eById('income');
    let expNames = eByClass('exp-name');
    let expVals = eByClass('exp-val');

    let fExpNames = eByClass('f-exp-name');
    let fExpVals = eByClass('f-exp-val');
    let incomeVal = eById('income-val');
    let balVal = eById('bal-val');


    // set saved values here
    let storedIncome = storage.getData('inc');
    inc.value = storedIncome;
    incomeVal.innerText  = storedIncome;
    let totalExp = 0;
    let donutData = [];

    for (let i in expSaved) {
        let expStored = expSaved[i];
        let storedName = expStored.name;
        let storedVal = expStored.val;
        if (typeof expNames[i] !== 'undefined') {
            expNames[i].value = storedName;
        }
        if (typeof expVals[i] !== 'undefined') {
            expVals[i].value = storedVal;
        }
        if (typeof fExpNames[i] !== 'undefined') {
            fExpNames[i].innerText = storedName;
        }
        if (typeof fExpVals[i] !== 'undefined') {
            fExpVals[i].innerText = storedVal;
        }
        totalExp += parseInt(storedVal);
        let donutEachData = {};
        donutEachData.name = storedName;
        donutEachData.y = parseFloat(((storedVal * 100) / storedIncome).toFixed(2));
        donutData.push(donutEachData);
    }


    donutData.push({name: 'Balance', y: parseFloat(((storedIncome - totalExp) * 100 / storedIncome).toFixed(2))});

    balVal.innerText = (storedIncome - totalExp).toString();

    saveBtn.onclick = () => {
        let exp = {};
        let expArr = [];
        for (let i in expNames) {
            if (expNames[i] instanceof HTMLElement) {
                exp.name = expNames[i].value;
                exp.val = expVals[i].value;

                expArr.push(exp);
                exp = {};
            }
        }

        storage
            .setData(expArr, 'exp')
            .save();
        flash.addFlash('Successfully updated expenses');
        location.reload();
    }

    saveIncBtn.onclick = () => {
        storage
            .setData(inc.value, 'inc')
            .save();
        flash.addFlash('Successfully updated income');
        location.reload();
    }



    Highcharts.chart('container', {
        colors: [
            '#2b908f', // Teal
            '#f45b5b', // Red
            '#91e8e1', // Light Teal
            '#f7a35c', // Orange
            '#8085e9', // Purple
            '#f15c80', // Pink
            '#e4d354', // Yellow
            '#7cb5ec', // Light Blue
            '#434348', // Dark Gray
            '#90ed7d', // Light Green
            '#f8b500', // Gold
            '#00a7b5', // Cyan
            '#f29999', // Coral
            '#b399e6', // Lavender
            '#f2c689', // Amber
            '#70d6bc', // Mint Green
            '#ff6666', // Salmon
            '#999999', // Gray
            '#c0c0c0', // Silver
            '#ffb347'  // Peach
        ],
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Budget'
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            pie: {
                size: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{y}% {point.name}',
                    distance: '5%'
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Percentage',
            colorByPoint: true,
            innerSize: '75%',
            data: donutData
            // data: [{
            //     name: 'Nitrogen',
            //     y: 78
            // }, {
            //     name: 'Oxygen',
            //     y: 20.9
            // }, {
            //     name: 'Other gases',
            //     y: 1.1
            // }]
        }]
    });

})();