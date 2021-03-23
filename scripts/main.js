console.log(history);

document.querySelector('button').addEventListener('click', handleHistoryClick);

let currentStep = 1;
function handleHistoryClick() {
  history.pushState(null, 'whatever', '/our/new/path/' + currentStep);
  currentStep++;
}

// location = 'https://scoalainformala.ro';

function language() {
  const storageName = 'selectedLanguage';
  const langToggle = document.querySelector('[data-language-toggle]');
  const radios = langToggle.querySelectorAll('[type=radio]');

  // sa vedem care e valoarea din cookie
  //     TREBUIE sa luam toate cookie-urile
  //     trebuie sa spargem acel string dupa ;
  //     trebuie sa gasim acel cookie care se numeste selectedLanguage si sa-i obtinem valoarea

  let savedValue;
  if (window.localStorage) {
    savedValue = localStorage.getItem(storageName);
  } else {
    savedValue = getValueFromCookie(storageName);
  }

  for (const radio of radios) {
    // daca value al input-ului conincide cu valoare din cookie sa setam radio-ul pe checked
    if (radio.value === savedValue) {
      radio.checked = true;
    }
    radio.addEventListener('change', handleRadioChange);
  }

  // event delegation variant
  //   langToggle.addEventListener('change', function (e) {
  //     if ((e.target.type = 'radio')) {
  //       handleRadioChange(e);
  //     }
  //   });

  function handleRadioChange(e) {
    const lang = e.target.value;

    if (window.localStorage) {
      localStorage.setItem(storageName, lang);
    } else {
      document.cookie = `${storageName}=${lang}`;
    }
  }
}
language();

function getValueFromCookie(name) {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [cName, cValue] = cookie.split('=');
    if (cName === name) {
      return cValue;
    }
  }
}

// navigator.geolocation.getCurrentPosition(console.log, console.warn);
// navigator.geolocation.watchPosition(console.log, console.warn);

function theme() {
  const storageName = 'colorTheme';

  let preferedTheme = localStorage.getItem(storageName);

  if (!preferedTheme) {
    const isLightPrefered = matchMedia('(prefers-color-scheme: light)').matches;

    preferedTheme = 'dark';
    if (isLightPrefered) {
      preferedTheme = 'light';
    }
  }

  document.body.classList.add(`color-theme-${preferedTheme}`);

  const themeChanger = document.querySelector('[name=theme]');
  themeChanger.addEventListener('change', handleThemeChange);
  themeChanger.checked = preferedTheme === 'light' ? true : false;

  function handleThemeChange(e) {
    const isLightTheme = e.target.checked;
    const themeName = isLightTheme ? 'light' : 'dark';

    document.body.classList.remove('color-theme-dark', 'color-theme-light');
    document.body.classList.add(`color-theme-${themeName}`);

    localStorage.setItem(storageName, themeName);
  }
}
theme();
