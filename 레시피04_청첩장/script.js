document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Countdown Timer
    // Set the date we're counting down to: 2040-07-07 12:00:00
    const countDownDate = new Date("Jul 7, 2040 12:00:00").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display results
        document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

        // If the count down is finished
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "<p>결혼식이 시작되었습니다!</p>";
        }
    }, 1000);

    // 3. Copy Account Number to Clipboard
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const account = e.target.getAttribute('data-account');
            const bank = e.target.getAttribute('data-bank');
            const textToCopy = `${bank} ${account}`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert(`${bank} 계좌번호가 복사되었습니다.\n${account}`);
            }).catch(err => {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert(`${bank} 계좌번호가 복사되었습니다.\n${account}`);
                } catch (err) {
                    alert('복사에 실패했습니다. 직접 선택하여 복사해주세요.');
                }
                document.body.removeChild(textArea);
            });
        });
    });
});
