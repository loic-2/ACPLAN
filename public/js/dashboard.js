/* globals Chart:false, feather:false */
/*const dasboard = document.getElementById("dashboard");
const client = document.getElementById("client");
const programmation = document.getElementById("programmation");
const personnel = document.getElementById("personnel");
const assurance = document.getElementById("assurance");

const dasboardBloc = document.getElementById("dashboard-bloc");
const clientBloc = document.getElementById("clients-bloc");
//const programmationBloc = document.getElementById("programmation-bloc");
const personnelBloc = document.getElementById("personnels-bloc");
const assuranceBloc = document.getElementById("assurances-bloc");*/

(function() {
    'use strict'

    feather.replace({
        'aria-hidden': 'true'
    })

    // Graphs
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            datasets: [{
                data: [
                    15339,
                    21345,
                    18483,
                    24003,
                    23489,
                    24092,
                    12034
                ],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    })
})()
/*
goToDashboard()
dasboard.addEventListener("click", () => goToDashboard());
client.addEventListener("click", () => goToClient());
personnel.addEventListener("click", () => goToPersonnel());
assurance.addEventListener("click", () => goToAssurance());

function goToDashboard() {
    dasboardBloc.classList.toggle("d-block")
    clientBloc.classList.toggle("d-none");
    personnelBloc.classList.toggle("d-none");
    assuranceBloc.classList.toggle("d-none")
}

function goToClient() {
    clientBloc.classList.toggle("d-block");
    dasboardBloc.classList.toggle("d-none")
    personnelBloc.classList.toggle("d-none");
    assuranceBloc.classList.toggle("d-none")
}

function goToPersonnel() {
    personnelBloc.classList.toggle("d-block");
    dasboardBloc.classList.toggle("d-none")
    clientBloc.classList.toggle("d-none");
    assuranceBloc.classList.toggle("d-none")
}

function goToAssurance() {
    assuranceBloc.classList.toggle("d-block");
    dasboardBloc.classList.toggle("d-none")
    clientBloc.classList.toggle("d-none");
    personnelBloc.classList.toggle("d-none");
}*/