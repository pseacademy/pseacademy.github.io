// script.js

// HTML 요소 가져오기
const startDateInput = document.getElementById("start-date");
const courseSelect = document.getElementById("course");
const classSelect = document.getElementById("class");
const customMessageInput = document.getElementById("custom-message");
const generateBtn = document.getElementById("generate-btn");
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeModalBtn = document.querySelector(".close");
const defaultMessageInput = document.getElementById("default-message");
const saveDefaultMessageBtn = document.getElementById("save-default-message-btn");
const messageOutput = document.getElementById("message-output");

// 기본 문자 양식
let defaultMessage = `프린서플 수강 신청 확인 안내

★ 개강은 [start_date] 입니다.

★ 스터디는 개강일 [study_start_date]부터 시작됩니다.

**교재안내
- [class] 수업교재(개강 후 e-book 배부), Oxford Picture Dictionary - 3rd Edition, English(학원 또는 시중 구매)

**교재 구매 링크(택배) : https://forms.gle/ao8x4dQvjw8dEx9v5

3층 안내데스크로 방문하거나 택배로 교재를 구매하실 수 있습니다.
개강일에는 등록 및 상담 등의 업무로 안내데스크가 상당히 혼잡할 수 있으니 여유있게 방문해 주시기 바랍니다.

개강 후 학원 생활 안내 오리엔테이션이 진행됩니다.
혹시 오리엔테이션에 불참하신 경우에는 3층 안내데스크로 문의해 주시기 바랍니다.

※ 온라인 수강생은 개강일 오전 8시 온라인 수강 방법 안내 문자가 전송될 예정입니다.

※ 결제가 완료되기 전 까지는 가등록 상태이며,
수강료 납부가 확인 되어야 최종 수강 등록이 완료됩니다.`;

// 각 과정에 해당하는 반들
const classes = {
    regular: ["Alpha", "Beta", "Gamma", "Delta"],
    short: ["ShortClass1", "ShortClass2", "ShortClass3"],
    lite: ["LiteClass1", "LiteClass2", "LiteClass3"],
    saturday: ["SaturdayClass1", "SaturdayClass2"],
    pronunciation: ["PronunciationClass1", "PronunciationClass2"]
};

// 초기 반 옵션 설정
updateClassOptions(classes.regular);

// 과정 선택 변경 시, 해당하는 반 옵션 설정
courseSelect.addEventListener("change", () => {
    const selectedCourse = courseSelect.value;
    const selectedClasses = classes[selectedCourse];
    updateClassOptions(selectedClasses);
});

// 반 옵션 업데이트 함수
function updateClassOptions(selectedClasses) {
    classSelect.innerHTML = ""; // 기존 옵션 초기화

    selectedClasses.forEach(className => {
        const option = document.createElement("option");
        option.textContent = className;
        option.value = className;
        classSelect.appendChild(option);
    });
}

// 문자 생성 버튼 클릭 시, 해당하는 문자 내용 출력
generateBtn.addEventListener("click", () => {
    const startDate = startDateInput.value;
    const course = courseSelect.value;
    const className = classSelect.value;
    const customMessage = customMessageInput.value;

    const message = generateMessage(startDate, course, className, customMessage);
    messageOutput.innerHTML = message.replace(/\n/g, "<br>");
});

// 설정 버튼 클릭 시, 설정 팝업 창 표시
settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "block";
    defaultMessageInput.value = defaultMessage;
});

// 닫기 버튼 클릭 시, 설정 팝업 창 닫기
closeModalBtn.addEventListener("click", () => {
    settingsModal.style.display = "none";
});

// 저장 버튼 클릭 시, 새로운 기본 문자 양식 저장
saveDefaultMessageBtn.addEventListener("click", () => {
    defaultMessage = defaultMessageInput.value;
    settingsModal.style.display = "none"; // 팝업 창 닫기
});

// 문자 내용 생성 함수
function generateMessage(startDate, course, className, customMessage) {
    let message = customMessage.trim() + "\n\n"; // 사용자 입력 문자
    message += defaultMessage
        .replace("[start_date]", startDate)
        .replace("[study_start_date]", getStudyStartDate(startDate, className))
        .replace("[class]", className);

    return message;
}

// 스터디 시작일 계산 함수
function getStudyStartDate(startDate, className) {
    const start = new Date(startDate);
    let daysToAdd;

    // 휴일 계산
    if (className === "Gamma" || className === "Delta") {
        daysToAdd = 3;
    } else if (className === "Beta") {
        daysToAdd = 2;
    } else if (className === "Alpha") {
        daysToAdd = 1;
    }

    start.setDate(start.getDate() + daysToAdd);
    const studyStartDate = start.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return studyStartDate;
}
