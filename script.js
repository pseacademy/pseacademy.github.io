// 토픽과 질문 데이터
const topicsWithQuestions = {
    "Technology": ["What are the latest technological advancements?", "How does artificial intelligence impact our daily lives?", "What are the potential benefits and risks of blockchain technology?"],
    "Travel": ["What are some must-visit travel destinations?", "How has travel changed over the years?", "What are some tips for traveling on a budget?"],
    "Food": ["What are some popular dishes from around the world?", "How does food culture vary between different regions?", "What are some cooking techniques everyone should know?"],
    "History": ["What are some key events in world history?", "How has history shaped the present?", "What are some lesser-known historical facts?"],
    "Movies": ["What are some must-watch movies of all time?", "How has the film industry evolved over the years?", "What are some common themes in movies?"],
    "Books": ["What are some classic novels everyone should read?", "How does reading impact personal growth?", "What are some benefits of audiobooks over traditional books?"]
};

// 버튼 요소 가져오기
const generateBtn = document.getElementById("generate-btn");

// 토픽 표시 요소 가져오기
const topicDisplay = document.getElementById("topic-display");

// 질문 표시 요소 가져오기
const questionsDisplay = document.getElementById("questions");

// 랜덤 토픽과 질문 생성 함수
function generateRandomTopic() {
    // 토픽 랜덤 선택
    const topics = Object.keys(topicsWithQuestions);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // 질문 랜덤 선택
    const questions = topicsWithQuestions[randomTopic];
    const randomQuestions = questions.slice(0, 3); // 처음 3개의 질문 선택
    
    return { topic: randomTopic, questions: randomQuestions };
}

// 버튼 클릭 이벤트 리스너 추가
generateBtn.addEventListener("click", function() {
    // 랜덤 토픽과 질문 생성
    const { topic, questions } = generateRandomTopic();
    
    // 화면에 토픽 표시
    topicDisplay.textContent = "Random Topic: " + topic;
    
    // 질문들을 리스트로 표시
    questionsDisplay.innerHTML = "";
    const questionsList = document.createElement("ul");
    questions.forEach(question => {
        const questionItem = document.createElement("li");
        questionItem.textContent = question;
        questionsList.appendChild(questionItem);
    });
    questionsDisplay.appendChild(questionsList);
});
