const colors = [
  //18
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34",
];

let dragTarget = {};

// display();

function 색추출기(colors) {
  const 랜덤값 = Math.floor(Math.random() * colors.length); // 0~17
  return colors[랜덤값];
}

document.querySelector("button").addEventListener("click", (e) => {
  const text = document.querySelector("input").value;

  // local storage 저장
  const todo객체 = {};
  todo객체.text = document.querySelector("input").value;
  todo객체.category = "todo";
  todo객체.id = Date.now();
  localStorage.setItem(todo객체.id, JSON.stringify(todo객체));

  // 새로운 태그 생성
  const newTag = createTag(text, todo객체.id);
  document.querySelector(".todo").appendChild(newTag);

  // input 값 삭제 (초기화)
  document.querySelector("input").value = "";
});

const boxes = document.querySelectorAll(".box");
boxes.forEach((box, i) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  box.addEventListener("drop", (e) => {
    e.currentTarget.appendChild(dragTarget);
    const todo = JSON.parse(
      localStorage.getItem(dragTarget.getAttribute("key"))
    );
    todo.category = e.currentTarget.getAttribute("category");
    localStorage.setItem(todo.id, JSON.stringify(todo));
  });
});

function createTag(text, key) {
  // 새로운 p 태그요소를 생성
  const newTag = document.createElement("p");
  newTag.innerHTML = text;
  newTag.style.backgroundColor = 색추출기(colors);
  newTag.setAttribute("draggable", "true");
  // p태그요소의 dragstart 이벤트 함수
  newTag.addEventListener("dragstart", (e) => {
    dragTarget = e.currentTarget;
  });
  /**** 삭제버튼 생성 코드 - 시작 */
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = "X";
  // 삭제버튼의 클릭 이벤트함수
  deleteBtn.addEventListener("click", (e) => {
    e.currentTarget.parentElement.remove();
    const key = e.currentTarget.parentElement.getAttribute("key");
    localStorage.removeItem(key);
  });
  newTag.appendChild(deleteBtn);
  /**** 삭제버튼 생성 코드 - 끝 */
  newTag.setAttribute("key", key);
  return newTag;
}

//화면 로딩시 딱 한번 호출되서 저장되었던 데이터를 화면에 표시해줌
function display() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const todo = JSON.parse(localStorage.getItem(key));
    const color = 색추출기(colors);
    const newTag = createTag(todo.text, todo.id);
    document.querySelector(`.${todo.category}`).appendChild(newTag);
  }
}

display();
