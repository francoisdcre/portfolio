document.addEventListener("DOMContentLoaded", function() {
    // Get the theme toggle element
    const themeSwitch = document.querySelector('.theme-switch');
    
    // Check for saved theme preference or use default light theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle position based on current theme
    if(currentTheme === 'dark') {
        themeSwitch.classList.add('dark');
    }
    
    // Toggle theme when the switch is clicked
    themeSwitch.addEventListener('click', function() {
        let theme = 'light';
        
        // If current theme is light, switch to dark
        if(document.documentElement.getAttribute('data-theme') === 'light') {
            theme = 'dark';
            themeSwitch.classList.add('dark');
        } else {
            themeSwitch.classList.remove('dark');
        }
        
        // Set the theme attribute on root element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', theme);
    });
});

// Function to update theme-dependent elements like charts or external components
function updateThemeSpecificElements() {
    // Update GitHub calendar colors if dark theme
    if(document.documentElement.getAttribute('data-theme') === 'dark') {
        document.querySelectorAll('.js-calendar-graph-svg rect').forEach(rect => {
            // Adjust GitHub calendar colors for dark theme if needed
        });
    }
    
    // You can add more theme-specific adjustments here
}
