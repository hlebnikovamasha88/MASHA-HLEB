// Shared Lightbox for images and short videos
document.addEventListener('DOMContentLoaded', () => {
  // Ensure lightbox exists
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Close">×</button>
      <div class="lightbox__content"></div>
      <div class="lightbox__backdrop"></div>
    `;
    document.body.appendChild(lightbox);
  }

  const content = lightbox.querySelector('.lightbox__content');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const open = () => { lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); };
  const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); content.innerHTML=''; };

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__backdrop') || e.target === closeBtn) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Image lightbox on photos page
  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('.masonry-photo');
    if (!img) return;
    e.preventDefault();
    content.innerHTML = `<img src="${img.src}" alt="" style="max-width:90vw;max-height:90vh;display:block;box-shadow:0 8px 40px #0008"/>`;
    open();
  });

  // Video lightbox on short video grid
  document.body.addEventListener('click', (e) => {
    const v = e.target.closest('.short-videos-grid video');
    if (!v) return;
    e.preventDefault();
    const clone = document.createElement('video');
    clone.src = v.currentSrc || v.getAttribute('src');
    clone.controls = true; clone.autoplay = true; clone.muted = false; clone.playsInline = true;
    clone.style.maxWidth = '90vw'; clone.style.maxHeight = '90vh'; display = 'block';
    content.innerHTML = '';
    content.appendChild(clone);
    open();
  });

  // Play/pause short videos only when visible to reduce reloads on mobile
  const shortVideos = Array.from(document.querySelectorAll('.short-videos-grid video'));
  if (shortVideos.length) {
    shortVideos.forEach((v) => {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'metadata';
      v.removeAttribute('autoplay');
      v.pause();
    });

    const tryPlay = (video) => { video.play().catch(() => {}); };
    const tryPause = (video) => { video.pause(); };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            tryPlay(target);
          } else {
            tryPause(target);
          }
        });
      }, { threshold: 0.35 });
      shortVideos.forEach((v) => observer.observe(v));
    } else {
      const onScroll = () => {
        shortVideos.forEach((v) => {
          const rect = v.getBoundingClientRect();
          const visible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
          if (visible) {
            tryPlay(v);
          } else {
            tryPause(v);
          }
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
    }
  }
});
