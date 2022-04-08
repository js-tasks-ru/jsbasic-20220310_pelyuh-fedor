function toggleText() {
  const toggleTextButton = document.querySelector('.toggle-text-button');
  const textBlock = document.getElementById('text');
  toggleTextButton.addEventListener('click', function () {
    textBlock.hidden = !textBlock.hidden;
  });
}
