document.addEventListener("DOMContentLoaded", function() {
    // DROPDOWN
    let dropdownToggle = document.querySelector('.dropdown__toggle');
    let dropdown = document.querySelector('.dropdown');
    let listDropdown = document.querySelector('.dropdown__list');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        });
    }

    // TARGET ITEM
    let mainItem = dropdownToggle.querySelector('.dropdown__item');

    let item = listDropdown.querySelectorAll('.dropdown__item');

    for (let el of item) {
        el.addEventListener('click', click);
    }

    function click() {

        let otop = mainItem.querySelector('.dropdown__top').innerHTML;
        let omid = mainItem.querySelector('.dropdown__middle').innerHTML;
        let obal = mainItem.querySelector('.dropdown__balance').innerHTML;

        let top = this.querySelector('.dropdown__top').innerHTML;
        let mid = this.querySelector('.dropdown__middle').innerHTML;
        let bal = this.querySelector('.dropdown__balance').innerHTML;

        mainItem.querySelector('.dropdown__top').innerHTML = top;
        mainItem.querySelector('.dropdown__middle').innerHTML = mid;
        mainItem.querySelector('.dropdown__balance').innerHTML = bal;

        this.querySelector('.dropdown__top').innerHTML = otop;
        this.querySelector('.dropdown__middle').innerHTML = omid;
        this.querySelector('.dropdown__balance').innerHTML = obal;

        dropdown.classList.toggle('active')
    }


    // Blocks
    let bronze = document.querySelector('.bronze');
    let silver = document.querySelector('.silver');
    let gold = document.querySelector('.gold');

    let blocks = [bronze, silver, gold];

    // INIT SLIDER
    var slider = document.getElementById('choose__slider');

    noUiSlider.create(slider, {
        start: 250,
        connect: 'lower',
        step: 10,
        range: {
            'min': 250,
            'max': 5000
        }
    });

    // Settings
    let blocksValues = {
        bronze: 1500,
        silver: 3000,
        gold: slider.noUiSlider.options.range.max
    }

    slider.noUiSlider.on('change', function () {
        let result = Math.round(slider.noUiSlider.get());
        setValueToInput(result);
        checkValues(result);
     });


    let inputValue = document.querySelector('.choose__input');
    inputValue.addEventListener('keyup', function() {
        let result = this.value;
        setValueToSlider(result);
        checkValues(result);
    })

    function setValueToInput(result) {
        inputValue.value = result;
    };

    function setValueToSlider(result) {
        slider.noUiSlider.set(result);
    }

    function checkValues(result) {
        if (result < blocksValues.bronze) {
            clearActive();
            bronze.classList.add('active');
        } else if (result < blocksValues.silver) {
            clearActive();
            silver.classList.add('active')
        } else {
            clearActive();
            gold.classList.add('active');
        }
    }

    function clearActive() {
        for (let el of blocks) {
            el.classList.remove('active');
        }
    }
    
});