
const showLeaf = () => {
  const block = document.createElement('div');
  block.className = `lb-mask mask-${1 + Math.round(Math.random() * 5)}`;
  document.body.appendChild(block);

  const colors = [
    'rgb(90, 191, 97)',
    'rgb(87, 186, 94)',
    'rgb(147, 226, 138)',
    'rgb(82, 166, 75)',
    'rgb(71, 179, 98)',
    'rgb(96, 186, 85)',
  ];

  block.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      block.classList.add('show');
    });
  });
}

chrome.storage.local.get('lbEnabled', (res) => {
  if (res.lbEnabled) {
    showLeaf();
  }
})

chrome.runtime.onMessage.addListener((message) => {
  if (message.leafEnabled) {
    showLeaf();
  } else {
    const block = document.querySelector('.lb-mask');
    block.classList.remove('show');
    block.addEventListener('transitionend', () => {
      block.remove();
    });
  }
})
