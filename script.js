
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

let index = 0;

function showSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
    index++;
    if (index >= slide.length) {
        index = 0;
    }
    showSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
    index--;
    if (index < 0) {
        index = slide.length - 1;
    }
    showSlide();
});

/* Auto slide */

setInterval(() => {
    index++;
    if (index >= slide.length) {
        index = 0;
    }
    showSlide();
}, 4000);

const track = document.querySelector(".carousel-track");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let position = 0;
const cardWidth = 300;

rightArrow.addEventListener("click", () => {
    position -= cardWidth;
    track.style.transform = `translateX(${position}px)`;
});

leftArrow.addEventListener("click", () => {
    position += cardWidth;

    if (position > 0) {
        position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
});

function openPopup() {
    document.getElementById("contactPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("contactPopup").style.display = "none";
}

window.onload = function () {

    const ctx1 = document.getElementById('deathChart').getContext('2d');

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Deaths due to CVD (millions)',
                data: [17.9, 18.2, 18.5, 18.7, 19.0],
                backgroundColor: 'rgba(54,162,235,0.6)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });


    const ctx2 = document.getElementById('pieChart').getContext('2d');

    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Heart Disease', 'Stroke', 'Diabetes-related CVD'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(255,206,86,0.6)',
                    'rgba(75,192,192,0.6)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });

}

