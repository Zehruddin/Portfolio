/**
 * =======================================
 * PROJECT DATA
 * =======================================
 * This is the single source of truth for the project data.
 * It is an array of objects, where each object represents a project.
 */
// We declare 'projects' as a constant because the array itself will not be reassigned.
// We will, however, modify its contents in the next step by adding objects to it.
const projects = [
  {
    title: "AI Financial Assistant",
    description: "Built a Gen-AI-powered assistant offering personalized financial advice, budgeting, and savings insights via a natural language interface.",
    techStack: "Technology Stack : HTML, CSS, Java Script, Java, Spring Boot, MySQL",
    imageUrl: "../images/project-placeholder-1.webp",
    liveUrl: "https://festive-clam-149.convex.app/",
    codeUrl: "https://github.com/Zehruddin/Gen-AI-Application"
  },
  {
    title: "Bank Application",
    description: "Developed a web-based banking system using Java Servlets for customer transactions and account management.",
    techStack: "Technology Stack : HTML, CSS, Java Script, Java, Servlets, MySQL",
    imageUrl: "../images/project-placeholder-2.webp",
    liveUrl: "https://festive-clam-149.convex.app/",
    codeUrl: "https://github.com/Zehruddin/Bank-web-application"
  },
  {
    title: "Employee Task Tracker",
    description: "Developed a web-based banking system using Java Servlets for customer transactions and account management.",
    techStack: "Technology Stack : HTML, CSS, Java Script, Java, Servlets, MySQL",
    imageUrl: "../images/project-placeholder-3.webp",
    liveUrl: "https://festive-clam-149.convex.app/",
    codeUrl: "https://github.com/Zehruddin/Employee_Time_Tracker"
  }
];

// Select the theme toggle checkbox
const themeToggle = document.querySelector('#theme-toggle');

// Select the root <html> element of the document
const htmlElement = document.documentElement;
// Select the container element where the project cards will be injected.
// We use '.projects-container' which is a CSS class selector.
// This gives us a direct "handle" to this specific div in the DOM.
const projectsContainer = document.querySelector('.projects-container');
// Contact form
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const renderProjects = () => {

    let allProjectsHTML = '';

  projects.forEach(project => {
  // We use a template literal (backticks ``) to create a multi-line HTML string.
  // This string represents the complete structure of a single project card.

  const projectCardHTML = `
  <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <p>${project.techStack}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>`;
      // 3. Instead of logging, we append the card's HTML to our 'allProjectsHTML' string.
    allProjectsHTML += projectCardHTML;
    });
    projectsContainer.innerHTML = allProjectsHTML;
};

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

document.addEventListener('DOMContentLoaded', () => {
  // When the DOM is ready, we call our function to render the projects.
  renderProjects();

  // Check if the contact form exists on the page before adding the listener.
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }
});