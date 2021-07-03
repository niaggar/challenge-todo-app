const ChangeTheme = document.querySelector('#change-theme');

ChangeTheme.addEventListener('click', () => {
  const body = document.querySelector('body');

  if (!body.classList.contains('dark')) {
    body.classList.add('dark');
    body.classList.remove('light');
    ChangeTheme.src = './src/images/icon-sun.svg';
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    ChangeTheme.src = './src/images/icon-moon.svg';
  }
});
