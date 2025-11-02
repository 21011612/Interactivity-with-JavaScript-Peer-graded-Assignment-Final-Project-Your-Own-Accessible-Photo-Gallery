/* Accessible interactive gallery */

function upDate(previewPic) {
  console.log('upDate() triggered', { alt: previewPic.alt, src: previewPic.src });

  const imageBox = document.getElementById('image');
  imageBox.style.backgroundImage = `url('${previewPic.src}')`;
  imageBox.textContent = previewPic.alt;
  imageBox.setAttribute('aria-label', previewPic.alt);

  // trạng thái đang chọn (hỗ trợ SR khi tab qua ảnh)
  document.querySelectorAll('.preview[aria-current="true"]')
    .forEach(el => el.removeAttribute('aria-current'));
  previewPic.setAttribute('aria-current', 'true');
}

function unDo() {
  console.log('unDo() triggered');
  const imageBox = document.getElementById('image');
  imageBox.style.backgroundImage = "url('')";
  imageBox.textContent = "Hover over an image below to display here.";
  imageBox.removeAttribute('aria-label');

  document.querySelectorAll('.preview[aria-current="true"]')
    .forEach(el => el.removeAttribute('aria-current'));
}

/* onload: tự thêm tabindex + gắn keyboard handlers cho Enter/Space */
function initTabIndex() {
  console.log('initTabIndex() onload');

  const thumbs = document.querySelectorAll('.preview');

  thumbs.forEach(img => {
    // tự gán tabindex để có thể focus bằng bàn phím
    if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');

    // keyboard: Enter/Space -> upDate; Escape -> unDo
    img.addEventListener('keydown', (e) => {
      const k = e.key; // 'Enter', ' ' (Space), 'Escape'
      if (k === 'Enter' || k === ' ') {
        e.preventDefault();
        upDate(img);
      } else if (k === 'Escape') {
        unDo();
      }
    });
  });
}
