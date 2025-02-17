const linkMenus = document.querySelectorAll('.links_dinamic');

linkMenus.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetUrl = link.getAttribute('data-url');
        console.log(`target href: ${targetUrl}`);
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});

