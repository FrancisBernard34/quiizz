# Quiizz - Test Your Knowledge

A fun, interactive quiz application with a clean, modern UI design featuring both light and dark themes.

![Screenshot Preview](https://i.ibb.co/4ZJ6xx0r/image.png)

## Overview

Quiizz is a web-based quiz application that tests users' knowledge across various topics. It features a responsive design that works on both desktop and mobile devices, and a customizable theme with light and dark mode options.

## Features

- **Interactive Quiz Experience**: Answer questions with multiple-choice options
- **Timer System**: 30-second countdown for each question
- **Progress Tracking**: Visual progress bar shows quiz completion status
- **Performance Statistics**: Detailed summary of correct and incorrect answers
- **Light/Dark Theme**: Toggle between light and dark mode based on your preference
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **Score Calculation**: Percentage-based scoring with visual feedback
- **Theme Persistence**: Remembers your theme preference between sessions

## Project Structure

```
/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # Quiz logic and functionality
└── README.md       # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FrancisBernard34/quiizz.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiizz
   ```

3. Open `index.html` in your browser to start using the application locally.

## Usage

This application can be hosted on any static web hosting service. Simply upload all files to your hosting provider to make it live.

### Local Development

For local development, you can use any local server. For example, with Python:

```bash
python -m http.server
```

Or with Node.js and the `serve` package:

```bash
npx serve
```

### How to Use

1. Click the "Start Quiz" button on the welcome screen
2. Read each question carefully and select your answer from the options provided
3. Click "Next Question" to proceed (or wait for the 30-second timer to expire)
4. After completing all questions, view your results and performance summary
5. Choose to try again or return to the home screen
6. Toggle between light and dark mode using the theme switch in the header

## Technologies Used

### HTML
- Semantic HTML5 markup for better accessibility and SEO
- Font Awesome icons for visual elements like the theme toggle
- Responsive meta tags for mobile compatibility
- Structured sections for different quiz screens (welcome, quiz, results)

### CSS
- Custom CSS variables for easy theme customization
- Flexbox layouts for responsive design
- CSS transitions for smooth theme switching
- Media queries for mobile responsiveness
- Custom styling for interactive elements (buttons, quiz options)
- Progress bar animation
- Timer visual feedback

### JavaScript
- Dynamic content generation for quiz questions and answers
- Event listeners for user interaction
- Timer functionality with automatic progression
- Local storage for theme preference persistence
- Score calculation and performance summary generation
- Screen navigation and state management
- Answer validation and feedback

## Customization

Modify the CSS variables in `styles.css` to change the application's appearance:

```css
:root {
  --primary-color: #ff8c00;    /* Primary color for buttons and accents */
  --primary-hover: #e67e00;     /* Hover state color */
  --light-bg: #f5f5f5;          /* Light theme background */
  --light-text: #333;           /* Light theme text */
  --dark-bg: #222;              /* Dark theme background */
  --dark-text: #f5f5f5;         /* Dark theme text */
  --transition-speed: 0.3s;     /* Speed of theme transitions */
  --border-radius: 12px;        /* Border radius for elements */
}
```

To add more questions, modify the `quizData` array in `script.js`.

## Theme Toggle Feature

The application includes a light/dark theme toggle that:

- Switches between light and dark color schemes
- Saves user preference to localStorage
- Provides smooth transitions between themes
- Includes sun and moon icons for visual indication

For more details on implementing the theme toggle in your web projects, see the included `theme-toggle-tutorial.md` file.