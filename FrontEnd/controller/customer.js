

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

/*
$('#Dashboard').css('display','block');
$('#Order').css('display','none');
$('#Stock').css('display','none');
$('#Employee').css('display','none');

$('.side-menu>li').eq(0).on('click', () => {
    $('#Dashboard').css('display','block');
    $('#Stock').css('display','none');
    $('#Employee').css('display','none');

})
$('.side-menu>li').eq(2).on('click', () => {
    $('#Dashboard').css('display','none');
    $('#Stock').css('display','block');
    $('#Employee').css('display','none');

})
$('.side-menu>li').eq(3).on('click', () => {
    $('#Dashboard').css('display','none');
    $('#Stock').css('display','none');
    $('#Employee').css('display','block');

})*/
