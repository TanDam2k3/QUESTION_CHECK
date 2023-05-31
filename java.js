function thongBaoo(questions, thongBaos){
    var data = document.getElementsByName(questions);
    var thongBao = document.getElementById(thongBaos);
    data.forEach(
        function(element, index){
            if(element.checked){
                if(element.value == 'a'){
                    if(index == 0) {
                        thongBao.innerHTML = "<p class='btn btn-outline-success'>Đúng</p>";
                    }
                    else{
                        thongBao.innerHTML = "<p class='btn btn-outline-danger'>Sai</p>";
                    }
                }
                else if(element.value == 'b'){
                    if(index == 1) {
                        thongBao.innerHTML = "<p class='btn btn-outline-success'>Đúng</p>";
                    }
                    else{
                        thongBao.innerHTML = "<p class='btn btn-outline-danger'>Sai</p>";
                    }
                }
                else if(element.value == 'c'){
                    if(index == 2) {
                        thongBao.innerHTML = "<p class='btn btn-outline-success'>Đúng</p>";
                    }
                    else{
                        thongBao.innerHTML = "<p class='btn btn-outline-danger'>Sai</p>";
                    }
                }
                else if(element.value == 'd'){
                    if(index == 3) {
                        thongBao.innerHTML = "<p class='btn btn-outline-success'>Đúng</p>";
                    }
                    else{
                        thongBao.innerHTML = "<p class='btn btn-outline-danger'>Sai</p>";
                    }
                }
            }
        }
    )
}
function start() {
    getQuestion(renderQuestion);
}
start();


// Lấy câu hỏi
function getQuestion(callback) {
    fetch("http://localhost:3000/question")
    .then(
        function(reponse){
            return reponse.json();
        }
    )
    .then(callback)
}


// In câu hỏi
function renderQuestion(question){
    var listQuestion = question.map(
        function(element){
            return `
            <div class="container">
                <div class="row">
                    <span class="col-12">${element.q}</span>
                    <div class="form-group col-12">
                        <div class="form-check">
                            <label for="" class="form-check-label">
                                <input type="radio" onclick="thongBaoo('q${element.id}','thongbao${element.id}')" name="q${+element.id}" id="" value="${element.result}" class="form-check-input">${element.a}
                            </label>
                        </div>
                        <div class="form-check">
                            <label for="" class="form-check-label">
                                <input type="radio" onclick="thongBaoo('q${element.id}','thongbao${element.id}')" name="q${+element.id}" id="" value="${element.result}" class="form-check-input">${element.b}
                            </label>
                        </div>
                        <div class="form-check">
                            <label for="" class="form-check-label">
                                <input type="radio" onclick="thongBaoo('q${element.id}','thongbao${element.id}')" name="q${+element.id}" id="" value="${element.result}" class="form-check-input">${element.c}
                            </label>
                        </div>
                        <div class="form-check">
                            <label for="" class="form-check-label">
                                <input type="radio" onclick="thongBaoo('q${element.id}','thongbao${element.id}')" name="q${+element.id}" id="" value="${element.result}" class="form-check-input">${element.d}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div id="thongbao${element.id}"></div>
                </div>
            </div>
            `
        }
    );
    document.getElementById("question").innerHTML += listQuestion.join("");
}

// Menu
function onMenu(){
    var data = document.getElementsByClassName("off");
    for(var i = 0; i < data.length; i++){
        data[i].setAttribute("style", "display: block");
    }
}
function offMenu() {
    var data = document.getElementsByClassName("off");
    for(var i = 0; i < data.length; i++){
        data[i].setAttribute("style", "display: none");
    }
}

// Thêm câu hỏi
function handleSaveQuestion(data, callback){
    fetch("http://localhost:3000/question",{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(
        function(reponse){
            return reponse.json();
        }
    )
    .then(callback);
}

function saveQuestion() {
    var idQuestion = document.getElementById("idQuestion").value;
    var contentQuestion = document.getElementById("contentQuestion").value;
    var resultA = document.getElementById("resultA").value;
    var resultB = document.getElementById("resultB").value;
    var resultC = document.getElementById("resultC").value;
    var resultD = document.getElementById("resultD").value;
    var result = document.getElementById("result").value;
    var data = {
        id: idQuestion,
        q: contentQuestion,
        a: resultA,
        b: resultB,
        c: resultC,
        d: resultD,
        result : result
    }
    handleSaveQuestion(data,getQuestion(renderQuestion));
}

// Xóa câu hỏi
function handelDeleteQuestion(idDelete, callback){
    fetch(`http://localhost:3000/question/${idDelete}`,{
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    })
    .then(
        function(reponse){
            return reponse.json();
        }
    )
    .then(callback);
}

function deleteQuestion() {
    var idDelete = document.getElementById("idDelete").value;
    handelDeleteQuestion(idDelete,getQuestion(renderQuestion));

}