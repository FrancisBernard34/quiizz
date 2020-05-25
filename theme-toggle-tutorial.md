# Theme Toggle Implementation Tutorial

This tutorial explains how to implement a light/dark theme toggle in your web projects, based on the implementation from the Quiizz application.

## Overview

The theme toggle consists of three main components:

1. **HTML Structure**: A toggle switch with sun and moon icons
2. **CSS Styling**: Variables for light and dark themes with smooth transitions
3. **JavaScript Logic**: Event listeners and local storage for theme persistence

## HTML Structure

Add this HTML code to your project to create the toggle switch:

```html
<div class="theme-toggle">
  <i class="fas fa-sun"></i>
  <label class="switch">
    <input type="checkbox" id="theme-switch" />
    <span class="slider round"></span>
  </label>
  <i class="fas fa-moon"></i>
</div>
```

This creates a toggle switch with sun and moon icons on either side. You'll need to include Font Awesome for the icons:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
```

## CSS Styling

### 1. Define CSS Variables

First, define CSS variables for both light and dark themes:

```css
:root {
  /* Common variables */
  --primary-color: #ff8c00; /* Orange */
  --primary-hover: #e67e00;
  --transition-speed: 0.3s;
  --border-radius: 12px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Light theme variables */
  --light-bg: #f5f5f5;
  --light-text: #333;
  --light-element-bg: #fff;
  --light-border: #ddd;

  /* Dark theme variables */
  --dark-bg: #222;
  --dark-text: #f5f5f5;
  --dark-element-bg: #333;
  --dark-border: #444;
}
```

### 2. Set Up Theme Classes

Create classes for light and dark modes:

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}

body.light-mode {
  background-color: var(--light-bg);
  color: var(--light-text);
}

body.dark-mode {
  background-color: var(--dark-bg);
  color: var(--dark-text);
}
```

### 3. Style the Toggle Switch

```css
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-toggle i {
  font-size: 1.2rem;
}

.fa-sun {
  color: #ffb700;
}

.fa-moon {
  color: #6b6b6b;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
```

### 4. Add Dark Mode Variants for Components

For any components that need different styling in dark mode, add specific dark mode selectors:

```css
.screen {
  background-color: var(--light-element-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: background-color var(--transition-speed);
}

.dark-mode .screen {
  background-color: var(--dark-element-bg);
}

/* Add similar overrides for other components */
```

## JavaScript Implementation

Add this JavaScript code to handle the theme toggle functionality:

```javascript
const themeSwitch = document.getElementById("theme-switch");

// Toggle theme when switch is clicked
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Save preference to localStorage
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

// Load saved theme preference when page loads
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    themeSwitch.checked = true;
  }
});
```

## Integration Steps

1. **Add the HTML**: Place the theme toggle HTML in your header or navigation area
2. **Include the CSS**: Add the CSS variables and styles to your stylesheet
3. **Add the JavaScript**: Include the JavaScript code in your main script file
4. **Set Initial Class**: Make sure your `<body>` tag has the initial class: `<body class="light-mode">`
5. **Test**: Verify that the toggle works and that the theme preference is saved between page reloads

## Customization

- **Colors**: Modify the CSS variables to match your project's color scheme
- **Transition Speed**: Adjust the `--transition-speed` variable for faster or slower transitions
- **Toggle Size**: Change the width and height of the `.switch` and adjust the `.slider:before` dimensions accordingly

## Accessibility Considerations

- Consider adding `aria-label="Toggle dark mode"` to the checkbox for better accessibility
- You might want to respect the user's system preference initially using the `prefers-color-scheme` media query

## Example of System Preference Detection

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem("darkMode");

  if (savedTheme === null) {
    // If no saved preference, check system preference
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      themeSwitch.checked = true;
    }
  } else {
    // Use saved preference
    const isDarkMode = savedTheme === "true";
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      themeSwitch.checked = true;
    }
  }
});
```

This tutorial provides all the necessary components to implement a theme toggle in your web projects. The implementation is clean, reusable, and includes persistence for a better user experience.
