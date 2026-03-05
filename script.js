/* =========================
   WAIT FOR PAGE LOAD
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       HERO SLIDER
    ========================== */

    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");

    let index = 0;

    function showSlide() {
        if (slides) {
            slides.style.transform = "translateX(-" + (index * 100) + "%)";
        }
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            index++;
            if (index >= slideItems.length) index = 0;
            showSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            index--;
            if (index < 0) index = slideItems.length - 1;
            showSlide();
        });
    }

    setInterval(function () {
        index++;
        if (index >= slideItems.length) index = 0;
        showSlide();
    }, 4000);



    /* =========================
       POPUP
    ========================== */

    window.openPopup = function () {
        const popup = document.getElementById("contactPopup");
        if (popup) popup.style.display = "block";
    };

    window.closePopup = function () {
        const popup = document.getElementById("contactPopup");
        if (popup) popup.style.display = "none";
    };



    /* =========================
       CHARTS
    ========================== */

    const deathChart = document.getElementById("deathChart");

    if (deathChart) {
        new Chart(deathChart, {
            type: "bar",
            data: {
                labels: ["2018", "2019", "2020", "2021", "2022"],
                datasets: [{
                    label: "Deaths due to CVD (millions)",
                    data: [17.9, 18.2, 18.5, 18.7, 19.0]
                }]
            }
        });
    }

    const pieChart = document.getElementById("pieChart");

    if (pieChart) {
        new Chart(pieChart, {
            type: "pie",
            data: {
                labels: ["Heart Disease", "Stroke", "Diabetes CVD"],
                datasets: [{
                    data: [45, 30, 25]
                }]
            }
        });
    }



    /* =========================
       AI PREDICTION (ONE FORM)
    ========================== */

    const form = document.getElementById("predictionForm");

    if (!form) {
        console.error("Prediction form not found.");
        return;
    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const type = document.getElementById("predictionType").value;

        const age = document.getElementById("age").value;
        const bmi = document.getElementById("bmi").value;
        const glucose = document.getElementById("glucose").value;
        const hypertension = document.getElementById("hypertension").value;
        const smoking = document.getElementById("smoking").value;

        const resultBox = document.getElementById("result");

        let url = "";
        let bodyData = {};



        /* ---------- DIABETES ---------- */

        if (type === "diabetes") {

            url = "http://127.0.0.1:5000/predict";

            bodyData = {
                age: age,
                hypertension: hypertension,
                bmi: bmi,
                blood_glucose_level: glucose,
                smoking: smoking
            };

        }



        /* ---------- HEART ATTACK ---------- */

        else {

            url = "http://127.0.0.1:5000/predict_heart";

            bodyData = {
                age: age,
                sex: 1,
                cholesterol: 200,
                heart_rate: 80,
                diabetes: 0,
                family_history: 0,
                smoking: smoking,
                obesity: 0,
                alcohol: 0,
                exercise: 2,
                diet: 1,
                stress: 5,
                bmi: bmi,
                triglycerides: 150,
                physical_activity: 3,
                sleep: 7,
                systolic: 120,
                diastolic: 80
            };

        }



        fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bodyData)

        })
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Server error");
            }

            return response.json();
        })
        .then(function (data) {

            if (data.prediction === 1) {

                resultBox.innerHTML =
                    "<span style='color:red;font-weight:bold;'>⚠ High Risk Detected</span>";

            } else {

                resultBox.innerHTML =
                    "<span style='color:green;font-weight:bold;'>✅ Low Risk</span>";

            }

        })
        .catch(function () {

            resultBox.innerHTML =
                "<span style='color:red;'>Prediction failed. Check Flask server.</span>";

        });

    });



    /* =========================
       FLASHCARD CAROUSEL
    ========================== */

    document.querySelectorAll('.carousel').forEach(carousel => {

        const track = carousel.querySelector('.carousel-track');
        const cards = Array.from(track.children);
        const prevButton = carousel.querySelector('.arrow.left');
        const nextButton = carousel.querySelector('.arrow.right');

        const cardWidth = cards[0].getBoundingClientRect().width;

        let index = 0;
        let autoSlide;

        cards.forEach((card, i) => {
            card.style.left = `${i * cardWidth}px`;
        });

        function moveToCard(newIndex) {

            if (newIndex < 0) newIndex = cards.length - 1;
            if (newIndex >= cards.length) newIndex = 0;

            track.style.transform = `translateX(-${newIndex * cardWidth}px)`;

            index = newIndex;
        }

        prevButton.addEventListener('click', () => {
            moveToCard(index - 1);
            resetAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            moveToCard(index + 1);
            resetAutoSlide();
        });

        function startAutoSlide() {
            autoSlide = setInterval(() => {
                moveToCard(index + 1);
            }, 3000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlide);
            startAutoSlide();
        }

        startAutoSlide();

    });

});

