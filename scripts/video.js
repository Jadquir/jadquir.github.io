var list = [];
var width = "640px";
var height = "360px";
function NewVideo(videoUrl,downloadUrl,id) {
    const obj = {};
    obj.videoUrl = videoUrl;
    obj.downloadUrl = downloadUrl;
    obj.id = id;

    list.push(obj);
}

function CreateVideos() {
    NewVideo(videoUrl = "https://www.youtube.com/embed/KPZ8WU7EdFo",
     downloadUrl = "https://bit.ly/3qw4BxU",
     id = "apps");
     NewVideo(videoUrl = "https://www.youtube.com/embed/0xJpJrTPIVQ",
     downloadUrl = "https://bit.ly/3ndA2e6",
     id = "apps");
     NewVideo(videoUrl = "https://www.youtube.com/embed/VRRKe0k9hNU",
     downloadUrl = "https://www.youtube.com/embed/VRRKe0k9hNU",
     id = "edits");
     NewVideo(videoUrl = "https://www.youtube.com/embed/1I5HgQoNXL8",
     downloadUrl = "https://www.youtube.com/embed/1I5HgQoNXL8",
     id = "edits");

    for (var i = 0; i < list.length; i++) {

        var div = document.createElement("div");
            div.id = "vid";
        var ifrm = document.createElement("iframe");
            ifrm.setAttribute("src", list[i].videoUrl);
            ifrm.setAttribute("title", "Youtube Video");
            ifrm.setAttribute("frameborder", "0");
            ifrm.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
            ifrm.style.width = width;
            ifrm.style.height = height;
        div.appendChild(ifrm);

        if(list[i].id == "apps"){
            var div2 = document.createElement("div");
            div2.className = "CustomButton";
            var a = document.createElement('a');
            var linkText = document.createTextNode("Download");
            a.appendChild(linkText);
            a.target = "_blank";
            a.title = "Download";
            a.href = list[i].downloadUrl;
            div2.appendChild(a)
            div.appendChild(div2); 
        }
        document.getElementById(list[i].id).appendChild(div);
      }
}