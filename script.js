// ResumeIQ - AI Resume Analyzer
// Frontend-only JavaScript

const resumeInput = document.getElementById("resumeInput");
const resumeText = document.getElementById("resumeText");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultsSection = document.getElementById("resultsSection");

const atsScore = document.getElementById("atsScore");
const skillsResult = document.getElementById("skillsResult");
const roleResult = document.getElementById("roleResult");
const suggestionsResult = document.getElementById("suggestionsResult");


// ===============================
// FILE UPLOAD
// ===============================

if (resumeInput) {
    resumeInput.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        const allowedTypes = [
            "text/plain",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(txt|pdf|doc|docx)$/i)) {
            alert("Please upload a TXT, PDF, DOC, or DOCX resume.");
            this.value = "";
            return;
        }

        alert(`Resume selected: ${file.name}`);
    });
}


// ===============================
// ANALYZE RESUME
// ===============================

if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeResume);
}

function analyzeResume() {

    let text = "";

    if (resumeText && resumeText.value.trim() !== "") {
        text = resumeText.value.toLowerCase();
    }

    if (text.trim() === "" && resumeInput && resumeInput.files.length > 0) {
        const file = resumeInput.files[0];

        // Browser-safe handling for TXT files
        if (file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt")) {

            const reader = new FileReader();

            reader.onload = function (event) {
                analyzeText(event.target.result.toLowerCase());
            };

            reader.readAsText(file);
            return;
        }

        // PDF/DOC/DOCX require a backend or parsing library
        alert(
            "The file was selected successfully.\n\n" +
            "For this frontend-only version, paste your resume text into the text box for analysis."
        );

        return;
    }

    if (text.trim() === "") {
        alert("Please paste your resume text or upload a TXT resume.");
        return;
    }

    analyzeText(text);
}


// ===============================
// RESUME ANALYSIS
// ===============================

function analyzeText(text) {

    const skills = [
        "python",
        "java",
        "c",
        "c++",
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
        "django"
    ];

    const detectedSkills = skills.filter(skill =>
        text.includes(skill)
    );

    const skillScore = Math.min(detectedSkills.length * 5, 30);

    const sections = [
        "education",
        "experience",
        "projects",
        "skills",
        "certification",
        "contact",
        "summary",
        "objective"
    ];

    let sectionScore = 0;

    sections.forEach(section => {
        if (text.includes(section)) {
            sectionScore += 5;
        }
    });

    sectionScore = Math.min(sectionScore, 30);

    const keywordList = [
        "team",
        "communication",
        "leadership",
        "problem solving",
        "internship",
        "project",
        "developer",
        "engineering",
        "analysis"
    ];

    let keywordScore = 0;

    keywordList.forEach(keyword => {
        if (text.includes(keyword)) {
            keywordScore += 3;
        }
    });

    keywordScore = Math.min(keywordScore, 20);

    const lengthScore =
        text.length > 500 ? 10 :
        text.length > 250 ? 7 :
        4;

    let score =
        skillScore +
        sectionScore +
        keywordScore +
        lengthScore +
        10;

    score = Math.min(Math.round(score), 100);

    displayResults(
        score,
        detectedSkills,
        text
    );
}


// ===============================
// DISPLAY RESULTS
// ===============================

function displayResults(score, skills, text) {

    if (resultsSection) {
        resultsSection.style.display = "block";
    }

    if (atsScore) {
        atsScore.textContent = score + "%";
    }

    // Skills
    if (skillsResult) {

        if (skills.length === 0) {
            skillsResult.innerHTML =
                "<p>No major skills detected.</p>";
        } else {

            skillsResult.innerHTML = skills
                .map(skill =>
                    `<span class="skill-tag">${capitalize(skill)}</span>`
                )
                .join(" ");
        }
    }


    // Job role matching
    if (roleResult) {

        const roles = [];

        if (
            text.includes("python") ||
            text.includes("machine learning") ||
            text.includes("artificial intelligence")
        ) {
            roles.push("AI / ML Engineer");
        }

        if (
            text.includes("html") ||
            text.includes("css") ||
            text.includes("javascript") ||
            text.includes("react")
        ) {
            roles.push("Web Developer");
        }

        if (
            text.includes("sql") ||
            text.includes("data science") ||
            text.includes("power bi")
        ) {
            roles.push("Data Analyst");
        }

        if (
            text.includes("java") ||
            text.includes("c++") ||
            text.includes("c#")
        ) {
            roles.push("Software Developer");
        }

        if (roles.length === 0) {
            roles.push("Entry-Level Software / Technology Role");
        }

        roleResult.innerHTML = roles
            .map(role => `<div class="role-card">${role}</div>`)
            .join("");
    }


    // Suggestions
    if (suggestionsResult) {

        const suggestions = [];

        if (score < 60) {
            suggestions.push(
                "Add more relevant technical skills."
            );
        }

        if (!text.includes("projects")) {
            suggestions.push(
                "Add a Projects section with measurable results."
            );
        }

        if (!text.includes("education")) {
            suggestions.push(
                "Include your education details."
            );
        }

        if (!text.includes("experience")) {
            suggestions.push(
                "Add internship, training, volunteering, or practical experience."
            );
        }

        if (!text.includes("github")) {
            suggestions.push(
                "Add your GitHub profile if you have projects available."
            );
        }

        if (!text.includes("linkedin")) {
            suggestions.push(
                "Add your LinkedIn profile."
            );
        }

        if (text.length < 500) {
            suggestions.push(
                "Add more relevant details while keeping the resume concise."
            );
        }

        if (suggestions.length === 0) {
            suggestions.push(
                "Your resume contains the main sections and keywords detected by ResumeIQ."
            );
        }

        suggestionsResult.innerHTML = suggestions
            .map(item => `<li>${item}</li>`)
            .join("");
    }


    // Scroll to results
    if (resultsSection) {
        resultsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ===============================
// HELPER
// ===============================

function capitalize(text) {

    return text
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}


// ===============================
// DOWNLOAD ANALYSIS REPORT
// ===============================

function downloadReport() {

    const score =
        atsScore ? atsScore.textContent : "N/A";

    const skills =
        skillsResult ? skillsResult.innerText : "N/A";

    const roles =
        roleResult ? roleResult.innerText : "N/A";

    const suggestions =
        suggestionsResult ? suggestionsResult.innerText : "N/A";

    const report = `
RESUMEIQ - RESUME ANALYSIS REPORT
=================================

ATS SCORE
${score}

DETECTED SKILLS
${skills}

MATCHED JOB ROLES
${roles}

SUGGESTIONS
${suggestions}

Generated by ResumeIQ
`;

    const blob = new Blob(
        [report],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "ResumeIQ_Analysis_Report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}


// Make downloadReport available to HTML buttons
window.downloadReport = downloadReport;
