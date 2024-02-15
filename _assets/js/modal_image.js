window.addEventListener('load', () => {
    const modal = document.getElementById('modal-img');
    const img = document.getElementById('post-img');
    const modalImg = document.getElementById('img-content');
    const captionText = document.getElementById('caption');

    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    });

    const span = document.querySelector('.close');
    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});