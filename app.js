/*
========================================================================
   GOWSALRAJ R - FLUTTER DEVELOPER PORTFOLIO ENGINE (JS)
   Powers interactive widgets, live simulator sandbox, and transitions.
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. TYPING TEXT ANIMATION
    const typingText = document.getElementById('typing-text');
    const words = [
        "beautiful cross-platform apps",
        "smooth 60fps mobile interfaces",
        "scalable MVVM architectures",
        "clean Riverpod & Provider systems",
        "optimized and robust mobile products"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // faster deletion
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // pause at completion
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // brief pause before next word
        }

        setTimeout(type, typeSpeed);
    }
    // Start typing cycle
    setTimeout(type, 1000);

    // 2. FLOATING NAVIGATION SCROLL EFFECT & SCROLL HIGH-LIGHTING
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky/Shrink navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. RESPONSIVE MOBILE MENU
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNavPanel.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNavPanel.classList.contains('active')) {
            icon.classList.replace('fa-bars-staggered', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars-staggered');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavPanel.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars-staggered');
        });
    });

    // 4. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. FLUTTER WIDGET SANDBOX ENGINE
    const ctrlRadius = document.getElementById('ctrl-radius');
    const ctrlPadding = document.getElementById('ctrl-padding');
    const ctrlElevation = document.getElementById('ctrl-elevation');
    const ctrlText = document.getElementById('ctrl-text');
    
    const valRadius = document.getElementById('val-radius');
    const valPadding = document.getElementById('val-padding');
    const valElevation = document.getElementById('val-elevation');
    
    const simulatedWidget = document.getElementById('simulated-widget');
    const widgetMsg = document.getElementById('widget-msg');
    const dartCodeBlock = document.getElementById('dart-code-block');
    const themeBtns = document.querySelectorAll('.theme-btn');
    
    let activeTheme = 'blue';

    function updateWidget() {
        const radius = ctrlRadius.value;
        const padding = ctrlPadding.value;
        const elevation = ctrlElevation.value;
        const msg = ctrlText.value || 'Build stunning apps with Flutter';

        // Update Slider Labels
        valRadius.textContent = `${radius}px`;
        valPadding.textContent = `${padding}px`;
        valElevation.textContent = `${elevation}px`;

        // Update Simulated UI Element
        simulatedWidget.style.borderRadius = `${radius}px`;
        simulatedWidget.style.padding = `${padding}px`;
        simulatedWidget.style.boxShadow = `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, ${elevation > 0 ? 0.35 : 0})`;
        widgetMsg.textContent = msg;

        // Render Syntax Highlighted Dart Code Output
        renderDartCode(radius, padding, elevation, msg);
    }

    function renderDartCode(radius, padding, elevation, text) {
        // Construct code content with styled tags for key concepts
        const codeHTML = `
<span class="dart-keyword">import</span> <span class="dart-string">'package:flutter/material.dart'</span>;

<span class="dart-comment">/// Real-Time Custom Flutter Widget built by Gowsalraj R</span>
<span class="dart-keyword">class</span> <span class="dart-class">CustomGowsalCard</span> <span class="dart-keyword">extends</span> <span class="dart-class">StatelessWidget</span> {
  <span class="dart-keyword">const</span> <span class="dart-class">CustomGowsalCard</span>({<span class="dart-class">Key</span>? key}) : <span class="dart-keyword">super</span>(key: key);

  @override
  <span class="dart-class">Widget</span> build(<span class="dart-class">BuildContext</span> context) {
    <span class="dart-keyword">return</span> <span class="dart-class">Card</span>(
      elevation: <span class="dart-number">${parseFloat(elevation).toFixed(1)}</span>,
      shape: <span class="dart-class">RoundedRectangleBorder</span>(
        borderRadius: <span class="dart-class">BorderRadius</span>.circular(<span class="dart-number">${radius}.0</span>),
      ),
      child: <span class="dart-class">Container</span>(
        decoration: <span class="dart-class">BoxDecoration</span>(
          gradient: <span class="dart-class">LinearGradient</span>(
            colors: [
              <span class="dart-class">Colors</span>.${getThemeColor1()},
              <span class="dart-class">Colors</span>.${getThemeColor2()},
            ],
          ),
        ),
        padding: <span class="dart-keyword">const</span> <span class="dart-class">EdgeInsets</span>.all(<span class="dart-number">${padding}.0</span>),
        child: <span class="dart-class">Column</span>(
          mainAxisSize: <span class="dart-class">MainAxisSize</span>.min,
          children: [
            <span class="dart-keyword">const</span> <span class="dart-class">Icon</span>(
              <span class="dart-class">Icons</span>.mobile_friendly,
              size: <span class="dart-number">28.0</span>,
              color: <span class="dart-class">Colors</span>.white,
            ),
            <span class="dart-keyword">const</span> <span class="dart-class">SizedBox</span>(height: <span class="dart-number">8.0</span>),
            <span class="dart-class">Text</span>(
              <span class="dart-string">"${text}"</span>,
              style: <span class="dart-keyword">const</span> <span class="dart-class">TextStyle</span>(
                fontSize: <span class="dart-number">14.0</span>,
                fontWeight: <span class="dart-class">FontWeight</span>.bold,
                color: <span class="dart-class">Colors</span>.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}`;
        dartCodeBlock.innerHTML = codeHTML.trim();
    }

    function getThemeColor1() {
        if (activeTheme === 'blue') return 'blue[800]!';
        if (activeTheme === 'purple') return 'purple[800]!';
        if (activeTheme === 'orange') return 'orange[800]!';
        return 'green[800]!';
    }
    function getThemeColor2() {
        if (activeTheme === 'blue') return 'cyanAccent';
        if (activeTheme === 'purple') return 'purpleAccent';
        if (activeTheme === 'orange') return 'amberAccent';
        return 'greenAccent';
    }

    // Set Slider Event Listeners
    ctrlRadius.addEventListener('input', updateWidget);
    ctrlPadding.addEventListener('input', updateWidget);
    ctrlElevation.addEventListener('input', updateWidget);
    ctrlText.addEventListener('input', updateWidget);

    // Set Theme buttons click handlers
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTheme = btn.dataset.color;
            
            // Swap widget theme classes
            simulatedWidget.className = 'simulated-widget-box';
            if (activeTheme !== 'blue') {
                simulatedWidget.classList.add(`theme-${activeTheme}`);
            }
            updateWidget();
        });
    });

    // Copy Code functionality
    const copyCodeBtn = document.getElementById('copy-code-btn');
    copyCodeBtn.addEventListener('click', () => {
        // Strip tags for raw copy text
        const tempText = dartCodeBlock.textContent;
        navigator.clipboard.writeText(tempText).then(() => {
            const originalHTML = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = `<i class="fa-solid fa-check" style="color: #4caf50"></i> Copied!`;
            setTimeout(() => {
                copyCodeBtn.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Copy failed: ', err);
        });
    });

    // Initial Trigger
    updateWidget();


    // 6. INTERACTIVE PROJECTS SMARTPHONE ENGINE
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectDetails = document.querySelectorAll('.project-detail-content');
    const projectViewport = document.getElementById('project-screen-viewport');

    let attendanceLogs = [
        { time: '09:05 AM', status: 'IN' },
        { time: '05:32 PM', status: 'OUT' }
    ];

    let supportTickets = [
        { title: 'Server Sync Failure', id: 'TCK-2940', status: 'progress' },
        { title: 'Button Padding Glitch', id: 'TCK-9401', status: 'resolved' },
        { title: 'JWT Token Refresh Alert', id: 'TCK-3402', status: 'open' }
    ];

    function renderProjectAppScreen(projectId) {
        // Clear viewport
        projectViewport.innerHTML = '';

        if (projectId === 'attendance') {
            // Render Employee Attendance Screen
            projectViewport.innerHTML = `
                <div class="screen-attendance animate-fade">
                    <div class="app-header-simple">
                        <span>AttendFlow Pro</span>
                        <i class="fa-solid fa-circle-user"></i>
                    </div>
                    
                    <div class="app-attendance-status">
                        <span class="app-status-lbl">TODAY STATUS</span>
                        <span class="app-status-time" id="sim-clock">10:00:00 AM</span>
                    </div>

                    <div class="app-btn-check" id="btn-sim-check">
                        <i class="fa-solid fa-fingerprint"></i>
                        <span id="sim-check-lbl">CHECK OUT</span>
                    </div>

                    <div class="app-logs">
                        <span class="log-lbl">CHECKING HISTORY</span>
                        <div id="sim-log-list" class="log-list-container">
                            <!-- Logs injected here -->
                        </div>
                    </div>
                </div>
            `;
            updateSimLogs();
            initAttendanceActions();

        } else if (projectId === 'support') {
            // Render Customer Support Screen
            projectViewport.innerHTML = `
                <div class="screen-support animate-fade">
                    <div class="app-header-simple">
                        <span>CareDesk Console</span>
                        <i class="fa-solid fa-headset"></i>
                    </div>

                    <div class="support-hero">
                        <span class="support-hero-lbl">Active Service Tickets</span>
                        <span class="support-hero-tickets">${supportTickets.filter(t=>t.status !== 'resolved').length}</span>
                        <div class="support-btn-raise" id="btn-sim-raise">Raise Ticket +</div>
                    </div>

                    <div class="support-ticket-list" id="sim-ticket-list">
                        <!-- Tickets injected here -->
                    </div>
                </div>
            `;
            updateSimTickets();
            initSupportActions();
        }
    }

    // Attendance Log updater
    function updateSimLogs() {
        const logContainer = document.getElementById('sim-log-list');
        if (!logContainer) return;
        
        logContainer.innerHTML = attendanceLogs.map(log => `
            <div class="log-row">
                <span>Check ${log.status}</span>
                <span class="${log.status === 'IN' ? 'log-status-in' : 'log-status-out'}">${log.time}</span>
            </div>
        `).join('');
    }

    // Support Ticket list updater
    function updateSimTickets() {
        const listContainer = document.getElementById('sim-ticket-list');
        if (!listContainer) return;

        listContainer.innerHTML = supportTickets.map(ticket => `
            <div class="ticket-row">
                <div class="ticket-details">
                    <span class="ticket-title">${ticket.title}</span>
                    <span class="ticket-id">${ticket.id}</span>
                </div>
                <span class="ticket-badge ${ticket.status}">${ticket.status.toUpperCase()}</span>
            </div>
        `).join('');
    }

    // Setup interactive events for Attendance Simulator
    function initAttendanceActions() {
        const checkBtn = document.getElementById('btn-sim-check');
        const checkLbl = document.getElementById('sim-check-lbl');
        const clockEl = document.getElementById('sim-clock');
        
        // Setup simple dynamic clock inside app
        let clockTimer = setInterval(() => {
            if (!document.getElementById('sim-clock')) {
                clearInterval(clockTimer);
                return;
            }
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString();
        }, 1000);

        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                if (checkLbl.textContent === 'CHECK IN') {
                    // Check in
                    attendanceLogs.unshift({ time: timeString, status: 'IN' });
                    checkLbl.textContent = 'CHECK OUT';
                    checkBtn.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
                    checkBtn.style.boxShadow = '0 8px 16px rgba(244,67,54,0.25)';
                } else {
                    // Check out
                    attendanceLogs.unshift({ time: timeString, status: 'OUT' });
                    checkLbl.textContent = 'CHECK IN';
                    checkBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
                    checkBtn.style.boxShadow = '0 8px 16px rgba(76,175,80,0.25)';
                }
                updateSimLogs();
            });
        }
    }

    // Setup interactive events for Support Simulator
    function initSupportActions() {
        const raiseBtn = document.getElementById('btn-sim-raise');
        if (raiseBtn) {
            raiseBtn.addEventListener('click', () => {
                const ticketTitle = prompt("Enter support issue description:", "Network handshake error");
                if (ticketTitle) {
                    const randomId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
                    supportTickets.unshift({ title: ticketTitle, id: randomId, status: 'open' });
                    
                    // Re-render
                    renderProjectAppScreen('support');
                }
            });
        }
    }

    // Tab Switches
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            projectTabs.forEach(t => t.classList.remove('active'));
            projectDetails.forEach(d => d.classList.remove('active'));

            tab.classList.add('active');
            const projectId = tab.dataset.project;
            
            // Show corresponding detail card
            document.getElementById(`project-detail-${projectId}`).classList.add('active');
            
            // Trigger Phone screen swap
            renderProjectAppScreen(projectId);
        });
    });

    // Load initial screen
    renderProjectAppScreen('attendance');


    // 7. PREMIUM CONTACT FORM HANDLER & SUCCESS MODAL
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('success-overlay');
    const successCloseBtn = document.getElementById('success-close-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple micro-validation feedback
            const submitBtn = contactForm.querySelector('.btn-submit');
            const origHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;

            setTimeout(() => {
                // Success popup reveal
                successOverlay.classList.add('active');
                
                // Clear fields
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = origHTML;
            }, 1200);
        });
    }

    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            successOverlay.classList.remove('active');
        });
    }
});
