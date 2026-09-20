// ResumeIQ - AI Resume Analyzer
// Frontend-only JavaScript

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================

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


    // =========================
    // SAMPLE RESUME
    // =========================

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


    // =========================
    // SKILLS
    // =========================

    const skills = [
        "python",
        "java",
        "c programming",
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


    // =========================
    // CHARACTER COUNT
    // =========================

    function updateCharCount() {

        if (!resumeText || !charCount) return;

        const count = resumeText.value.length;

        charCount.textContent =
            count.toLocaleString() + " chars";
    }


    if (resumeText) {

        resumeText.addEventListener("input", updateCharCount);

        updateCharCount();
    }


    // =========================
    // CHOOSE FILE
    // =========================

    if (chooseBtn && fileInput) {

        chooseBtn.addEventListener("click", () => {
            fileInput.click();
        });
    }


    // =========================
    // FILE INPUT
    // =========================

    if (fileInput) {

        fileInput.addEventListener("change", handleFile);
    }


    function handleFile() {

        const file = fileInput.files[0];

        if (!file) return;

        if (fileName) {
            fileName.textContent = "Selected: " + file.name;
        }

        if (status) {
            status.textContent = "Resume selected";
        }

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
                    status.textContent = "TXT resume loaded";
                }
            };

            reader.onerror = function () {

                alert("Could not read the TXT file.");
            };

            reader.readAsText(file);

            return;
        }

        alert(
            "The file was selected successfully.\n\n" +
            "PDF/DOC/DOCX reading is not available in this " +
            "frontend-only version.\n\n" +
            "Please copy and paste your resume text into the box."
        );
    }


    // =========================
    // DRAG AND DROP
    // =========================

    if (dropZone && fileInput) {

        dropZone.addEventListener("dragover", (event) => {

            event.preventDefault();

            dropZone.classList.add("dragging");
        });


        dropZone.addEventListener("dragleave", () => {

            dropZone.classList.remove("dragging");
        });


        dropZone.addEventListener("drop", (event) => {

            event.preventDefault();

            dropZone.classList.remove("dragging");

            const files = event.dataTransfer.files;

            if (!files || !files.length) return;

            fileInput.files = files;

            handleFile();
        });
    }


    // =========================
    // SAMPLE RESUME BUTTON
    // =========================

    if (sampleBtn) {

        sampleBtn.addEventListener("click", () => {

            if (resumeText) {

                resumeText.value = sampleResume.trim();

                updateCharCount();
            }

            if (fileName) {
                fileName.textContent = "Sample resume loaded";
            }

            if (status) {
                status.textContent = "Sample resume ready";
            }
        });
    }


    // =========================
    // ANALYZE RESUME
    // =========================

    if (analyzeBtn) {

        analyzeBtn.addEventListener("click", analyzeResume);
    }


    function analyzeResume() {

        const text =
            resumeText ? resumeText.value.trim() : "";

        if (!text) {

            alert(
                "Please paste your resume or use the Sample Resume button first."
            );

            return;
        }


        if (status) {
            status.textContent = "Analyzing resume...";
        }


        const lowerText = text.toLowerCase();


        // =========================
        // SKILL DETECTION
        // =========================

        const detectedSkills = [];

        skills.forEach(skill => {

            if (lowerText.includes(skill)) {

                detectedSkills.push(skill);
            }
        });


        // Remove duplicates
        const uniqueSkills =
            [...new Set(detectedSkills)];


        // =========================
        // SECTION CHECK
        // =========================

        const sections = {

            contact:
                /contact|email|phone|linkedin|github/i.test(text),

            summary:
                /summary|objective|profile/i.test(text),

            education:
                /education|degree|bachelor|engineering|college|university/i.test(text),

            skills:
                /skills|technical skills|technologies/i.test(text),

            projects:
                /projects|project experience/i.test(text),

            experience:
                /experience|internship|work experience/i.test(text),

            certifications:
                /certification|certificate|certifications/i.test(text),

            achievements:
                /achievement|award|competition/i.test(text)
        };


        // =========================
        // KEYWORDS
        // =========================

        const keywordCount =
            uniqueSkills.length;


        // =========================
        // LENGTH SCORE
        // =========================

        const wordCount =
            text.split(/\s+/).filter(Boolean).length;

        let lengthScore = 50;

        if (wordCount >= 250 && wordCount <= 900) {
            lengthScore = 100;
        } else if (wordCount >= 150) {
            lengthScore = 80;
        } else if (wordCount >= 80) {
            lengthScore = 65;
        }


        // =========================
        // SECTION SCORE
        // =========================

        const sectionValues =
            Object.values(sections);

        const sectionScore =
            Math.round(
                sectionValues.filter(Boolean).length /
                sectionValues.length *
                100
            );


        // =========================
        // SKILL SCORE
        // =========================

        const skillScore =
            Math.min(100, keywordCount * 8);


        // =========================
        // IMPACT SCORE
        // =========================

        const impactWords = [
            "developed",
            "created",
            "designed",
            "built",
            "implemented",
            "improved",
            "achieved",
            "develop",
            "project"
        ];

        let impactCount = 0;

        impactWords.forEach(word => {

            if (lowerText.includes(word)) {
                impactCount++;
            }
        });

        const impactScore =
            Math.min(100, 40 + impactCount * 8);


        // =========================
        // ATS SCORE
        // =========================

        let atsScore = Math.round(
            sectionScore * 0.30 +
            skillScore * 0.25 +
            lengthScore * 0.20 +
            impactScore * 0.15 +
            Math.min(100, keywordCount * 10) * 0.10
        );

        atsScore =
            Math.max(0, Math.min(100, atsScore));


        // =========================
        // SCORE LABEL
        // =========================

        let label = "";

        if (atsScore >= 85) {

            label = "Excellent";

        } else if (atsScore >= 70) {

            label = "Good";

        } else if (atsScore >= 55) {

            label = "Needs Improvement";

        } else {

            label = "Needs Work";
        }


        // =========================
        // DISPLAY SCORE
        // =========================

        if (scoreValue) {
            scoreValue.textContent = atsScore;
        }

        if (scoreLabel) {
            scoreLabel.textContent = label;
        }

        if (scoreRing) {

            scoreRing.style.setProperty(
                "--score",
                atsScore
            );
        }


        // =========================
        // SUMMARY
        // =========================

        if (resultSummary) {

            resultSummary.textContent =
                `Your resume received an ATS-style score of ${atsScore}/100 based on structure, skills, keywords and completeness.`;
        }


        // =========================
        // CATEGORY SCORES
        // =========================

        if (categoryScores) {

            const categories = [

                ["Structure", sectionScore],

                ["Skills", skillScore],

                ["Resume Length", lengthScore],

                ["Impact", impactScore],

                ["Keywords", Math.min(100, keywordCount * 10)]
            ];


            categoryScores.innerHTML =
                categories.map(category => `

                    <div class="category-item">

                        <div class="category-top">

                            <span>${category[0]}</span>

                            <b>${category[1]}%</b>

                        </div>

                        <div class="category-bar">

                            <span style="width:${category[1]}%"></span>

                        </div>

                    </div>

                `).join("");
        }


        // =========================
        // SKILLS
        // =========================

        if (skillsResult) {

            if (uniqueSkills.length === 0) {

                skillsResult.innerHTML =
                    "<p>No matching skills detected.</p>";

            } else {

                skillsResult.innerHTML =
                    uniqueSkills.map(skill =>

                        `<span class="chip">${skill}</span>`

                    ).join("");
            }
        }


        if (skillCount) {

            skillCount.textContent =
                uniqueSkills.length;
        }


        // =========================
        // JOB ROLES
        // =========================

        const roles = [];


        if (
            lowerText.includes("python") ||
            lowerText.includes("machine learning") ||
            lowerText.includes("artificial intelligence")
        ) {

            roles.push({
                name: "AI / ML Engineer",
                match: 92
            });
        }


        if (
            lowerText.includes("sql") ||
            lowerText.includes("python") ||
            lowerText.includes("data science")
        ) {

            roles.push({
                name: "Data Analyst",
                match: 86
            });
        }


        if (
            lowerText.includes("html") ||
            lowerText.includes("css") ||
            lowerText.includes("javascript")
        ) {

            roles.push({
                name: "Web Developer",
                match: 82
            });
        }


        if (
            lowerText.includes("c") ||
            lowerText.includes("c programming")
        ) {

            roles.push({
                name: "Software Developer",
                match: 78
            });
        }


        if (roles.length === 0) {

            roles.push({
                name: "Entry-Level Technology Role",
                match: 60
            });
        }


        if (roleResult) {

            roleResult.innerHTML =
                roles.map(role => `

                    <div class="role-item">

                        <div>

                            <strong>${role.name}</strong>

                            <small>Skills-based match</small>

                        </div>

                        <b>${role.match}%</b>

                    </div>

                `).join("");
        }


        // =========================
        // STRENGTHS
        // =========================

        const strengths = [];


        if (uniqueSkills.length >= 5) {

            strengths.push(
                `Good technical skill coverage with ${uniqueSkills.length} detected skills.`
            );

        } else if (uniqueSkills.length > 0) {

            strengths.push(
                `You have ${uniqueSkills.length} relevant skills listed.`
            );

        } else {

            strengths.push(
                "Your resume has room to highlight more technical skills."
            );
        }


        if (sections.projects) {

            strengths.push(
                "Projects section is present."
            );
        }


        if (sections.education) {

            strengths.push(
                "Education information is included."
            );
        }


        if (sections.experience) {

            strengths.push(
                "Experience information is included."
            );
        }


        if (sections.certifications) {

            strengths.push(
                "Certifications are included."
            );
        }


        if (impactCount >= 3) {

            strengths.push(
                "Your resume uses action-oriented words such as developed, designed or built."
            );
        }


        if (strengthsResult) {

            strengthsResult.innerHTML =
                strengths.map(item =>

                    `<li>${item}</li>`

                ).join("");
        }


        // =========================
        // SUGGESTIONS
        // =========================

        const suggestions = [];


        if (!sections.summary) {

            suggestions.push(
                "Add a short professional summary near the top."
            );
        }


        if (!sections.projects) {

            suggestions.push(
                "Add relevant academic or personal projects."
            );
        }


        if (!sections.education) {

            suggestions.push(
                "Add your education and degree details."
            );
        }


        if (uniqueSkills.length < 5) {

            suggestions.push(
                "Add more relevant technical skills and tools."
            );
        }


        if (wordCount < 150) {

            suggestions.push(
                "Add more useful detail about projects, skills and achievements."
            );
        }


        if (!sections.certifications) {

            suggestions.push(
                "Add relevant certifications or courses if you have them."
            );
        }


        if (!sections.achievements) {

            suggestions.push(
                "Include competitions, achievements or academic activities."
            );
        }


        if (suggestions.length === 0) {

            suggestions.push(
                "Keep your resume updated and customize keywords for each job description."
            );
        }


        if (suggestionsResult) {

            suggestionsResult.innerHTML =
                suggestions.map(item =>

                    `<li>${item}</li>`

                ).join("");
        }


        // =========================
        // SHOW RESULTS
        // =========================

        if (resultsSection) {

            resultsSection.classList.remove("hidden");

            setTimeout(() => {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);
        }


        if (status) {

            status.textContent =
                "Analysis complete";
        }
    }


    // =========================
    // DOWNLOAD REPORT
    // =========================

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            downloadReport
        );
    }


    function downloadReport() {

        const score =
            scoreValue ? scoreValue.textContent : "0";

        const detected =
            skillsResult ?
            skillsResult.innerText :
            "None";

        const roles =
            roleResult ?
            roleResult.innerText :
            "None";

        const suggestions =
            suggestionsResult ?
            suggestionsResult.innerText :
            "None";


        const report = `
RESUMEIQ - AI RESUME ANALYZER
==============================

ATS SCORE: ${score}/100

SKILLS DETECTED
---------------
${detected}

JOB ROLE MATCH
--------------
${roles}

IMPROVEMENT SUGGESTIONS
-----------------------
${suggestions}

Generated by ResumeIQ
`;


        const blob =
            new Blob(
                [report],
                { type: "text/plain;charset=utf-8" }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "ResumeIQ-Analysis-Report.txt";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }


    // =========================
    // DARK MODE
    // =========================

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            themeBtn.textContent =
                isLight ? "☀" : "☾";

            localStorage.setItem(
                "resumeiq-theme",
                isLight ? "light" : "dark"
            );
        });
    }


    // Restore theme

    const savedTheme =
        localStorage.getItem("resumeiq-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        if (themeBtn) {
            themeBtn.textContent = "☀";
        }
    }


    // =========================
    // INITIAL COUNT
    // =========================

    updateCharCount();

});
