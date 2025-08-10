// Portfolio data
        const portfolioData = {
            skills: {
                programming: ["Python", "R", "SQL", "Java", "JavaScript", "C/C++"],
                ml: ["scikit-learn", "TensorFlow/Keras", "XGBoost", "SMOTE", "GridSearchCV"],
                data: ["pandas", "NumPy", "Feature Engineering", "Scaling & Encoding"],
                viz: ["Matplotlib", "Seaborn", "Plotly", "Excel Dashboards"],
                deployment: ["Streamlit", "Flask", "FastAPI", "Git", "Docker", "SQLite", "MySQL", "Linux"],
                frontend: ["React", "HTML/CSS/JS", "Material-UI"],
                environments: ["Jupyter Notebook", "VS Code", "Google Colab"],
                soft: ["Leadership", "Communication", "Teamwork", "Problem-Solving", "Adaptability", "Time Management", "Critical Thinking", "Presentation"],
                languages: ["English (Fluent)", "French (Conversational)", "Spanish (Beginner)", "Wolof (Native)"]
            },
            projects: [
                {name: "Potato Leaf Guardian", tech: ["TensorFlow", "React", "Flask", "Docker", "CNN"], accuracy: 92},
                {name: "Customer Churn Prediction", tech: ["TensorFlow", "Streamlit", "SMOTE", "ANN"], recall: 85},
                {name: "House Price Prediction", tech: ["Flask", "XGBoost", "React", "Feature Engineering"], r2: 88}
            ],
            certifications: [
                "AI Fundamentals (IBM)",
                "Computer Vision (Kaggle)",
                "Intro to Deep Learning (Kaggle)",
                "Intro to Programming (Kaggle)",
                "Intermediate ML (Kaggle)",
                "Intro to ML (Kaggle)",
                "Pandas (Kaggle)",
                "Python (Kaggle)",
                "Python (HackerRank)",
                "SQL (HackerRank)",
                "SQL (Oracle)",
                "Feature Engineering (Kaggle)",
                "Data Cleaning (Kaggle)",
                "Problem Solving (HackerRank)",
                "JavaScript (HackerRank)",
                "JS Algorithms (freeCodeCamp)",
                "Responsive Web Design (freeCodeCamp)",
                "Database Design (Oracle)",
                "Generative AI (DataCamp)",
                "Data Literacy (DataCamp)"
            ],
            experience: [
                {role: "Secretary General", organization: "GASAM", period: "June 2024 - Aug 2025"},
                {role: "Machine Learning Intern", organization: "XAI", period: "Aug 2025 - Oct 2025"},
                {role: "Data Science Intern", organization: "ENSAF", period: "July 2025 - Aug 2025"}
            ]
        };

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initCharts();
            initWordCloud();
            setupChat();
            setupSmoothScrolling();

            window.scrollTo(0, 0); // Scroll to top first

            // Only focus if chat section is visible
            // Option 1: Remove this line entirely
            // Option 2: Delay focus so it doesn't override scroll
            setTimeout(function() {
                if (document.getElementById('userInput')) {
                    document.getElementById('userInput').blur(); // Prevent auto-scroll
                }
            }, 100);
        });

        window.onload = function() {
            window.scrollTo(0, 0); // Always scroll to top on reload
        };

        function initCharts() {
            // Skills Distribution Chart
            const skillsCtx = document.getElementById('skillsChart').getContext('2d');
            new Chart(skillsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Programming', 'ML/AI', 'Data', 'Viz', 'Deployment', 'Frontend', 'Soft', 'Languages'],
                    datasets: [{
                        data: [
                            portfolioData.skills.programming.length,
                            portfolioData.skills.ml.length,
                            portfolioData.skills.data.length,
                            portfolioData.skills.viz.length,
                            portfolioData.skills.deployment.length,
                            portfolioData.skills.frontend.length,
                            portfolioData.skills.soft.length,
                            portfolioData.skills.languages.length
                        ],
                        backgroundColor: [
                            '#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', 
                            '#f72585', '#7209b7', '#560bad', '#b5179e'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'bottom',
                            labels: {
                                color: 'white',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw} skills`;
                                }
                            }
                        }
                    },
                    cutout: '65%'
                }
            });

            // Technology Usage Chart
            const techCounts = {};
            portfolioData.projects.forEach(project => {
                project.tech.forEach(tech => {
                    techCounts[tech] = (techCounts[tech] || 0) + 1;
                });
            });
            
            const sortedTech = Object.entries(techCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8);
            
            const techCtx = document.getElementById('techChart').getContext('2d');
            new Chart(techCtx, {
                type: 'bar',
                data: {
                    labels: sortedTech.map(item => item[0]),
                    datasets: [{
                        label: 'Project Usage',
                        data: sortedTech.map(item => item[1]),
                        backgroundColor: '#4cc9f0',
                        borderColor: '#4361ee',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.x} projects`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { 
                            beginAtZero: true,
                            grid: {
                                display: false,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }
                    }
                }
            });

            // Project Charts
            const project1Ctx = document.getElementById('project1Chart').getContext('2d');
            new Chart(project1Ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Accuracy', ''],
                    datasets: [{
                        data: [92, 8],
                        backgroundColor: ['#4361ee', 'rgba(67, 97, 238, 0.1)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });

            const project2Ctx = document.getElementById('project2Chart').getContext('2d');
            new Chart(project2Ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Recall', ''],
                    datasets: [{
                        data: [85, 15],
                        backgroundColor: ['#f72585', 'rgba(247, 37, 133, 0.1)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });

            const project3Ctx = document.getElementById('project3Chart').getContext('2d');
            new Chart(project3Ctx, {
                type: 'doughnut',
                data: {
                    labels: ['R² Score', ''],
                    datasets: [{
                        data: [88, 12],
                        backgroundColor: ['#4895ef', 'rgba(72, 149, 239, 0.1)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        }

        function initWordCloud() {
            const wordFreq = {
                "Data": 18,
                "Science": 15,
                "AI": 12,
                "Machine": 10,
                "Learning": 10,
                "Python": 9,
                "TensorFlow": 8,
                "Flask": 7,
                "React": 6,
                "SQL": 6,
                "Java": 5,
                "JavaScript": 5,
                "Projects": 8,
                "Models": 7,
                "Deployment": 6,
                "Analysis": 6,
                "Visualization": 5,
                "Engineering": 4,
                "Student": 4,
                "Morocco": 3,
                "Gambian": 3
            };
            
            WordCloud(document.getElementById('word-cloud'), { 
                list: Object.entries(wordFreq).map(([word, freq]) => [word, freq*10]),
                gridSize: 14,
                weightFactor: 1.1,
                fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                color: function (word, weight) {
                    return weight > 150 ? '#4361ee' : 
                           weight > 120 ? '#3f37c9' : 
                           weight > 90 ? '#4895ef' : 
                           weight > 60 ? '#4cc9f0' : '#f72585';
                },
                rotateRatio: 0.3,
                rotationSteps: 4,
                backgroundColor: 'rgba(15, 23, 42, 0)',
                minSize: 12
            });
        }

        function setupChat() {
            document.getElementById('sendButton').addEventListener('click', sendMessage);
            document.getElementById('userInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
        }

        function sendMessage() {
            const userInput = document.getElementById('userInput').value.trim();
            if (!userInput) return;
            
            // Add user message to chat
            addMessage(userInput, 'user');
            document.getElementById('userInput').value = '';
            
            // Show loader
            document.getElementById('loader').style.display = 'block';

            // Send request to backend RAG system
            fetch('/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: userInput })
            })
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    addMessage(data.response, 'bot');
                } else if (data.error) {
                    addMessage('Error: ' + data.error, 'bot');
                } else {
                    addMessage('Unexpected response from backend.', 'bot');
                }
                document.getElementById('loader').style.display = 'none';
            })
            .catch(error => {
                addMessage('Network error: ' + error, 'bot');
                document.getElementById('loader').style.display = 'none';
            });
        }

        function addMessage(text, sender) {
            const chatHistory = document.getElementById('chatHistory');
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
            
            if (sender === 'bot') {
                messageDiv.innerHTML = `${text}`;
            } else {
                messageDiv.innerHTML = `${text}`;
            }
            
            chatHistory.appendChild(messageDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }


        function setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }