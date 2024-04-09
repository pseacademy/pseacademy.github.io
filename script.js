// 데이터: 각 날짜의 Casual Conversation과 Following Questions
const data = {
    "Day1": {
        "topic": "What is your favorite hobby?",
        "questions": ["What do you enjoy most about it?", "How did you get into it?", "Do you have any tips for beginners?"]
    },
    "Day2": {
        "topic": "What's the last movie you watched?",
        "questions": ["What did you think about it?", "Would you recommend it?", "Who would you recommend it to?"]
    },
    "Day3": {
        "topic": "If you could travel anywhere, where would you go?",
        "questions": ["Why would you choose that destination?", "What would you like to do there?", "Who would you bring with you?"]
    },
    // Day4부터 Day20까지의 데이터도 동일하게 작성
    "Day4": {
        "topic": "What's your favorite type of cuisine?",
        "questions": ["What dish would you recommend?", "Have you ever tried cooking it yourself?", "Where did you first try it?"]
    },
    // 나머지 Day들의 데이터도 동일하게 작성
    "Day20": {
        "topic": "What's your favorite book?",
        "questions": ["What did you like most about it?", "Did it leave an impact on you?", "Would you recommend it to others?"]
    }
};

// 휴일 배열 설정 (월과 일을 모두 고려하여 설정)
const holidays = [
    "2024-04-05", // 휴일 1
    "2024-04-15"  // 휴일 2
    // 필요한 만큼 휴일을 추가하세요
];

let questionsVisible = false; // 질문이 현재 보이는지 여부를 추적하는 변수

// 버튼 클릭 시 Following Questions 표시 또는 숨기기
document.getElementById('showQuestionsBtn').addEventListener('click', function() {
    // 사용자가 설정한 개강일과 종강일
    const startDate = new Date("2024-04-01"); // 개강일
    const endDate = new Date("2024-04-26");   // 종강일

    // 오늘의 날짜
    const today = new Date();
    let currentDay = 0; // 오늘의 Day

    // 오늘의 날짜가 개강일 이전인 경우
    if (today < startDate) {
        alert("개강일 이전입니다.");
        return;
    }

    // 오늘의 날짜가 종강일 이후인 경우
    if (today > endDate) {
        alert("종강일 이후입니다.");
        return;
    }

    // 오늘의 Day 계산 (휴일은 제외)
    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        if (i.getDay() !== 0 && i.getDay() !== 6) { // 휴일이 아닌 경우에만 Day 증가
            currentDay++;
        }
        if (i.toDateString() === today.toDateString()) {
            break; // 오늘의 날짜와 일치하는 경우 종료
        }
    }

    // 현재 Day에 해당하는 데이터를 가져와서 표시
    const currentData = data[`Day${currentDay}`];
    if (currentData) {
        const questionsContainer = document.getElementById('questionsContainer');
        questionsContainer.innerHTML = ''; // 이전에 표시된 질문들을 초기화
        currentData.questions.forEach(question => {
            const questionElement = document.createElement('p');
            questionElement.textContent = question;
            questionsContainer.appendChild(questionElement);
        });
        this.textContent = 'Hide Questions';
        questionsVisible = true;
    } else {
        alert('There are no questions for today.');
    }
});
