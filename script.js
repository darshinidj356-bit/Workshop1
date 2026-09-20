// ResumeIQ - AI Resume Analyzer
// Frontend-only JavaScript
// Corrected version for the current ResumeIQ index.html

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // GET HTML ELEMENTS
    // ===============================

    const fileInput = document.getElementById("fileInput");
    const resumeText = document.getElementById("resumeText");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const chooseBtn = document.getElementById("chooseBtn");
    const sampleBtn = document.getElementById("sampleBtn");
    const dropZone = document.getElementById("dropZone");

    const fileName = document.getElementById("fileName");
    const charCount = document.getElementById("charCount");
    const status = document.getElementById("status");

    const resultsSection = document.getElementById("results");

    const scoreValue = document.getElementById("scoreValue");
    const scoreRing = document.getElementById("scoreRing");
    const scoreLabel = document.getElementById("scoreLabel");
    const resultSummary = document.getElementById("resultSummary");

    const categoryScores = document.getElementById("categoryScores");

    const skillsResult = document.getElementById("skills");
    const skillCount = document.getElementById("skillCount");

    const roleResult = document.getElementById("roles");

    const strengthsResult = document.getElementById("strengths");
    const suggestionsResult = document.getElementById("suggestions");

    const downloadBtn = document.getElementById("downloadBtn");
    const themeBtn = document.getElementById("themeBtn");


    // ===============================
    // SAMPLE RESUME
    // ===============================

    const sampleResume = `
DARSHINI D J

AI & ML ENGINEERING STUDENT

CONTACT

Email: darshini@example.com
Phone: +91 9876543210
Location: Mysuru, Karnataka, India
LinkedIn: linkedin.com/in/darshini
GitHub: github.com/darshini

SUMMARY

Motivated Artificial Intelligence and Machine Learning engineering student
with strong interest in Python, machine learning, artificial intelligence,
data analysis and software development.

EDUCATION

Bachelor of Engineering - Artificial Intelligence and Machine Learning

SKILLS

Python
C Programming
HTML
CSS
SQL
Artificial Intelligence
Machine Learning
Git
GitHub
OpenCV

PROJECTS

AI-Powered Driver Drowsiness Detection App

Developed an AI-based mobile application concept using computer vision
and OpenCV to detect driver drowsiness and improve road safety.

Smart Real-Time Monitoring and Inspection App

Designed a smart monitoring solution using AI and real-time inspection
concepts for identifying and reporting issues.

CERTIFICATIONS

Completed academic and technical learning activities in AI, ML and programming.

ACHIEVEMENTS

Participated in academic projects, competitions and technical activities.

EXPERIENCE

Academic project experience and hands-on practice in programming,
AI/ML concepts and web development.
`;


    // ===============================
    // SKILLS DATABASE
    // ===============================

    const skills = [
        "python",
        "java",
        "c",
        "c++",
        "c#",
        "javascript",
        "html",
        "css",
        "sql",
        "machine learning",
        "artificial intelligence",
        "deep learning",
        "data science",
        "tensorflow",
        "pytorch",
        "opencv",
        "git",
        "github",
        "excel",
        "power bi",
        "react",
        "node.js",
        "flask",
        "django",
        "communication",
        "leadership",
        "problem solving"
    ];


    // ===============================
    // CHARACTER COUNT
    // ===============================

    function updateCharCount() {

        if (!resumeText || !charCount) {
            return;
        }

        const count = resumeText.value.length;

        charCount.textContent =
            count.toLocaleString() + " chars";
    }


    if (resumeText) {

        resumeText.addEventListener(
            "input",
            updateCharCount
        );

        updateCharCount();
    }


    // ===============================
    // CHOOSE RESUME BUTTON
    // ===============================

    if (chooseBtn && fileInput) {

        chooseBtn.addEventListener(
            "click",
            function () {

                fileInput.click();

            }
        );
    }


    // ===============================
    // FILE INPUT
    // ===============================

    if (fileInput) {

        fileInput.addEventListener(
            "change",
            handleFile
        );
    }


    function handleFile() {

        if (!fileInput || !fileInput.files) {
            return;
        }

        const file = fileInput.files[0];

        if (!file) {
            return;
        }


        // Show selected filename

        if (fileName) {

            fileName.textContent =
                "Selected: " + file.name;
        }


        if (status) {

            status.textContent =
                "Resume selected";
        }


        // TXT FILE

        const isTxt =
            file.type === "text/plain" ||
            file.name.toLowerCase().endsWith(".txt");


        if (isTxt) {

            const reader = new FileReader();


            reader.onload = function (event) {

                if (resumeText) {

                    resumeText.value =
                        event.target.result || "";

                    updateCharCount();
                }


                if (status) {

                    status.textContent =
                        "TXT resume loaded";
                }
            };


            reader.onerror = function () {

                alert(
                    "Could not read the TXT file."
                );
            };


            reader.readAsText(file);

            return;
        }


        // PDF / DOC / DOCX

        alert(
            "The file was selected successfully.\n\n" +
            "For this frontend-only version, PDF/DOC/DOCX " +
            "files cannot be directly read by JavaScript.\n\n" +
            "Please copy and paste your resume text into " +
            "the text box for full analysis."
        );
    }


    // ===============================
    // DRAG AND DROP
    // ===============================

    if (dropZone && fileInput) {

        dropZone.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                dropZone.classList.add(
                    "dragging"
                );
            }
        );


       
