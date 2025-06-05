let isFirstFetch = true;
let id;

document.addEventListener('DOMContentLoaded', () => {
    if (isFirstFetch) {
        id = 50 + Math.floor(Math.random() * 50);
        isFirstFetch = false;
    } else {
        id = 50 - Math.floor(Math.random() * 50);
        isFirstFetch = false;
    }
    const url = "https://jsonplaceholder.typicode.com/posts/" + id.toString();
    console.log(url)
    const review_container = document.getElementById('review');
    const title = document.getElementById('review_title');
    const body = document.getElementById('review_body');

    const preloader = document.getElementById("preloader");
    preloader.classList.remove("hidden_loader");


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Что-то пошло не так");
            }
            return response.json();
        })
        .then(data => {
            preloader.classList.add("hidden_loader");
            title.innerHTML = data.title;
            body.innerHTML = data.body;
        })
        .catch(error => {
            preloader.classList.add("hidden_loader");
            review_container.innerHTML = error.message;
        });
});