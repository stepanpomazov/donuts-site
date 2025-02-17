document.addEventListener('DOMContentLoaded', () => {
    const headerNavLinks = document.querySelectorAll('.link_style');


    const handleClickHeaderNavLinks = (event) => {
        event.preventDefault();
        event.target.classList.add('link_style_clicked');
    };

    const handleMouseIn = (event) => {
        event.target.classList.add('link_style_hovered');
    };

    const handleMouseOut = (event) => {
        event.target.classList.remove('link_style_hovered');
    };


    headerNavLinks.forEach((headerLink) => {
        headerLink.addEventListener('mouseover', handleMouseIn);
        headerLink.addEventListener('mouseout', handleMouseOut);
        headerLink.addEventListener('click', handleClickHeaderNavLinks);

    });

    const headerIcons = document.querySelectorAll('.header_login-cart_styles');

    const handleClickHeaderIcons = (event) => {
        event.preventDefault();
        event.target.classList.add('header_login-cart_styles_clicked');
    };

    headerIcons.forEach((headerIcon) => {
        headerIcon.addEventListener('click', handleClickHeaderIcons);
    });

    const items = document.querySelectorAll(".carousel-card-wrapper");
    const prevBtn = document.querySelector(".carousel-nav-left");
    const nextBtn = document.querySelector(".carousel-nav-right");

    let currentIndex = 0;
    let itemsToShow = 1;

    function updateItemsToShow() {
        const width = window.innerWidth;
        if (width < 600) {
            itemsToShow = 1; // Мобильная версия
        } else if (width < 900) {
            itemsToShow = 2;
        } else if (width < 1171) {
            itemsToShow = 3;
        } else {
            itemsToShow = 4; // Компьютерная версия
        }
    }

    function showItem() {
        items.forEach((item) => {
            item.style.display ="none";
        })
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.style.display = "block";
                console.log('if', index, items.length);
                let countOfItem = 1
                while (countOfItem <itemsToShow)
                {
                    if (index+1<=items.length-1)
                    { items[index+1].style.display = "block";}
                    else {items[index+1-items.length].style.display = "block";}
                    index++;
                    countOfItem++;
                    console.log('while','index++', index, 'count++', countOfItem);
                }
            }
        });
    }

    /*    if (index >= currentIndex && index < currentIndex + itemsToShow) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    }*/


    function showNextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }


    function showPrevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    prevBtn.addEventListener("click", showPrevItem);
    nextBtn.addEventListener("click", showNextItem);

    let startX = 0;
    let endX = 0;

    items.forEach((item) => {
        item.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        item.addEventListener('touchmove', (event) => {
            endX = event.touches[0].clientX;
        });

        item.addEventListener('touchend', () => {
            if (startX > endX + 50) {
                showNextItem();
            } else if (startX < endX - 50) {
                showPrevItem();
            }
        });
    });

    // Инициализация
    updateItemsToShow();
    showItem();

    // Обновляем количество отображаемых карточек при изменении размера окна
    window.addEventListener('resize', () => {
        updateItemsToShow(itemsToShow);
        showItem();
    });
});
