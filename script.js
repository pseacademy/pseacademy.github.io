// script.js

// 과정에 따른 반 옵션 설정
const classOptions = {
    regular: ["Alpha", "Beta", "Gamma", "Delta"],
    short: ["A", "B", "C"],
    lite: ["Lite 1", "Lite 2"],
    saturday: ["Saturday"],
    pronunciation: ["Pronunciation"]
};

// HTML 요소 가져오기
const startDateInput = document.getElementById("start-date");
const courseSelect = document.getElementById("course");
const classSelect = document.getElementById("class");
const generateBtn = document.getElementById("generate-btn");
const messageOutput = document.getElementById("message-output");

// 과정 선택 변경 시, 해당하는 반 옵션 설정
courseSelect.addEventListener("change", () => {
    const selectedCourse = courseSelect.value;
    const classes = classOptions[selectedCourse];
    updateClassOptions(classes);
});

// 반 옵션 업데이트 함수
function updateClassOptions(classes) {
    classSelect.innerHTML = ""; // 기존 옵션 초기화

    classes.forEach(className => {
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

    const message = generateMessage(startDate, course, className);
    messageOutput.textContent = message;
});

// 문자 내용 생성 함수
function generateMessage(startDate, course, className) {
    let message = `프린서플 수강 신청 확인 안내\n\n`;
    message += `★ 개강은 ${startDate} 입니다.\n`;

    const studyStartDates = {
        Alpha: getStudyStartDate(startDate, 1),
        Beta: getStudyStartDate(startDate, 2),
        Gamma: getStudyStartDate(startDate, 3),
        Delta: getStudyStartDate(startDate, 4)
    };

    message += `★ 스터디는 개강일 ${studyStartDates[className]}부터 시작됩니다.\n`;

    if (course === "regular") {
        message += "\n**교재안내\n- " + className + " 수업교재(개강 후 e-book 배부), Oxford Picture Dictionary - 3rd Edition, English(학원 또는 시중 구매)\n";
        message += "\n**교재 구매 링크(택배) : https://forms.gle/ao8x4dQvjw8dEx9v5\n";
        message += "3층 안내데스크로 방문하거나 택배로 교재를 구매하실 수 있습니다.\n";
        message += "개강일에는 등록 및 상담 등의 업무로 안내데스크가 상당히 혼잡할 수 있으니 여유있게 방문해 주시기 바랍니다.\n";
        message += "개강 후 학원 생활 안내 오리엔테이션이 진행됩니다.\n";
        message += "혹시 오리엔테이션에 불참하신 경우에는 3층 안내데스크로 문의해 주시기 바랍니다.\n";
        message += "※ 온라인 수강생은 개강일 오전 8시 온라인 수강 방법 안내 문자가 전송될 예정입니다.\n";
        message += "※ 결제가 완료되기 전 까지는 가등록 상태이며, 수강료 납부가 확인 되어야 최종 수강 등록이 완료됩니다.\n";
    } else {
        message += `※ 온라인 수강생은 개강일 오전 8시 온라인 수강 방법 안내 문자가 전송될 예정입니다.\n`;
        message += `※ 결제가 완료되기 전 까지는 가등록 상태이며, 수강료 납부가 확인 되어야 최종 수강 등록이 완료됩니다.\n`;
    }

    return message;
}

// 스터디 시작일 계산 함수
function getStudyStartDate(startDate, daysToAdd) {
    const start = new Date(startDate);
    start.setDate(start.getDate() + daysToAdd);
    const studyStartDate = start.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return studyStartDate;
}
