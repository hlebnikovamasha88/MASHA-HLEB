<<<<<<< HEAD
/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
=======
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
>>>>>>> c95f1c8618f5b9326576ca3e9b02e2476c44ebea
