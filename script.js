document.addEventListener('DOMContentLoaded', () => {
  const videoWrap = document.querySelector('.video-wrap');
  const video = document.getElementById('introVideo');
  const toggleBtn = document.getElementById('soundToggle');
  const iconMuted = toggleBtn.querySelector('.icon-muted');
  const iconUnmuted = toggleBtn.querySelector('.icon-unmuted');

  let userWantsSound = false;
  let autoMuted = false;

  function updateIcons() {
    iconMuted.style.display = video.muted ? 'block' : 'none';
    iconUnmuted.style.display = video.muted ? 'none' : 'block';
    toggleBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  }

  video.play().catch((err) => console.warn('Autoplay was blocked:', err));

  toggleBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    userWantsSound = !video.muted;
    autoMuted = false;
    video.play().catch((err) => console.warn('Play after toggle blocked:', err));
    updateIcons();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          if (!video.muted) {
            video.muted = true;
            autoMuted = true;
          }
        } else if (autoMuted && userWantsSound) {
          video.muted = false;
          autoMuted = false;
        }
        updateIcons();
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(videoWrap);
  updateIcons();
});
