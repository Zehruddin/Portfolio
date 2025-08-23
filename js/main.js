// Select the theme toggle checkbox
const themeToggle = document.querySelector('#theme-toggle');

// Select the root <html> element of the document
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
  // 1. Determine the new theme.
  const newTheme = themeToggle.checked ? 'dark' : 'light';

  // 2. Apply the new theme to the <html> element.
  htmlElement.setAttribute('data-theme', newTheme);

  // 3. Save the user's choice to localStorage.
  localStorage.setItem('theme', newTheme);
});

// ===================================
// APPLY THE SAVED THEME ON PAGE LOAD
// ===================================
// We use an Immediately Invoked Function Expression (IIFE) to run this code once on script load.
(() => {
  // 1. Check for a saved theme in localStorage.
  //    localStorage.getItem('theme') will return 'dark', 'light', or null.
  const savedTheme = localStorage.getItem('theme');

  // 2. If a saved theme exists, apply it.
  if (savedTheme) {
    // a. Apply the theme to the <html> element.
    htmlElement.setAttribute('data-theme', savedTheme);

    // b. Crucially, update the toggle switch's state to match the saved theme.
    //    If the saved theme is 'dark', we need to make sure the checkbox is checked.
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
    // No 'else' is needed because the checkbox is unchecked by default.
  }
})();