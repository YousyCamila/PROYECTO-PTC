document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".menu-link");
    const content = document.getElementById("content");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const url = link.getAttribute("href");

            fetch(url)
                .then(response => response.text())
                .then(data => {
                    content.innerHTML = data;
                })
                .catch(error => console.error('Error:', error));
        });
    });
});


