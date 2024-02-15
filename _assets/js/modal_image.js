window.onload = () => {
    let modal = document.getElementById("modal-img");
    let img = document.getElementById("post-img");
    let modalImg = document.getElementById("img-content");
    let captionText = document.getElementById("caption");

    img.onclick = () => {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };

    let span = document.getElementsByClassName("close")[0];
    span.onclick = () => {
        modal.style.display = "none";
    };
};
