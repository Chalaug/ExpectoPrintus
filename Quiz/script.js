const quizQuestions = [
    {
        question: "¿Qué prefieres hacer en tu tiempo libre?",
        answers: ["Participar en un partido de Quidditch.", "Un intenso juego de Ajedrez Mágico.", "Un juego de canicas con unas Gobstones", "Vencer a alguien en un duelo de Magos.", "Hacer jardinería con plantas carnívoras.", "Leer el futuro con las hojas del té."]
    },
    {
        question: "Es hora de un snack, ¿Cúal de los siguientes escoges?",
        answers: ["Unas Ranas de chocolate", "Grageas Bertie Bott de Todos los Sabores", "Pastelitos de Caldero", "Cerveza de Mantequilla", "Empanadas de Calabaza", "Bolas de Queso de Luna"]
    },
    {
        question: "¿Qué película preferirías ver con tus amigos?",
        answers: ["El Señor de Los Anillos", "Las Crónicas de Narnia", "Percy Jackson y el Ladrón del Rayo", "La Brújula Dorada", "El Aprendiz de Brujo", "Puente a Terabithia"]
    },
    {
        question: "¿Con qué juguete estabas obsesionado cuando eras pequeño?",
        answers: ["Peluches", "Juegos de Mesa", "Figuras de acción", "Muñecas", "Legos", "Tamagotchi"]
    },
    {
        question: "¿Qué mascota tendrías en Hogwarts?",
        answers: ["Lechuzas", "Ratas", "Gatos", "Sapos", "Dragon Miniatura", "Hurticilla"]
    },
    {
        question: "¿De qué compañer@ de clase estás enamorad@?",
        answers: ["Cho Chang", "Cedric Diggory", "Luna Lovegood", "Draco Malfoy", "Hermione Granger", "Neville Longbottom"]
    }
];

const personalityDescriptions = {
    "Oso de Anteojos": "Eres tranquilo y dormilón, prefieres la tranquilidad y la soledad.",
    "Nutria": "Eres juguetón y travieso, siempre encuentras formas de divertirte.",
    "Puma Andino": "Eres independiente y valiente, nada te detiene.",
    "Jaguar": "Eres fuerte y misterioso, prefieres mantenerte en las sombras.",
    "Pingüino de Humboldt": "Eres sociable y leal, siempre estás en grupo.",
    "Capibara": "Eres amigable y relajado, te llevas bien con todos."
};

let currentQuestion = 0;
let userAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz-container')) {
        showQuestion();
    }

    if (document.getElementById('patronus-result')) {
        const result = localStorage.getItem('patronusResult');
        document.getElementById('patronus-result').textContent = result;

        const patronusImage = document.getElementById('patronus-image');
        patronusImage.src = `images/result/${result.toLowerCase().replace(/ /g, '_')}.png`;

        const description = document.createElement('p');
        description.textContent = personalityDescriptions[result];
        document.getElementById('result-container').appendChild(description);

        document.getElementById('buy-button').onclick = () => {
            location.href = `animal.html?animal=${result}`;
        };
    }
});

function showQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const questionElement = document.createElement('h2');
    questionElement.textContent = quizQuestions[currentQuestion].question;
    quizContainer.appendChild(questionElement);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers-container');
    quizContainer.appendChild(answersContainer);

    quizQuestions[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.onclick = () => handleAnswer(index);
        answersContainer.appendChild(button);
    });
}

function handleAnswer(answerIndex) {
    userAnswers.push(answerIndex);
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const results = ["Oso de Anteojos", "Nutria", "Puma Andino", "Jaguar", "Pingüino de Humboldt", "Capibara"];
    const resultIndex = calculateResult(userAnswers);
    const patronusResult = results[resultIndex];

    localStorage.setItem('patronusResult', patronusResult);
    location.href = 'result.html';
}

function calculateResult(answers) {
    const counts = [0, 0, 0, 0, 0, 0];

    answers.forEach(answer => {
        counts[answer % 6]++;
    });

    return counts.indexOf(Math.max(...counts));
}
