

const sideLinks = document.querySelectorAll('.sidebar .side-menu li a');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', function () {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sideBar.classList.toggle('close');
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

