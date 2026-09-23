// Daftar Soal Kuis (Bisa Anda tambah atau ubah)
const questions = [
  {
    question: "Apa ibu kota negara Indonesia?",
    answers: [
      { text: "Bandung", correct: false },
      { text: "Jakarta", correct: true },
      { text: "Surabaya", correct: false },
      { text: "Medan", correct: false }
    ]
  },
  {
    question: "Planet manakah yang dikenal sebagai Planet Merah?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Mars", correct: true },
      { text: "Saturnus", correct: false }
    ]
  },
  {
    question: "Bahasa pemrogrammman apa yang digunakan untuk membuat interaktivitas pada web?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "Berapakah hasil dari 12 x 12?",
    answers: [
      { text: "144", correct: true },
      { text: "124", correct: false },
      { text: "154", correct: false },
      { text: "134", correct: false }
    ]
  }
];

// Element HTML
const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const finalScoreElement = document.getElementById("final-score");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  nextButton.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  
  // Update indikator nomor soal
  questionNumberElement.innerText = `Soal ${currentQuestionIndex + 1}/${questions.length}`;
  questionTextElement.innerText = currentQuestion.question;

  // Membuat tombol jawaban
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add(
      "w-full", "text-left", "p-4", "rounded-xl", "bg-slate-700", 
      "hover:bg-slate-600", "transition", "duration-200", "font-medium"
    );
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.remove("bg-slate-700");
    selectedBtn.classList.add("bg-emerald-600");
    score++;
  } else {
    selectedBtn.classList.remove("bg-slate-700");
    selectedBtn.classList.add("bg-rose-600");
  }

  // Tunjukkan jawaban yang benar & nonaktifkan semua tombol
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.remove("bg-slate-700");
      button.classList.add("bg-emerald-600");
    }
    button.disabled = true;
    button.classList.remove("hover:bg-slate-600");
    button.classList.add("cursor-not-allowed");
  });

  nextButton.classList.remove("hidden");
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  finalScoreElement.innerText = score;
  totalQuestionsElement.innerText = `/ ${questions.length}`;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextButton.addEventListener("click", handleNextButton);
restartButton.addEventListener("click", startQuiz);

// Jalankan kuis pertama kali
startQuiz();
