var sName = document.getElementById("siteName");
var webLink = document.getElementById("URL");
var siteList = [];

if (localStorage.getItem('site') == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem('site'));
  display();
}

console.log("hello");
//============= create =============
function createSite() {
  var site = {
    siName: sName.value,
    webURL: webLink.value
  }
  function checkName() {
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].siName.includes(sName.value)) {
          return true;
        }
      } 
    }
    if (checkName() == true) {
      alert("Do not repeat the same name of Bookmark");
    } else {
      if (validate() == true && validateURL() == true) {
        siteList.push(site);
        localStorage.setItem("site", JSON.stringify(siteList));
        sName.classList.remove("is-valid");
        webLink.classList.remove("is-valid");
      } else if (validate() == false) {
        alert("Please enter a valid name");
      }else {
        alert(`write a valid website follow the next rules
        1)the site starts with https:// or http:// or nothing (optional)
        2)write www. or nothing (Optional)
        3)write your website without make any space like "facebook" (Mandatory)
        4)write the TLD like ".com .net .io ..."  (Mandatory)
        `);
      }
  }
  // console.log(siteList);
  display();
  reset();
}

//================== Reset ======================= 
function reset() {
  sName.value = "";
  webLink.value = "";
}

//============ validation of name & URL ============= 
var nameRegExp = /^\w{3,}(\s+\w+)*$/;
var urlRegExp = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
function validate() {
  if (nameRegExp.test(sName.value)) {
    sName.classList.add("is-valid");
    sName.classList.remove("is-invalid");
    return true;
  } else {
    sName.classList.add("is-invalid");
    sName.classList.remove("is-valid");
    return false;
  }
}

function validateURL() {
  if (urlRegExp.test(webLink.value) ) {
    webLink.classList.add("is-valid");
    webLink.classList.remove("is-invalid");
    return true;
  } else {
    webLink.classList.add("is-invalid");
    webLink.classList.remove("is-valid");
    return false;
  }
}

//=========== Display ================
function display() {
  var trs = ``;
  for (var i = 0; i < siteList.length; i++) {
    trs += `
    <tr>
      <td>${i+1}</td>
      <td>${capitalize(siteList[i].siName)}</td>
      <td>
      <a target="_blank">
      <button class="visit btn fw-semibold px-3" onclick="visit(${i})"><i class="fa-solid fa-eye me-2"></i>Visit</button>
      </a>
      </td>
      <td><button class="del btn fw-semibold px-3" onclick="delte(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
      </tr>
      `
      // href="${siteList[i].webURL}"
  }  
  document.getElementById("tableBody").innerHTML = trs;
}

//============= delete ===============
function delte(indexOfTable) {
  siteList.splice(indexOfTable, 1);
  localStorage.setItem('site', JSON.stringify(siteList));
  display();
}

//========= Visit ===========
var linkRegExp = /^https?:\/\//;
function visit(index) {
    if (linkRegExp.test(siteList[index].webURL)) {
      open(`${siteList[index].webURL}`);
    } else {
      open(`https://${siteList[index].webURL}`);
    }
}

//========= Capitalize ===========
function capitalize(webName) {
  var stringArr = webName.split("");
  stringArr[0] = stringArr[0].toUpperCase();
  return stringArr.join("");
}


















