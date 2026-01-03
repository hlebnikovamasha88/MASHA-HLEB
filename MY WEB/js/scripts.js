// Увеличение фото по клику для masonry-gallery

document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelector('.masonry-gallery');
  if (!gallery) return;
  gallery.addEventListener('click', function(e) {
    const target = e.target;
    if (target.classList.contains('masonry-photo')) {
      target.classList.toggle('zoomed');
    }
  });
});
