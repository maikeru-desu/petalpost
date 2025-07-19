<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maikeru-desu</title>
    <!-- Preload critical assets -->
    <link rel="preload" href="/assets/css/main.css" as="style">
    <link rel="preload" href="/assets/img/logo.png" as="image">
    <link rel="icon" href="/assets/img/maiikkeerruu.png">
    
    <!-- Load CSS non-blocking -->
    <link rel="stylesheet" href="/assets/css/main.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="/assets/css/main.css"></noscript>
</head>
<body>
    <main>
        <nav class="main-header-nav">
            <ul class="main-header-links">
                <li class="main-header-logo"><a href="#intro"><img class="" src="/assets/img/logo.png" alt="" style="width: 100px;" loading="lazy"></a></li>
                <li class="main-header-link"><a href="#intro">INTRO</a></li>
                <li class="main-header-link"><a href="#bio">BIO</a></li>
                <li class="main-header-link"><a href="#work">WORK</a></li>
                <li class="main-header-link"><a href="#content">CONTENT</a></li>
                <li class="main-header-link"><a href="">MY RESUME</a></li>
            </ul>
        </nav>

        <div class="main-intro" id="intro">
            <div class="main-intro-image">
                <img src="/assets/img/main-intro-tree-mobile.jpg" alt="" class="main-intro-tree-mobile" loading="lazy">
                <img src="/assets/img/main-intro-tree.jpg" alt="" class="main-intro-tree" loading="lazy">
            </div>

            <img src="/assets/img/main-intro-grass-mobile.png" alt="" class="main-intro-grass-mobile" loading="lazy">
            <img src="/assets/img/main-intro-grass.png" alt="" class="main-intro-grass" loading="lazy">

            <div class="main-intro-quote">
                <p>Maybe I am the Sun that You are looking for.</p>
            </div>
        </div>

        <div class="main-bio" id="bio">
            <div class="main-bio-image">
                <img src="/assets/img/main-bio-mountain-mobile.jpg" alt="" srcset="" class="main-bio-mountain-mobile" loading="lazy">
                <img src="/assets/img/main-bio-mountain.jpg" alt="" srcset="" class="main-bio-mountain" loading="lazy">
                <img src="/assets/img/head.png" alt="" class="main-bio-head" loading="lazy">

                <div class="main-bio-box">
                    <img src="/assets/img/hand.png" alt="" class="main-bio-hand" loading="lazy">

                    <p class="main-bio-box-title">
                        A LITTLE ABOUT ME
                    </p>

                    <div class="main-bio-para">
                        <p>
                            Hi, I'm Michael, a Full Stack Web Developer with over 6 years of professional experience in building modern, scalable, and secure web applications.
                        </p>
                    </div>
                    <div class="main-bio-para">
                        <p>
                            I work across both frontend and backend—developing RESTful APIs, handling server tasks, and building responsive interfaces using technologies like Laravel, Vue.js, React, and Tailwind. I've contributed to a variety of projects, from startups to enterprise systems, always aiming to write clean, efficient code and deliver real value.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-work-header" id="work">
            <img src="/assets/img/main-work-header.jpg" alt="" class="main-work-header-image" loading="lazy">
            <div class="main-work-header-title">
                <div class="main-work-header-border">
                    <p>MY WORKS</p>
                </div>
            </div>
        </div>



        <div class="main-work" id="content">

            <div class="main-work-item">
                <div class="main-work-thumbnail">
                    <img src="{{ asset('project-thumbnails/petalpost.png') }}" alt="" class="main-work-image" loading="lazy">
                </div>
                <div class="main-work-description">
                    <div>
                        <h2>PetalPost - Modern Flower Shop E-Commerce</h2>
                    <p>
                        PetalPost is a full-stack e-commerce platform for a modern flower shop, built with Laravel and React. It features a responsive design, secure authentication, product catalog management, and a smooth shopping experience with a unique floral-themed UI.
                    </p>
                    </div>
                    <div class="main-work-links">
                        <a href="https://petalpost.maikeru-desu.quest/" target="_blank" rel="noopener noreferrer">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#ffe5bb"></path> </g></svg>
                            Website
                        </a>
                        <a href="https://github.com/maikeru-desu/petalpost" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                                <g fill="#ffe5bb" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path></g></g>
                            </svg>
                            Github
                        </a>
                    </div>
                </div>
            </div>

            <div class="main-work-item">
                <div class="main-work-thumbnail">
                    <img src="{{ asset('project-thumbnails/genius-todolist.png') }}" alt="" class="main-work-image" loading="lazy">
                </div>
                <div class="main-work-description">
                    <div>
                        <h2>Genius Todolist</h2>
                        <p>Genius TodoList is a modern, AI-enhanced task management application that helps users organize and prioritize their tasks efficiently. The application leverages AI to analyze task importance and deadlines, providing intelligent suggestions for task prioritization.</p>
                    </div>
                    <div class="main-work-links">
                        <a href="https://genius.maikeru-desu.quest/" target="_blank" rel="noopener noreferrer">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#ffe5bb"></path> </g></svg>
                            Website
                        </a>
                        <a href="https://github.com/maikeru-desu/genius-todolist" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                                <g fill="#ffe5bb" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path></g></g>
                            </svg>
                            Github
                        </a>
                    </div>
                </div>
            </div>

            {{-- <a href="#" class="main-work-link">
                <img src="{{ asset('project-thumbnails/genius-todolist.png') }}" alt="" class="main-work-image" loading="lazy">
                <p class="main-work-project-title">Genius Todolist</p>
            </a>

            <a href="#" class="main-work-link">
                <img src="{{ asset('project-thumbnails/petalpost.png') }}" alt="" class="main-work-image" loading="lazy">
                <p class="main-work-project-title">Petalpost</p>
            </a> --}}
        </div>

        <div class="main-contact">
            <div class="main-contact-background">
                <img src="/assets/img/main-contact-mobile.jpg" alt="" srcset="" class="main-contact-image-mobile" loading="lazy">
                <img src="/assets/img/main-contact.jpg" alt="" srcset="" class="main-contact-image" loading="lazy">
            </div>

            <div class="main-contact-head-logo">
                <a href="#">
                    <img src="/assets/img/main-logo-white.png" alt="" class="" loading="lazy">
                </a>
            </div>

            <p class="main-contact-title">
                CONTACTS
            </p>

            <img src="/assets/img/logo-phone.png" alt="" class="main-contact-phone-logo" loading="lazy">

            <p class="main-contact-phone-info">
                0976-437-0569
            </p>

            <img src="/assets/img/logo-mail.png" alt="" class="main-contact-mail-logo" loading="lazy">

            <p class="main-contact-mail-info">
                gelvezmichael@yahoo.com
            </p>

            <p class="main-contact-social-title">
                SOCIAL MEDIA
            </p>

            <div class="main-contact-social-links">
                <a href="https://twitter.com/maikeru_dev" class="main-contact-social-link" target="_blank">
                    <img src="/assets/img/logo-twitter.png" alt="" class="" loading="lazy">
                </a>
                <a href="https://www.linkedin.com/in/michaelgelvez/" class="main-contact-social-link" target="_blank">
                    <img src="/assets/img/logo-linkedin.png" alt="" class="" loading="lazy">
                </a>

                <a href="https://github.com/maikeru-desu" class="main-contact-social-link" target="_blank">
                    <img src="/assets/img/logo-github.png" alt="" class="" loading="lazy">
                </a>
            </div>

            <div class="main-contact-your-info">
                
                    <form action="" method="POST" class="main-contact-info">
                        @csrf
                        <img src="/assets/img/paper.png" alt="" class="main-contact-paper" loading="lazy">
                        <img src="/assets/img/pin.png" alt="" class="main-contact-pin" loading="lazy">

                        <input type="text" name="name" id="name" class="main-contact-name" required>
                        <label for="name" class="main-contact-label-name">Your Name</label>

                        <input type="email" name="email" id="email" class="main-contact-email" required>
                        <label for="email" class="main-contact-label-email">Your Email</label>

                        <input type="text" name="message" id="message" class="main-contact-message" required>
                        <label for="message" class="main-contact-label-message">Your Message</label>

                        <button type="submit" class="main-contact-send">SEND</button>
                    </form>
                
            </div>
        </div>
    </main>
    <!-- Quote Modal -->
    <div class="modal-overlay" id="quoteModalOverlay"></div>
    <div class="quote-modal" id="quoteModal">
        <div class="modal-header">
            <h2>Sun Quote</h2>
            <span class="modal-close-btn" onclick="closeQuoteModal()">&times;</span>
        </div>
        <div class="modal-body">
            <p>To me, clients are like sunflowers — always turning toward the light of possibility. And maybe, just maybe, I’m the sun you've been searching for to help your ideas bloom into something beautiful.</p>
        </div>
    </div>
    
    <!-- Success Modal -->
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="quote-modal" id="successModal">
        <div class="modal-header">
            <h2>Message Sent!</h2>
            <span class="modal-close-btn" onclick="closeModal()">&times;</span>
        </div>
        <div class="modal-body">
            <div class="emoji-container">
            <img src="{{ asset('assets/img/sunflower.png') }}" alt="" class="" loading="lazy">
            </div>
            <p>Yay! Your message has been sent successfully!</p>
            <p>I'll get back to you as soon as possible.</p>
            <button class="modal-close" onclick="closeModal()">Awesome!</button>
        </div>
    </div>
    
    <script>
        // Show modal if success message exists
        document.addEventListener('DOMContentLoaded', function() {
            @if(session('success'))
                showModal();
            @endif
            
            // Add event listener for form submission
            const form = document.querySelector('.main-contact-info form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    // Form will still submit normally
                    // The modal will be shown on page reload if session('success') exists
                });
            }
            
            // Add event listener for quote click
            const quoteText = document.querySelector('.main-intro-quote > p');
            if (quoteText) {
                quoteText.addEventListener('click', function() {
                    showQuoteModal();
                });
                
                // Add a cursor pointer to indicate it's clickable
                quoteText.style.cursor = 'pointer';
            }
        });
        
        function showModal() {
            document.getElementById('modalOverlay').style.display = 'block';
            document.getElementById('successModal').style.display = 'block';
            document.getElementById('successModal').classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('modalOverlay').style.display = 'none';
            document.getElementById('successModal').style.display = 'none';
            document.getElementById('successModal').classList.remove('active');
        }
        
        function showQuoteModal() {
            const modal = document.getElementById('quoteModal');
            const overlay = document.getElementById('quoteModalOverlay');
            
            overlay.classList.add('active');
            modal.classList.add('active');
        }
        
        function closeQuoteModal() {
            const modal = document.getElementById('quoteModal');
            const overlay = document.getElementById('quoteModalOverlay');
            
            overlay.classList.remove('active');
            modal.classList.remove('active');
        }
    </script>
</body>
</html>
