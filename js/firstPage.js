//localStorage.setItem("count",0);//רק בפעם הראשונה
let Count = localStorage.getItem("count");//מספר המשתמשים
let no = document.getElementById("no"); 
let a = document.getElementById("a");//כפתור האישור
let enter = document.getElementById("enter");//כפתור להחליף מכניסה למשתמש חדש וההפך
let Password = document.getElementById("password")//תיבת השם
let Username = document.getElementById("username")//תיבת הסיסמה
let un=document.getElementById("un")//הכותרת מעל תיבת השם
let pas=document.getElementById("pas")//הכותרת מעל תיבת הסיסמה
let titel = document.getElementById('Mytitel')//כותרת דף הכניסה

a.addEventListener("click",users);// 
enter.addEventListener("click",funcEnter)
Username.addEventListener("focus",re)
Password.addEventListener("focus",re);

function re(){//פונקציה שמבטלת את השינויים שנגרמו מבדיקת התיקונים
    Username.style.borderBottom="1px solid #fff";
    un.textContent="שם משתמש";
    un.style.color="##7ddf64"
    Password.style.borderBottom="1px solid #fff";
    pas.textContent="סיסמה";
    pas.style.color="##7ddf64"
    no.textContent="";
    }

function funcEnter() { //פונקציה שמחליפה את הדף מכניסה להרשמה ולהפך
    re()
    if (titel.textContent == "כניסה") {
        titel.textContent = " הרשמה";
        enter.value="לכניסה";
    }
    else {
        titel.textContent = "כניסה";
        enter.value="משתמש חדש";
    }
}

function users()//פןנקציה שבודקת שהשדות מלאים ושולחת לפונקציה המתאימה, כניסה או הרשמה
{  
    if(Password.value=="")//בדיקה שהשדה של הסיסמה מלא
        {
        Password.style.borderBottom="1px solid black";
        pas.textContent="הכנס סיסמא"
        pas.style.color="black"
        }
    if(Username.value=="")//בדיקה שהשדה של השם מלא
        {
       Username.style.borderBottom="1px solid black";
        un.textContent="הכנס שם"
        un.style.color="black"
        }
        else{//אם השדות מלאים
            if(titel.textContent == "כניסה")//אם הדף עומד על כניסה
                checkuser();//שולח לפונקציה שבודקת שהמשתמש קיים
            else//אם הדף נמצא על הרשמה
                addnewuser();//שןלח לפונקציה שמכניסה משתמש
        }
}

function addnewuser() {//פונקציה שמוסיפה משתמש
    let i = 0;
    for (; i < Count; i++)//לולאה שעוברת על המשתמשים הקיימים
        {
            let a = JSON.parse(localStorage.getItem("user" + i));// לוקח מ את המשתמש הנוכחי 
            if (a["name"] == Username.value)// אם השם שהוכנס שווה למשתמש קייים
            {
                no.textContent="השם קיים";
                Username.style.borderBottom="1px solid black";
                break;//יוצא מהלולאה 
            }
            if(a["password"] == Password.value)// אם הסיסמה שהוכנסס זהה לסיסמה קיימת
                {
                no.textContent="סיסמא קיימת";
                break;//יוצא מהלולאה
                }
        }
   if(i==Count)//אם לא יצאת מהלולאה לפני שנגמרו המשתמשים
    {
    let user = { password: password.value, name: username.value, high: 0,Score: 0}// מיצר משתמש חדש עם השם והסיסמה ומאתחל את הסיסמה ב0
    let userData = JSON.stringify(user);//ממיר לstring
    localStorage.setItem("user" + Count, userData)//שומר בזיכרון במספר  הקיים
    Count++;//מקדם את מספר המשתמשים
    localStorage.setItem("count", Count);//שומר את כמות המשתמשים החדשה
    sessionStorage.setItem("thisuser", Count-1);//שומר את מספר המשתמש הנוכחי (בשביל הדף הבא)
    sessionStorage.setItem("guest", "false");//משנה את מצב אורח 
    alert("נוספת בהצלחה")
    window.location = "../html/GamePage.html";//מעביר לדף המשחק
   }
}

function checkuser() {//פונקציה שבודקת שהמשתמש קיים
    for (let i = 0; i < Count; i++) {//עובר על המשתמשים
        let a = JSON.parse(localStorage.getItem("user" + i))//לוקח מהזיכרון את המשתמש הנוכחי
        if (a["name"] == Username.value && a["password"] == Password.value) //אם השם זהה לשם והסיסמה זהה לסיסמה
        {
            sessionStorage.setItem("thisuser", i);//שומר את מספר המשתמש הנוכחי(בשביל הדף הבא)
            sessionStorage.setItem("guest", "false");//משנה את מצב האורח
            window.location = "../html/GamePage.html";//מעביר לדף המשחק
        }
        else//אם לא מצא משתמש כזה
        {
       no.textContent="שם המשתמש או הסיסמה אינם תקינים";//הודעת שגיאה
        }
    }
}

document.getElementById("guest").addEventListener("click",function()//לכניסה כאורח
{
sessionStorage.setItem("guest", "true");//ברירת מחדל מצב אורח
window.location="../html/GamePage.html";//נכנס לדף של המשחק
});
