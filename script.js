document.addEventListener('DOMContentLoaded', () => {
  const videoWrap = document.querySelector('.video-wrap');
  const video = document.getElementById('introVideo');
  const toggleBtn = document.getElementById('soundToggle');
  const iconMuted = toggleBtn.querySelector('.icon-muted');
  const iconUnmuted = toggleBtn.querySelector('.icon-unmuted');

  let manuallyMuted = false; // true only when the USER clicked mute

  function updateIcons() {
    iconMuted.style.display = video.muted ? 'block' : 'none';
    iconUnmuted.style.display = video.muted ? 'none' : 'block';
    toggleBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  }

  video.play().catch((err) => console.warn('Autoplay was blocked:', err));

  toggleBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    manuallyMuted = video.muted; // remember the user's own choice
    updateIcons();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // scrolled out — always mute, but don't touch manuallyMuted
          video.muted = true;
        } else if (!manuallyMuted) {
          // scrolled back in — only restore sound if the user didn't mute it themselves
          video.muted = false;
        }
        updateIcons();
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(videoWrap);
  updateIcons();
});



