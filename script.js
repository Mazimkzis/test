// Функция для показа выбранного раздела
function showSection(sectionId) {
    // Скрываем все разделы
    const sections = document.querySelectorAll('.topic');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Показываем выбранный раздел
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
    
    // Обновляем активную кнопку
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        if (button.innerText.toLowerCase() === sectionId.toLowerCase()) {
            button.style.backgroundColor = '#1557b0';
        } else {
            button.style.backgroundColor = '#1a73e8';
        }
    });
}

// Функция для отправки прогресса боту
async function sendProgress() {
    const telegramId = document.getElementById('telegramId').value;
    const progressStatus = document.getElementById('progress-status');
    
    if (!telegramId) {
        progressStatus.textContent = 'Пожалуйста, введите ваш Telegram ID';
        progressStatus.style.backgroundColor = '#ffebee';
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/send_progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telegram_id: telegramId,
                progress: {
                    html: !document.getElementById('html').classList.contains('hidden'),
                    css: !document.getElementById('css').classList.contains('hidden'),
                    js: !document.getElementById('js').classList.contains('hidden')
                }
            })
        });

        if (response.ok) {
            progressStatus.textContent = 'Прогресс успешно отправлен боту!';
            progressStatus.style.backgroundColor = '#e8f5e9';
        } else {
            throw new Error('Ошибка при отправке');
        }
    } catch (error) {
        progressStatus.textContent = 'Ошибка при отправке прогресса. Проверьте, запущен ли бот.';
        progressStatus.style.backgroundColor = '#ffebee';
    }
}

// Показываем HTML раздел при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    showSection('html');
});
