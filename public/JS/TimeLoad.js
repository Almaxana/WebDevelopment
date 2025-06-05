(function () {
    window.addEventListener('load', function() { // загружено полностью все
        document.getElementById('footer_content__loading_time').innerHTML = performance.now().toFixed(2) + " ms";
    });
})();