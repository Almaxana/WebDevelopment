// Крестик
var myNodelist = document.getElementsByTagName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Удалить item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Галочка
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        updateListToLocalStorage();
    }
}, false);

function newItem() {
    event.preventDefault();
    var item = document.createElement("li");
    item.classList.add("wish_list__item")
    var inputValue = document.getElementById("wish_list__new_item").value;
    var t = document.createTextNode(inputValue);
    item.appendChild(t);
    if (inputValue === '') {
        alert("No input text");
    } else {
        document.getElementById("wish_list_items_storage").appendChild(item);
    }
    document.getElementById("wish_list__new_item").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    item.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
    updateListToLocalStorage();
}

function updateListToLocalStorage() {
    const listItems = Array.from(document.getElementsByClassName("wish_list__item"));
    listItems.forEach((item) => {
        localStorage.setItem(
            item.textContent.slice(0, -1),
            JSON.stringify({
                text: item.textContent.slice(0, -1), // Убираем символ крестика
                checked: item.classList.contains("checked")
            })
        )
    })
}

function loadFromLocalStorage() {
    event.preventDefault();
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        var item = document.createElement("li");
        item.classList.add("wish_list__item")
        if (value["checked"]) {
            item.classList.add("checked")
        }
        var t = document.createTextNode(value["text"]);
        console.log(value["text"])
        item.appendChild(t);
        document.getElementById("wish_list_items_storage").appendChild(item);

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        item.appendChild(span);
    }
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }


}
