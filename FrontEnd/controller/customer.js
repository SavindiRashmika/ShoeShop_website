

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

document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"],input[type="date"], select');

    inputs.forEach(input => {
        input.addEventListener('click', function() {
            // Get the table body element
            const tableBody = document.querySelector('tbody');
            // Change its background color
            tableBody.style.backgroundColor = 'var(--gray)';
            this.style.backgroundColor = 'var(--gray)';
            this.style.color = 'var(--dark)';
        });

        input.addEventListener('blur', function() {
            // Reset the background color of the table body
            const tableBody = document.querySelector('tbody');
            tableBody.style.backgroundColor = '#383838';
            this.style.backgroundColor = 'var(--gray)';
            this.style.border = '1px solid #383838';

            // Custom styling for select box options
           /* const selectOptions = this.querySelectorAll('option');
            selectOptions.forEach(option => {
                option.style.backgroundColor = 'black'; // Change background color to black
                option.style.color = 'var(--dark)';
*/

                const selectOptions = document.querySelectorAll('select option');
                selectOptions.forEach(option => {
                    option.style.backgroundColor = '#333';
                    option.style.color = 'var(--dark)';

        });
    });
    });
});




/*------------------------------------------------------------*/
startTime();
function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;

    var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
