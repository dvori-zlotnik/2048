let highScore = document.getElementById("highScore");//דיב של הטבלה
let myHighScore = document.getElementById("myHighScore");//דיב של השיא של המשתמש הנוכחי
let stat = document.getElementById("stat");// דיב של הנתונים הסטטיסטים
let count = parseInt(localStorage.getItem("count"));// כמות המשתמשים
let nowUser = JSON.parse(localStorage.getItem("user" + sessionStorage.getItem("thisuser")))//הפרטים של המשתמש הנוכחי
let sortName = sort();// מערך ממוין לפי שיאים
createTable();//פונקציה שמיצרת טבלת שיאים
userhigh();//פונקציה שמראה את השיא של המשתמש הנוכחי
statistics();//פונקציה שמראה נתונים סטטיסטיים

function sort()//פונקציה שמיצרת מערך ממיון לפי שיאים
{
    let sortName = [];// הגדרת מערך
    for (let i = 0; i < count; i++)// לולאה שעוברת על המשתמשים
        sortName[i] = JSON.parse(localStorage.getItem("user" + i))//;ומכניסה אותם למערך חדש
    sortName.sort(function (a, b) { return parseInt(b["high"]) - parseInt(a["high"]) });//שולחת את הפונקציה למיון לפי שיאם בסדר יורד
    return sortName;//מחזירה את המערך
}

function userhigh()//פונקציה שמראה את השיא של המשתמש הנוכחי
{
    if (sessionStorage.getItem("guest") == "false")//אם המשתמש לא אורח
    {
        let p1 = document.createElement("p")// יצירת מקום לטקסט
        p1.setAttribute("class", "my")
        console.log(nowUser);
        console.log(nowUser["high"])
        p1.textContent = "השיא שלך: " + nowUser["high"];//הכנסת השיא
        myHighScore.appendChild(p1);//שיוך הטקסט לדיב
        let p2 = document.createElement("p")// יצירת מקום לטקסט
        p2.setAttribute("class", "my");
        p2.textContent = "הניקוד שלך: " + nowUser["Score"];//הכנסת השיא
        myHighScore.appendChild(p2);//שיוך הטקסט לדיב
    }
}

function createTable() {
    let table, tr, td, th, caption//הגדרת משתנים 
    table = document.createElement("table")//יצירת טבלה
    caption = document.createElement("caption")//יצירת כותרת
    caption.textContent = "שיאים אחרים"
    table.appendChild(caption)//שימת הכותרת בטבלה
    tr = document.createElement("tr")//יצירת שורה חדשה
    th = document.createElement("th")//יצירת תא כותרת חדש
    th.textContent = "ניקוד";
    tr.appendChild(th);//שיוך התא לשורה
    table.appendChild(tr);//)שיוך השורה לטבלה
    th = document.createElement("th")//יצירת תא כותרת חדש
    th.textContent = "שיא";
    tr.appendChild(th);//שיוך התא לשורה
    table.appendChild(tr);//)שיוך השורה לטבלה
    th = document.createElement("th")//יצירת תא כותרת חדש
    th.textContent = "שחקן"
    tr.appendChild(th)//שיוך התא לשורה
    table.appendChild(tr)//)שיוך השורה לטבלה
    for (let index = 0; index < count && index < 10; index++) {//עובד עד 10 שיאים ראשונים
        tr = document.createElement("tr")//יצירת שורה חדשה
        td = document.createElement("td")//יצירת תא חדש
        td.textContent = sortName[index]["Score"]//שימת השיא בטבלה
        tr.appendChild(td)//שיוך התא לשורה
        table.appendChild(tr)//)שיוך השורה לטבלה
        td = document.createElement("td")//יצירת תא חדש
        td.textContent = sortName[index]["high"]//שימת השיא בטבלה
        tr.appendChild(td)//שיוך התא לשורה
        table.appendChild(tr)//)שיוך השורה לטבלה
        td = document.createElement("td")////יצירת תא חדש
        td.textContent = sortName[index]["name"]//שימת השם בטבלה
        tr.appendChild(td)////שיוך התא לשורה
        table.appendChild(tr) //)שיוך השורה לטבלה 
    }
    highScore.appendChild(table)//שיוך של הטבלה למראה של המסך
}

function average()//פונקציה לחישוב ממוצע
{
    let sum = 0;
    for (let i = 0; i < count; i++)
        sum += parseInt(sortName[i]["high"]);
    return parseFloat(sum / count);
}

function Standard_deviation()//פונקציה לחישוב סטיית תקן
{
    let st = 0;
    for (let i = 0; i < count; i++)
        st += parseInt(sortName[i]["high"]) * parseInt(sortName[i]["high"]);
    let avg = average();
    return parseFloat(Math.sqrt(st / count - avg * avg))
}

function statistics()//פונקציה שמכניסה את הנתונים הסטטיסטיים
{
    let avg = average();//ממוצע
    let Pavg = document.createElement("p")// יצירת מקום לטקסט
    Pavg.setAttribute("id", "avg");
    Pavg.textContent = "ממוצע: " + avg;
    stat.appendChild(Pavg);//שיון לדיב
    let s = document.createElement("p")// יצירת מקום לטקסט
    s.setAttribute("id", "s");
    let Standarddeviation = Standard_deviation();
    s.textContent = "סטיית תקן: " + Standarddeviation;
    stat.appendChild(s);//שיוך לדיב
}

document.getElementById("return").addEventListener("click", function ()//בלחיצה על הדיב הזה
{
    window.location = "../html/GamePage.html";
})
