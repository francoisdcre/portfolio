document.addEventListener("DOMContentLoaded", function() {
    const themeSwitch = document.querySelector('.theme-switch');
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if(currentTheme === 'dark') {
        themeSwitch.classList.add('dark');
    }
    
    themeSwitch.addEventListener('click', function() {
        let theme = 'light';
        
        if(document.documentElement.getAttribute('data-theme') === 'light') {
            theme = 'dark';
            themeSwitch.classList.add('dark');
        } else {
            themeSwitch.classList.remove('dark');
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        
        localStorage.setItem('theme', theme);
    });
});

function updateThemeSpecificElements() {
    if(document.documentElement.getAttribute('data-theme') === 'dark') {
        document.querySelectorAll('.js-calendar-graph-svg rect').forEach(rect => {
        });
    }
}
