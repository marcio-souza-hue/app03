// JavaScript for Discover Brazil App

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Region Tabs
    const regionTabs = document.querySelectorAll('.tab-btn');
    const regionPanes = document.querySelectorAll('.tab-pane');
    
    regionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            regionTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab panes
            regionPanes.forEach(pane => pane.classList.remove('active'));
            // Show the corresponding tab pane
            const region = tab.getAttribute('data-region');
            document.getElementById(region).classList.add('active');
        });
    });
    
    // Language Category Tabs
    const categoryBtns = document.querySelectorAll('.category-btn');
    const phraseLists = document.querySelectorAll('.phrase-list');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all category buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all phrase lists
            phraseLists.forEach(list => list.classList.remove('active'));
            // Show the corresponding phrase list
            const category = btn.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
    
    // Flight Tabs
    const flightTabs = document.querySelectorAll('.flight-tab-btn');
    const flightPanes = document.querySelectorAll('.flight-tab-pane');
    
    flightTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            flightTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab panes
            flightPanes.forEach(pane => pane.classList.remove('active'));
            // Show the corresponding tab pane
            const flight = tab.getAttribute('data-flight');
            document.getElementById(flight + '-flights').classList.add('active');
        });
    });
    
    // Audio Playback for Portuguese Phrases
    const audioButtons = document.querySelectorAll('.play-audio');
    
    audioButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioId = button.getAttribute('data-audio');
            // In a real implementation, this would play an audio file
            console.log(`Playing audio for: ${audioId}`);
            
            // Visual feedback for button press
            button.classList.add('playing');
            setTimeout(() => {
                button.classList.remove('playing');
            }, 1000);
            
            // Simulate audio playback with alert for prototype
            alert(`Audio would play for: "${audioId}" phrase`);
        });
    });
    
    // Portuguese Quiz Functionality
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.querySelector('.quiz-feedback');
    const nextQuestionBtn = document.querySelector('.next-question');
    
    // Sample quiz questions
    const quizQuestions = [
        {
            question: "How would you say 'Thank you' in Portuguese?",
            options: ["De nada", "Obrigado/Obrigada", "Por favor", "Bom dia"],
            correctIndex: 1
        },
        {
            question: "Which phrase means 'Good morning' in Portuguese?",
            options: ["Boa noite", "Boa tarde", "Bom dia", "Olá"],
            correctIndex: 2
        },
        {
            question: "How do you say 'Excuse me' in Portuguese?",
            options: ["Com licença", "Obrigado", "Por favor", "Sim"],
            correctIndex: 0
        }
    ];
    
    let currentQuestionIndex = 0;
    
    // Function to load a quiz question
    function loadQuestion(index) {
        const question = quizQuestions[index];
        document.querySelector('.quiz-question p').textContent = question.question;
        
        quizOptions.forEach((option, i) => {
            option.textContent = question.options[i];
            option.setAttribute('data-correct', i === question.correctIndex);
            option.classList.remove('correct', 'incorrect');
        });
        
        quizFeedback.textContent = '';
        quizFeedback.classList.remove('correct', 'incorrect');
    }
    
    // Initialize with first question
    loadQuestion(0);
    
    // Handle option selection
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Prevent multiple selections
            if (quizOptions[0].classList.contains('correct') || 
                quizOptions[0].classList.contains('incorrect')) {
                return;
            }
            
            const isCorrect = option.getAttribute('data-correct') === 'true';
            
            // Mark all options as correct/incorrect
            quizOptions.forEach(opt => {
                if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                } else if (opt === option && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });
            
            // Show feedback
            if (isCorrect) {
                quizFeedback.textContent = 'Correct! Well done!';
                quizFeedback.classList.add('correct');
            } else {
                quizFeedback.textContent = 'Incorrect. Try again!';
                quizFeedback.classList.add('incorrect');
            }
        });
    });
    
    // Handle next question button
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
        loadQuestion(currentQuestionIndex);
    });
    
    // Flight Search Functionality (Simulated)
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.querySelector('.search-results');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const departure = document.getElementById('departure').value;
            const destination = document.getElementById('destination').value;
            const departureDate = document.getElementById('departure-date').value;
            const returnDate = document.getElementById('return-date').value;
            
            if (!departure || !destination || !departureDate || !returnDate) {
                searchResults.innerHTML = '<p class="error">Please fill in all fields to search for flights.</p>';
                return;
            }
            
            // Simulate loading
            searchResults.innerHTML = '<p>Searching for flights...</p>';
            
            // Simulate API response delay
            setTimeout(() => {
                // Generate mock flight results
                let resultsHTML = `
                    <h4>Flight Results: ${departure} to ${destination}</h4>
                    <div class="flight-results-grid">
                `;
                
                // Generate 3-5 random flight options
                const numResults = Math.floor(Math.random() * 3) + 3;
                const airlines = ['LATAM', 'TAP Air Portugal', 'American Airlines', 'United', 'Delta', 'Azul'];
                
                for (let i = 0; i < numResults; i++) {
                    const airline = airlines[Math.floor(Math.random() * airlines.length)];
                    const price = Math.floor(Math.random() * 500) + 700;
                    const duration = Math.floor(Math.random() * 4) + 8;
                    const stops = Math.floor(Math.random() * 2);
                    
                    resultsHTML += `
                        <div class="flight-result">
                            <div class="flight-airline">
                                <img src="images/${airline.toLowerCase().replace(' ', '-')}-logo.png" alt="${airline}" class="airline-logo">
                                <span>${airline}</span>
                            </div>
                            <div class="flight-details">
                                <div class="flight-time">
                                    <span class="departure">08:${Math.floor(Math.random() * 60)}</span>
                                    <span class="duration">${duration}h ${Math.floor(Math.random() * 60)}m</span>
                                    <span class="arrival">18:${Math.floor(Math.random() * 60)}</span>
                                </div>
                                <div class="flight-path">
                                    <span>${stops === 0 ? 'Nonstop' : stops + ' stop'}</span>
                                </div>
                            </div>
                            <div class="flight-price">
                                <span>$${price}</span>
                                <button class="select-flight">Select</button>
                            </div>
                        </div>
                    `;
                }
                
                resultsHTML += `
                    </div>
                    <p class="disclaimer">Note: These are simulated results for demonstration purposes only.</p>
                `;
                
                searchResults.innerHTML = resultsHTML;
                
                // Add event listeners to select buttons
                document.querySelectorAll('.select-flight').forEach(button => {
                    button.addEventListener('click', () => {
                        alert('This is a prototype. In the full version, this would proceed to the booking page.');
                    });
                });
            }, 1500);
        });
    }
});
