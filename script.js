const dobInput = document.getElementById("dob");
const btn = document.getElementById("calcBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");
const themeBtn = document.getElementById("themeBtn");

let timer;

dobInput.max = new Date().toISOString().split("T")[0];


// ================= ZODIAC =================
function getZodiac(day, month){
  const signs = [
    ["Capricorn",20],["Aquarius",19],["Pisces",21],
    ["Aries",20],["Taurus",21],["Gemini",21],
    ["Cancer",23],["Leo",23],["Virgo",23],
    ["Libra",23],["Scorpio",22],["Sagittarius",22],
    ["Capricorn",31]
  ];
  return (day < signs[month][1]) ? signs[month][0] : signs[month+1][0];
}


// ================= MAIN CALC =================
function calculateAge(){

  const val = dobInput.value;

  if(!val){
    error.innerText="Please select date first";
    result.classList.add("hidden");
    return;
  }

  const dob = new Date(val);
  const now = new Date();

  if(dob > now){
    error.innerText="Future date not allowed";
    return;
  }

  error.innerText="";
  result.classList.remove("hidden");

  const diff = now - dob;

  const seconds = Math.floor(diff/1000);
  const minutes = Math.floor(seconds/60);
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let d = now.getDate() - dob.getDate();

  if(d < 0){
    months--;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if(months < 0){
    years--;
    months += 12;
  }

  // next birthday
  let next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if(next < now) next.setFullYear(now.getFullYear()+1);

  const daysLeft = Math.ceil((next-now)/(1000*60*60*24));

  const zodiac = getZodiac(dob.getDate(), dob.getMonth());

  result.innerHTML = `
    <b>🎉 Age:</b> ${years}y ${months}m ${d}d <br><br>
    <b>⏳ Time Lived:</b><br>
    ${days.toLocaleString()} days<br>
    ${hours.toLocaleString()} hours<br>
    ${minutes.toLocaleString()} minutes<br>
    ${seconds.toLocaleString()} seconds<br><br>
    <b>🎂 Next Birthday:</b> ${daysLeft} days left<br>
    <b>♈ Zodiac:</b> ${zodiac}
  `;
}


// ================= EVENTS =================
btn.onclick = ()=>{
  clearInterval(timer);
  calculateAge();
  timer = setInterval(calculateAge,1000);
};

themeBtn.onclick = ()=>{
  document.body.classList.toggle("dark");
};
// ================= AGE DIFFERENCE FUNCTION =================
const dob2Input = document.getElementById("dob2");
const compareBtn = document.getElementById("compareBtn");
const compareResult = document.getElementById("compareResult");

function getFullAge(dob){
  const now = new Date();

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if(days < 0){
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if(months < 0){
    years--;
    months += 12;
  }

  return {years, months, days};
}

compareBtn.onclick = ()=>{

  const val1 = dobInput.value;
  const val2 = dob2Input.value;

  if(!val1 || !val2){
    compareResult.classList.remove("hidden");
    compareResult.innerText = "Please select both dates";
    return;
  }

  const d1 = new Date(val1);
  const d2 = new Date(val2);

  const age1 = getFullAge(d1);
  const age2 = getFullAge(d2);

  const older = d1 < d2 ? "Person 1 is older" : "Person 2 is older";

  const diffDays = Math.abs(d1 - d2) / (1000*60*60*24);
  const diffYears = Math.floor(diffDays / 365);

  compareResult.classList.remove("hidden");

  compareResult.innerHTML = `
    <b>Person 1:</b> ${age1.years}y ${age1.months}m ${age1.days}d<br>
    <b>Person 2:</b> ${age2.years}y ${age2.months}m ${age2.days}d<br><br>
    <b>${older}</b><br>
    Difference: ${diffYears} years (~${Math.floor(diffDays)} days)
  `;
};

window.addEventListener("load", ()=>{
  const splash = document.getElementById("splash");
  setTimeout(()=>{
    splash.style.display="none";
  }, 2000);
});