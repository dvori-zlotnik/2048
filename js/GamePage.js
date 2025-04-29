localStorage.setItem("music", "1")// רק פעם אחת
//יצירת מקום בעבור משפט הכניסה והניקוד
let p = document.createElement("p");
p.setAttribute("id", "username");
sessionStorage.setItem("size", 4)//גודל ברירת מחדל של הלוח
let nowsize;
let j = 2
//שליפת ה-div, השונים כדי לשייך אליהם במהלך המשחק
let notice = document.getElementById("notice")
let game = document.getElementById("game");
let main = document.getElementById("Main");
let iLocal = sessionStorage.getItem('thisuser')//שליפת מספר המשתמש הנוכחי 
//הטיפול במצב אורח
let g = { name: "אורח" }
let n = JSON.stringify(g)
localStorage.setItem("usernull", n)
let guest = true;
if (sessionStorage.getItem("guest") == "false") {
    guest = false;
}
if (guest == true)
    iLocal = null;
//שליפת הuser  הנוכחי מה-local, כדי להתעסק עם הנתונים במהלך המשחק
let nowUser = JSON.parse(localStorage.getItem('user' + iLocal))
var counter = 0;
var count = 0;
let mymax = 0;
//פונקצית התחלת המשחק
StartGame()
//פונקציה של הדלקת הצלילים
document.getElementById("on").addEventListener("click", function () {
    localStorage.setItem('music', "1")
});
//פונקציה של כיבוי הצלילים
document.getElementById("off").addEventListener("click", function () {
    localStorage.setItem('music', "0")
});
//פונקציות של צלילים, הזזה חיבור , שבירת שיא, כשלון
//צליל הוזזה
function playMove() {
    if (localStorage.getItem('music') == "1") {
        var audio = new Audio("../audio/move.mp3");
        audio.play();
    }
}
//צליל חיבור מספרים
function playConect() {
    if (localStorage.getItem('music') == "1") {
        var audio = new Audio("../audio/conect.mp3");
        audio.play();
    }
}
//צליל שבירת שיא
function playMax() {
    if (localStorage.getItem('music') == "1") {
        var audio = new Audio("../audio/max.wav");
        audio.play();
    }
}
//צליל כשלון
function playFailure() {
    if (localStorage.getItem('music') == "1") {

        var audio = new Audio("../audio/failure.mp3");
        audio.play();
    }
}
//ארוע של כפתור התחל מחדש
document.getElementById("start").addEventListener("click", StartGame)
//פונקציות שמחליפות את גודל הלוח ושולחת לייצר אותו מחדש
//בעבור לוח בגודל 4
document.getElementById("Size1").addEventListener("click", function (event) {
    sessionStorage.setItem("size", 4)
    j = 2
    StartGame();
    game.style.gridTemplateColumns = "auto auto auto auto "
    game.style.gridTemplateRows = "auto auto auto auto "
});
//בעבור לוח בגודל 8
document.getElementById("Size2").addEventListener("click", function (event) {
    sessionStorage.setItem("size", 8)
    j = 8
    StartGame();
    game.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto";
});
//בעבור לוח בגודל 16
document.getElementById("Size3").addEventListener("click", function (event) {
    sessionStorage.setItem("size", 16)
    j = 32
    StartGame();
    game.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto"
    game.style.gridTemplateRows = "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto"
});
//והוספת עצים בהתאם לניקוד פונקציה של שבירת שיא
function Max() {
    sessionStorage.setItem("counter", counter);
    imgSrc = "../image/" + mymax + ".png";
    document.getElementById('img').src = imgSrc;
    playMax();
    if (guest != true) {
        let myuser = { password: nowUser["password"], name: nowUser["name"], high: mymax, Score: nowUser["Score"] }
        let nowUserString = JSON.stringify(myuser)
        localStorage.setItem("user" + iLocal, nowUserString)
        nowUser = JSON.parse(localStorage.getItem('user' + iLocal))
    }
}

//פונקציה של תחילת משחק, יוצרת את לוח המשחק וקוראת לפונקציה של הצבת המספרים
function StartGame() {
    p.textContent = "שלום לך, " + nowUser["name"] + ".";
    sessionStorage.setItem("finish", "false");
    nowsize = sessionStorage.getItem("size")
    game.innerHTML = "";
    document.getElementById('img').src = "../image/first.png";
    let sizeOfBoard = parseInt(sessionStorage.getItem("size"));
    for (let i = 0; i < sizeOfBoard; i++) {
        for (let j = 0; j < sizeOfBoard; j++) {
            let btn = document.createElement("input")
            btn.setAttribute("type", "button")
            btn.setAttribute("class", "a")
            btn.setAttribute("id", "btn_" + i + "_" + j)
            btn.setAttribute("value", " ")
            if (nowsize == 4) {
                btn.style.fontSize = "4vw"
                btn.style.width = "9vw"
                btn.style.height = "9vw"
            }
            else if (nowsize == 8) {
                btn.style.fontSize = "2vw"
                btn.style.width = "4.5vw"
                btn.style.height = "4.5vw"
            }
            else if (nowsize == 16) {
                btn.style.fontSize = "0.75vw"
                btn.style.width = "2.25vw"
                btn.style.height = "2.25vw"
            }
            btn.style.margin = 0, 0, 0, 0;
            game.appendChild(btn)
        }
    }
    notice.appendChild(p);
    for (let i = 0; i < j; i++) {
        ChoosPlace()
    }

}
//פונקציה שמחפשת מקום פנוי עבור הצבת מספר חדש
function ChoosPlace() {
    let sizeOfBoard = parseInt(sessionStorage.getItem("size"));
    let iR = Math.floor(Math.random() * sizeOfBoard)
    let jR = Math.floor(Math.random() * sizeOfBoard)
    let digit = Math.random()
    if (digit < 0.5)
        digit = 4
    else
        digit = 2
    let temp = 0
    let rows = 0
    let i = iR
    let j = jR
    let finish = 0;
    for (; i < sizeOfBoard && rows <= sizeOfBoard; i++) {
        for (; j < sizeOfBoard && document.getElementById("btn_" + i + "_" + j).value != " "; j++);
        rows++
        if (j != sizeOfBoard) {
            document.getElementById("btn_" + i + "_" + j).value = digit
            document.getElementById("btn_" + i + "_" + j).className = "a" + digit;
            finish = 1;
            break
        }
        j = 0;
        if (i == sizeOfBoard - 1 && temp == 0) {
            i = -1
            temp = 1
        }
    }
    if (finish == 0) {
        let count = 0;
        for (let i = 0; i < sizeOfBoard; i++) {
            for (let j = 0; j < sizeOfBoard; j++) {
                if (j < sizeOfBoard - 1 && document.getElementById("btn_" + i + "_" + j).value == document.getElementById("btn_" + i + "_" + (j + 1)).value)
                    count++;
                if (i < sizeOfBoard - 1 && document.getElementById("btn_" + i + "_" + j).value == document.getElementById("btn_" + (i + 1) + "_" + j).value)
                    count++;
            }
        }
        if (count == 0) {
            sessionStorage.setItem("finish", "true");
            failure()
        }

    }
}
//פונקציה ששולחת לפונקתיות הזזה לפי קוד האסקי של המקש שנלחץ
document.addEventListener('keydown', function (event) {
    playMove()//צליל הזזה
    const KeyCode = event.keyCode;
    switch (KeyCode) {
        case 37:
            movingLeft()
            for (let i = 0; i < j / 2; i++) {
                ChoosPlace();
            }
            break;
        case 38:
            movingUp()
            for (let i = 0; i < j / 2; i++) {
                ChoosPlace();
            }
            break;
        case 39:
            movingRight();
            for (let i = 0; i < j / 2; i++) {
                ChoosPlace();
            }
            break;
        case 40:
            movingDoun()
            for (let i = 0; i < j / 2; i++) {
                ChoosPlace();
            }
            break;
    }

});
function movingRight() {//הזזה ימינה

    for (let i = 0; i < nowsize; i++) {
        for (let j = nowsize - 2; j >= 0; j--) {
            let thisbtn = document.getElementById("btn_" + i + "_" + j).value;
            if (thisbtn != " ") {
                if (thisbtn == document.getElementById("btn_" + i + "_" + (j + 1)).value) {
                    document.getElementById("btn_" + i + "_" + (j + 1)).value *= 2;
                    document.getElementById("btn_" + i + "_" + (j + 1)).className = "a" + thisbtn * 2;
                    counter += thisbtn * 2;
                    addscore()
                    if (thisbtn * 2 > mymax) {
                        mymax = thisbtn * 2;
                        Max()
                    }
                    document.getElementById("btn_" + i + "_" + j).value = " ";
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                }
                else {
                    let k
                    for (k = (j + 1); k < nowsize && document.getElementById("btn_" + i + "_" + k).value == " "; k++);
                    document.getElementById("btn_" + i + "_" + j).value = " "
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                    document.getElementById("btn_" + i + "_" + (k - 1)).value = thisbtn;
                    document.getElementById("btn_" + i + "_" + (k - 1)).className = "a" + thisbtn;
                }
            }
        }
    }
}
function movingLeft() {//הזזה שמאלה
    for (let i = 0; i < nowsize; i++) {
        for (let j = 1; j < nowsize; j++) {
            let thisbtn = document.getElementById("btn_" + i + "_" + j).value;
            if (thisbtn != " ") {
                if (thisbtn == document.getElementById("btn_" + i + "_" + (j - 1)).value) {
                    document.getElementById("btn_" + i + "_" + (j - 1)).value *= 2;
                    document.getElementById("btn_" + i + "_" + (j - 1)).className = "a" + (thisbtn * 2);

                    counter += thisbtn * 2;
                    addscore()
                    if (thisbtn * 2 > mymax) {
                        mymax = thisbtn * 2;
                        Max()
                    }
                    document.getElementById("btn_" + i + "_" + j).value = " ";
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                }
                else {
                    let k
                    for (k = (j - 1); k >= 0 && document.getElementById("btn_" + i + "_" + k).value == " "; k--);
                    document.getElementById("btn_" + i + "_" + j).value = " "
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                    document.getElementById("btn_" + i + "_" + (k + 1)).value = thisbtn;
                    document.getElementById("btn_" + i + "_" + (k + 1)).className = "a" + thisbtn;
                }
            }
        }
    }
}
function movingDoun() {//הזזה למטה
    for (let j = 0; j < nowsize; j++) {
        for (let i = nowsize - 2; i >= 0; i--) {
            let i1 = i + 1;
            let thisbtn = document.getElementById("btn_" + i + "_" + j).value;
            if (thisbtn != " ") {
                if (thisbtn == document.getElementById("btn_" + i1 + "_" + j).value) {
                    document.getElementById("btn_" + i1 + "_" + j).value *= 2;
                    document.getElementById("btn_" + i1 + "_" + j).className = "a" + (thisbtn * 2);
                    counter += thisbtn * 2;
                    addscore()
                    if (thisbtn * 2 > mymax) {
                        mymax = thisbtn * 2;
                        Max()
                    }
                    document.getElementById("btn_" + i + "_" + j).value = " ";
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                }
                else {
                    for (k = (i + 1); k < nowsize && document.getElementById("btn_" + k + "_" + j).value == " "; k++);
                    document.getElementById("btn_" + i + "_" + j).value = " ";
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                    document.getElementById("btn_" + (k - 1) + "_" + j).value = thisbtn;
                    document.getElementById("btn_" + (k - 1) + "_" + j).className = "a" + (thisbtn);
                }
            }
        }

    }
}
function movingUp() {//הזזה למעלה
    for (let j = 0; j < nowsize; j++) {
        for (let i = 1; i < nowsize; i++) {
            let thisbtn = document.getElementById("btn_" + i + "_" + j).value;
            if (thisbtn != " ") {
                if (thisbtn == document.getElementById("btn_" + (i - 1) + "_" + j).value) {
                    document.getElementById("btn_" + (i - 1) + "_" + j).value *= 2;
                    document.getElementById("btn_" + (i - 1) + "_" + j).className = "a" + (thisbtn * 2);
                    counter += thisbtn * 2;
                    addscore()
                    if (thisbtn * 2 > mymax) {
                        mymax = thisbtn * 2;
                        Max()
                    }
                    document.getElementById("btn_" + i + "_" + j).value = " ";
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                }
                else {
                    let k
                    for (k = (i - 1); k >= 0 && document.getElementById("btn_" + k + "_" + j).value == " "; k--);
                    document.getElementById("btn_" + i + "_" + j).value = " "
                    document.getElementById("btn_" + i + "_" + j).className = "a";
                    document.getElementById("btn_" + (k + 1) + "_" + j).value = thisbtn;
                    document.getElementById("btn_" + (k + 1) + "_" + j).className = "a" + thisbtn;
                }
            }
        }
    }
}
function addscore()//פונקציה שמוסיפה ניקוד למשתמש ומעדכנת בלוח
{
    console.log(counter)
    let myuser = { password: nowUser["password"], name: nowUser["name"], high: nowUser["high"], Score: counter }
    let nowUserString = JSON.stringify(myuser)
    localStorage.setItem("user" + iLocal, nowUserString)
    nowUser = JSON.parse(localStorage.getItem('user' + iLocal))
    document.getElementById("username").textContent = "שלום לך, " + " " + nowUser["name"] + " " + " הניקוד שלך הוא:" + counter

}

function failure() {//פונקצית כישלון
    playFailure()
    document.getElementById('pH').textContent = "נכשלת!!"
    document.getElementById('popup').style.display = 'block';
    document.getElementById('pP').textContent = "!! בפעם הבאה תהיה חכם יותר... חיים מאושרים!!";

}

// פופאפים
//חלונית קופצת של הוראות
function Popup() {
    document.getElementById('pH').textContent = "הוראות"
    document.getElementById('pP').textContent = "מטרת המשחק הינה להגיע למשבצת בה תופיע הספרה 2048  המשחק מתנהל דרך החיצים שבמקלדת  כאשר תלחצו על חץ, משבצות הלוח יזוזו לכיוון הנלחץ  וכאשר יש מספר דומה זה ליד זה, המשבצת מתחברת והניקוד עולה";
    document.getElementById('popup').style.display = 'block';
}
//חלונית קופצת של אודות
function Popup2() {
    document.getElementById('pH').textContent = "אודות"
    document.getElementById('pP').textContent = "המשחק פותח על ידי דבורי זלוטניק ושולמית סלע, במסגרת שעור פיתוח web י שלנהוג במשחק בכבוד וכל הזכויות שמורות"
    document.getElementById('popup').style.display = 'block';
}
//סגירה של חלונית פופאפ
document.getElementById('popup-close').onclick = function () {
    document.getElementById('popup').style.display = 'none';

    if (sessionStorage.getItem("finish") == "true")
        StartGame();
};
