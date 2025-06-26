window.addEventListener('DOMContentLoaded', () => {

    // SHOW PASSWORD INPUT
    let showPwBtn = document.querySelector('.show-pw');

    showPwBtn.addEventListener('click', () => {

        let passwordInp = document.getElementById('password-inp');

        switch(showPwBtn.innerHTML) {
            case 'Show':
                showPwBtn.innerHTML = 'Hide';
                passwordInp.removeAttribute('type');
                passwordInp.setAttribute('type', 'text');
                
                break;
                default: 
                showPwBtn.innerHTML = 'Show';
                passwordInp.removeAttribute('type');
                passwordInp.setAttribute('type', 'password');
                
        }

    })

})