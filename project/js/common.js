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

    let total = document.querySelector('.choose__value span');
    let bonus = document.querySelector('input[type="checkbox"');
    let handle;

    setTimeout(function() {
        handle = document.querySelector('.noUi-handle');
        handle.classList.add('bronze');
    }, 0)

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
        },
        pips: {
            mode: 'values',
            values: [250, 1000, 3000, 5000],
            density: 4,
            format: {
                to: function(val) {
                    return `$${val}`
                }
            }
        }
    });

    // Settings
    let amount = document.querySelector('.choose__last span');

    let blocksValues = {
        bronze: 1500,
        silver: 3000,
        gold: slider.noUiSlider.options.range.max
    }

    let result = 0;

    slider.noUiSlider.on('change', function () {
        result = Math.round(slider.noUiSlider.get());
        setValueToInput(result);
        checkValues(result);
        activeBonus()
     });


    let inputValue = document.querySelector('.choose__input');
    inputValue.addEventListener('keyup', function() {
        result = this.value;
        setValueToSlider(result);
        checkValues(result);
        activeBonus()
    })

    bonus.addEventListener('click', function() {
        activeBonus();
    });

    function setValueToInput(result) {
        inputValue.value = result;
        amount.innerHTML = result;
    };

    function setValueToSlider(result) {
        slider.noUiSlider.set(result);
        amount.innerHTML = result;
    }

    function checkValues(result, h) {
        if (result < blocksValues.bronze) {
            clearActive();
            bronze.classList.add('active');

            handle.classList.add('bronze');
            handle.classList.remove('silver');
            handle.classList.remove('gold');
        } else if (result < blocksValues.silver) {
            clearActive();
            silver.classList.add('active');

            handle.classList.add('silver');
            handle.classList.remove('bronze');
            handle.classList.remove('gold');
        } else {
            clearActive();
            gold.classList.add('active');

            handle.classList.add('gold');
            handle.classList.remove('silver');
            handle.classList.remove('bronze');
        }
    }

    function activeBonus() {
        total.innerHTML = result;

        if (bonus.checked) {
            total.innerHTML = result * 2;    
        }
    }

    function clearActive() {
        for (let el of blocks) {
            el.classList.remove('active');
        }
    }


    // Methods
    let methods = document.querySelectorAll('.choose__method');
    for (let el of methods) {
        el.addEventListener('click', function() {
            for (el of methods) {
                el.classList.remove('active');
            }
            this.classList.add('active');
        })
    }
    
});