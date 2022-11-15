window.onload = function () {

    var modal = document.getElementById('modal-img');

    var img = document.getElementById('post-img');
    var modalImg = document.getElementById("img-content");
    var captionText = document.getElementById("caption");
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }
} 
