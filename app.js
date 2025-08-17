// Configuration Data
const config = {
    inviterName: "Toanf",
    movieTitle: "Cậu chọn 🤭🤭",
    cinema: "",
    datetime: "2025-08-5T19:30:00+07:00",
    seats: "H10–H11",
    contact: {
        zalo: "0523919941",
        phone: "0523919941"
    },
    discordWebhook: "https://discord.com/api/webhooks/1406634995082072134/jFLzfPCNt5eEJAWSZlvDHRHUhj49WkiLx2tpe7ggfnVKUXLYdjmKaPmReNKCJG_M-5_Z"
};

// Random invitation messages
const invitationMessages = [
    "Cuối tuần đi xem phim nhé. Không nhận từ chối. Từ chối thì mình vẫn coi như đồng ý.😜😜"
];

// Headlines
const headlines = [
    "Thông báo gấp: Có người rủ cậu đi xem phim 😳🎬",
    "Mission: Cứu một chiếc vé phim khỏi cô đơn 💘",
    "Alert! Alert! Có người muốn hẹn hò với cậu 🚨💕",
    "Breaking: Vé couple đang tìm chủ nhân 👫✨"
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
    randomizeContent();
    setupEventListeners();
    setupExitIntent();
    initializeAudio();
});

// Load configuration data
function loadConfig() {
    // Update movie information
    document.getElementById('movieTitle').textContent = config.movieTitle;
    document.getElementById('cinema').textContent = config.cinema;
    
    // Format date and time
    const date = new Date(config.datetime);
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    document.getElementById('showDate').textContent = date.toLocaleDateString('vi-VN', dateOptions);
    document.getElementById('showTime').textContent = date.toLocaleTimeString('vi-VN', timeOptions);
    document.getElementById('seats').textContent = config.seats;
    
    // Update inviter info
    document.getElementById('inviterName').textContent = config.inviterName;
    
    // Update contact links
    document.getElementById('zaloLink').href = `https://zalo.me/${config.contact.zalo}`;
    document.getElementById('phoneLink').href = `tel:${config.contact.phone}`;
}

// Randomize content
function randomizeContent() {
    // Random headline
    const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
    document.getElementById('headline').textContent = randomHeadline;
    
    // Random invitation message
    const randomMessage = invitationMessages[Math.floor(Math.random() * invitationMessages.length)];
    document.getElementById('randomInvite').textContent = randomMessage;
}

// Setup event listeners
function setupEventListeners() {
    // Accept button
    document.getElementById('acceptBtn').addEventListener('click', handleAccept);
    
    // Reschedule button
    document.getElementById('rescheduleBtn').addEventListener('click', handleReschedule);
    
    // Set minimum date for date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('newDate').setAttribute('min', today);
}

// Handle accept action
function handleAccept() {
    playSound();
    showAcceptPopup();
    triggerConfetti();
    copyToClipboard();
    sendDiscordNotification('accept');
}

// Handle reschedule action
function handleReschedule() {
    playSound();
    showDatePickerPopup();
    sendDiscordNotification('reschedule');
}

// Show accept popup
function showAcceptPopup() {
    const popup = document.getElementById('acceptPopup');
    popup.classList.add('active');
}

// Close accept popup
function closeAcceptPopup() {
    const popup = document.getElementById('acceptPopup');
    popup.classList.remove('active');
}

// Show date picker popup
function showDatePickerPopup() {
    const popup = document.getElementById('datePickerPopup');
    popup.classList.add('active');
}

// Close date picker popup
function closeDatePickerPopup() {
    const popup = document.getElementById('datePickerPopup');
    popup.classList.remove('active');
}

// Confirm new date
function confirmNewDate() {
    const newDate = document.getElementById('newDate').value;
    const newTime = document.getElementById('newTime').value;
    
    if (!newDate || !newTime) {
        alert('Vui lòng chọn ngày và giờ nha! 📅');
        return;
    }
    
    const dateObj = new Date(newDate + 'T' + newTime);
    const formattedDate = dateObj.toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    alert(`Okiee! Vậy mình hẹn ${formattedDate} lúc ${newTime} nhé! 🎬💕`);
    closeDatePickerPopup();
    
    // Send Discord notification with new date
    sendDiscordNotification('newDate', { newDate, newTime, formattedDate });
    
    // Optional: Send the new date to backend or save it
    console.log('New date selected:', newDate, newTime);
}

// Copy to clipboard
function copyToClipboard() {
    const text = `Yay! ${config.inviterName} đã xác nhận đi xem phim "${config.movieTitle}" 
Rạp: ${config.cinema}
Ngày: ${document.getElementById('showDate').textContent}
Giờ: ${document.getElementById('showTime').textContent}
Ghế: ${config.seats}
See you there! 💕`;
    
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Trigger confetti animation
function triggerConfetti() {
    // Using canvas-confetti library
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Hearts
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            shapes: ['heart']
        }));
        
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            shapes: ['heart']
        }));
    }, 250);
}

// Setup exit intent detection
function setupExitIntent() {
    let exitIntentShown = false;
    
    // Mouse leave detection
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            showExitTooltip();
            exitIntentShown = true;
        }
    });
    
    // Mobile back button detection
    window.addEventListener('popstate', function(e) {
        if (!exitIntentShown) {
            e.preventDefault();
            showExitTooltip();
            exitIntentShown = true;
            
            // Push state again to prevent actual navigation
            history.pushState(null, '', window.location.href);
        }
    });
    
    // Initial push state for mobile
    history.pushState(null, '', window.location.href);
}

// Show exit tooltip
function showExitTooltip() {
    const tooltip = document.getElementById('exitTooltip');
    tooltip.classList.add('active');
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeExitTooltip();
    }, 5000);
}

// Close exit tooltip
function closeExitTooltip() {
    const tooltip = document.getElementById('exitTooltip');
    tooltip.classList.remove('active');
}

// Send Discord notification
function sendDiscordNotification(action, extraData = {}) {
    if (!config.discordWebhook) return;
    
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    let title, description, color;
    
    switch(action) {
        case 'accept':
            title = '🎉 Yay! Có người đồng ý đi xem phim!';
            description = `${config.inviterName} đã nhận được phản hồi tích cực!\n\n**Thông tin buổi chiếu:**\n🎬 Phim: ${config.movieTitle}\n🏢 Rạp: ${config.cinema}\n📅 Ngày: ${document.getElementById('showDate').textContent}\n🕐 Giờ: ${document.getElementById('showTime').textContent}\n💺 Ghế: ${config.seats}`;
            color = 0x00ff00; // Green
            break;
            
        case 'reschedule':
            title = '⏰ Có người muốn đổi lịch';
            description = `${config.inviterName} nhận được yêu cầu đổi lịch xem phim.\n\n**Lịch hiện tại:**\n🎬 Phim: ${config.movieTitle}\n🏢 Rạp: ${config.cinema}\n📅 Ngày: ${document.getElementById('showDate').textContent}\n🕐 Giờ: ${document.getElementById('showTime').textContent}`;
            color = 0xffa500; // Orange
            break;
            
        case 'newDate':
            title = '📅 Lịch mới đã được chọn!';
            description = `${config.inviterName} đã thống nhất lịch mới với crush!\n\n**Lịch mới:**\n🎬 Phim: ${config.movieTitle}\n🏢 Rạp: ${config.cinema}\n📅 Ngày: ${extraData.formattedDate}\n🕐 Giờ: ${extraData.newTime}\n💺 Ghế: ${config.seats}`;
            color = 0x0099ff; // Blue
            break;
            
        default:
            return;
    }
    
    const embed = {
        title: title,
        description: description,
        color: color,
        timestamp: timestamp,
        footer: {
            text: `Thiết bị: ${isMobile ? 'Mobile' : 'Desktop'} | ${new Date().toLocaleString('vi-VN')}`
        },
        fields: [
            {
                name: '🌐 Thông tin truy cập',
                value: `IP: Đang xử lý...\nUser Agent: ${userAgent.substring(0, 100)}...`,
                inline: false
            }
        ]
    };
    
    const payload = {
        embeds: [embed],
        username: 'Movie Invitation Bot',
        avatar_url: 'https://cdn.discordapp.com/emojis/1205973661234567890.png'
    };
    
    fetch(config.discordWebhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log('Discord notification sent successfully!');
        } else {
            console.error('Failed to send Discord notification:', response.status);
        }
    })
    .catch(error => {
        console.error('Error sending Discord notification:', error);
    });
}

// Initialize audio
let clickSound;

function initializeAudio() {
    clickSound = document.getElementById('clickSound');
    
    // Create a better click sound using Web Audio API as fallback
    if (!clickSound.src || clickSound.src === '') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        window.playClickSound = function() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        };
    }
}

// Play sound effect
function playSound() {
    try {
        if (clickSound && clickSound.src) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => {
                console.log('Audio play failed:', e);
                // Fallback to Web Audio API
                if (window.playClickSound) {
                    window.playClickSound();
                }
            });
        } else if (window.playClickSound) {
            window.playClickSound();
        }
    } catch (e) {
        console.log('Sound play error:', e);
    }
}

// Add some cute animations on load
window.addEventListener('load', function() {
    // Animate card entrance
    const card = document.querySelector('.invitation-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, 800 + (index * 200));
    });
});

// Add hover sound effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        // Play a soft hover sound
        if (window.playClickSound) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
        }
    });
});

// Add confetti shapes configuration
if (window.confetti) {
    // Add heart shape
    const heart = confetti.shapeFromPath({
        path: 'M167.5,25 C167.5,11.1928813 156.307119,0 142.5,0 C135.123893,0 128.361426,2.73041878 123.255814,7.17172139 C118.148375,2.73041878 111.385907,0 104.011719,0 C90.2028813,0 79.0117188,11.1928813 79.0117188,25 C79.0117188,28.2275391 79.6457589,31.3086506 80.7867704,34.1289062 L122.199219,90 L163.707031,34.1289062 C164.848043,31.3086506 165.480469,28.2275391 165.480469,25 L167.5,25 Z',
        matrix: [0.03, 0, 0, 0.03, -4.5, -2.5]
    });
    
    confetti.shapeFromPath({ path: heart });
}
