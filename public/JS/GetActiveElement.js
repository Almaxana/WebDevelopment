document.addEventListener("DOMContentLoaded", function () { // HTML, DOM, но мб нет внешних ресурсов (ex картинки)
    const currentLocation = document.location.pathname;
    const segments = currentLocation.split("/");
    const currentPage = segments[segments.length - 1];

    console.log(currentPage)


    const locationVariants = {
        "Menu.html": document.getElementById("menu"),
        "Delivery.html": document.getElementById("delivery"),
        "Booking.html": document.getElementById("booking"),
        "Login.html": document.getElementById("login"),
        "SignIn.html": document.getElementById("signIn")

    };

    // Object.values(locationVariants).forEach(link => link.classList.remove("active"));

    if (locationVariants[currentPage]) {
        locationVariants[currentPage].classList.add("active");
        console.log( locationVariants[currentPage].classList.toString())
    }
});