const updateTag = Object.freeze({
    Alpha: 0,
    Beta: 1,
    Release: 2
  });
var keys = Object.keys(updateTag).sort(function(a, b){
    return updateTag[a] - updateTag[b];
  });


function loadJSON(path, success, error)
  {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function()
      {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  if (success)
                      success(xhr.responseText);
              } else {
                  if (error)
                      error(xhr);
              }
          }
      };
      xhr.open("GET", path, true);
      xhr.send();
}

const start = Date.now();
function SetUpdate(){
  console.log("started update changelog");
  const start = Date.now();

  loadJSON("./files/updates.json",
  //"https://raw.githubusercontent.com/Jadquir/mra/main/files/updates.json",
  function(data) { 
    createElements(data); },
  function(xhr) { console.error(xhr); }
  );

}
function createElements(data)
{
  const end1 = Date.now();
  console.log(`get function time :  ${end1 - start} ms`)

  const updateJson = JSON.parse(data);
  var changelog = updateJson.UpdateChangeLog.reverse();
  
  while (document.querySelector("#clog-holder").firstChild) {
      document.querySelector("#clog-holder").removeChild(document.querySelector("#clog-holder").lastChild);
  }

  for (var i = 0; i < changelog.length; i++) {
      let title = changelog[i].version.join(".") + " " + 
      keys[changelog[i].VersionTag] + " | " +
      (new Date(changelog[i].VersionDate))
          .toISOString()
          .split('T')[0]
          .replaceAll('-','.');
      let changelogText =  changelog[i].ChangeLog;
      
      CreateUpdate(title,changelogText);
  }      

  const end2 = Date.now();
  console.log(`finish time :  ${end2 - start} ms`)
}
function CreateUpdate(title,changelogText){
  var div = document.createElement("div");
  div.className = "clog";

  var titleElement =  document.createElement("div");
  titleElement.className = "title";
  titleElement.innerText = title;
  
  var logElement =  document.createElement("div");
  logElement.className = "text";

  logElement.innerText = changelogText;

  div.appendChild(titleElement);
  div.appendChild(logElement);

  document.querySelector("#clog-holder").appendChild(div);
}
