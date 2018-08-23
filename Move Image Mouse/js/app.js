const container = document.querySelector('.container');

function moveBackground(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // quanto maior o número que será divido a largura/altura da janela, maior o movimento
  let calculatedX = mouseX / (window.innerWidth / 3);
  let calculatedY = mouseY / (window.innerHeight / 3);

  container.style.transform = `translate(-${calculatedX}%, -${calculatedY}%)`;
};

container.addEventListener("mousemove", moveBackground);