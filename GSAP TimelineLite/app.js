document.querySelector('.cover-date').innerHTML = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

const navButton = document.querySelector('.nav-button');
const navOpen = document.querySelector('.nav-open');
const easeType = 'Power2.easeOut';
const tl = new TimelineLite({ paused: true, reversed: true });

tl.to('.cover', 1, {
  width: '60%',
  ease: easeType
})
.to('nav', 1, {
  height: '100%',
  ease: easeType
}, '-= .5')
.fromTo('.nav-open', .5, {
  opacity: 0,
  x: 50,
  ease: easeType
}, {
  opacity: 1,
  x: 0,
  onComplete: function() {
    navOpen.style.pointerEvents = 'auto'
  }
})

navButton.addEventListener('click', () => {
  // if the animation is happening, disable the default event (click)
  if(tl.isActive()) {
    e.preventDefault();
    e.stopImmediatePropagation();

    return;
  }
  toggleTween(tl)
});

function toggleTween(tween) {
  tween.reversed() ? tween.play() : tween.reverse();
}