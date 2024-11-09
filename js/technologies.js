document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.progress');
    const radioInputs = document.querySelectorAll('input[name="slider"]');
    
    // Set initial progress based on checked radio
    const checkedInput = document.querySelector('input[name="slider"]:checked');
    updateProgress(checkedInput.id);

    // Add event listeners to radio inputs
    radioInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            updateProgress(e.target.id);
        });
    });

    function updateProgress(inputId) {
        progressBar.style.transition = 'width 0.4s ease-in-out';
        
        switch(inputId) {
            case 'item-1':
                progressBar.style.width = '33.33%';
                break;
            case 'item-2':
                progressBar.style.width = '66.66%';
                break;
            case 'item-3':
                progressBar.style.width = '100%';
                break;
        }
    }
});
