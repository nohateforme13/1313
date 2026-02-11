const fileInput = document.getElementById('file-upload');
const preview = document.getElementById('idImagePreview');
const placeholder = document.getElementById('uploadPlaceholder');
const container = document.getElementById('imageContainer');
const zoomModal = document.getElementById('zoomModal');
const zoomedImg = document.getElementById('zoomedImg');

// 1. ПРОВЕРКА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
window.onload = () => {
    const savedImage = localStorage.getItem('idCardBase64');
    if (savedImage) {
        showImage(savedImage);
    }
};

// 2. ОБРАБОТКА ЗАГРУЗКИ ФАЙЛА
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64String = e.target.result;
            localStorage.setItem('idCardBase64', base64String); // Сохраняем в память браузера
            showImage(base64String);
        };
        reader.readAsDataURL(file);
    }
});

function showImage(src) {
    preview.src = src;
    container.style.display = 'block';
    placeholder.style.display = 'none';
}

function deleteImage() {
    localStorage.removeItem('idCardBase64');
    container.style.display = 'none';
    placeholder.style.display = 'flex';
    fileInput.value = "";
}

// 3. ЛОГИКА ЗУМА
preview.onclick = () => {
    zoomModal.style.display = "flex";
    zoomedImg.src = preview.src;
    document.body.style.overflow = "hidden"; // Запрещаем скролл фона
};

function closeZoom() {
    zoomModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Закрытие зума по клику на темный фон
zoomModal.onclick = (e) => {
    if (e.target === zoomModal) closeZoom();
};