window.onload = () => {
    const modal = document.getElementById("modal-img");
    const img = document.getElementById("post-img");
    const modalImg = document.getElementById("img-content");
    const captionText = document.getElementById("caption");

    img.onclick = () => {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };

    const span = document.getElementsByClassName("close")[0];
    span.onclick = () => {
        modal.style.display = "none";
    };
};
