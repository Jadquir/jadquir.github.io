async function getObjectFromHttpGet(url) {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Origin': 'https://jadquir.xyz/' // Replace with your desired origin
        }
      });
  
      if (!response.ok) {
        throw new Error("HTTP request failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getObjectFromHttpGet:", error.message);
      return null;
    }
  }

async function get_itunes(id) {
  const url = `https://itunes.apple.com/lookup?id=${id}`;
  return getObjectFromHttpGet(url);
}

function get_shazam(id) {
  const url = `https://amp.shazam.com/shazam/v3/en-US/US/android/-/track/${id}`;
  return getObjectFromHttpGet(url);
}

function parse_itunes(data) {
  const musicData = data.results[0]; // Assuming there's only one result
  try {
    const music = {
      Title: musicData.trackName,
      Artist: musicData.artistName,
      Album: musicData.collectionName,
      Genre: musicData.primaryGenreName,
      ReleaseYear: new Date(musicData.releaseDate).getFullYear().toString(),
      Images: musicData.artworkUrl100,
      Id: musicData.trackId.toString(),
    };
    return music;
  } catch (error) {}
  return null;
}

async function get_music(id) {
  const shazamPromise = get_shazam(id);
  const itunesPromise = get_itunes(id);

  try {
    const [shazamData, itunesData] = await Promise.all([
      shazamPromise,
      itunesPromise,
    ]);
    // Do something with itunesData and shazamData
    console.log("iTunes Data:", itunesData);
    console.log("Shazam Data:", shazamData);

    const parsed_itunes = parse_itunes(itunesData);
    console.log("parsed Itunes:", parsed_itunes);
    const Music = {
      Title: parsed_itunes.Title,
      Artist: parsed_itunes.Artist,
      Album: parsed_itunes.Album,
      Genre: parsed_itunes.Genre,
      ReleaseYear: parsed_itunes.ReleaseYear,
      Images: parsed_itunes.Images,
      Id: parsed_itunes.Id,
    };
    return Music;
  } catch (error) {
    // Handle errors
    console.error(error);
  }
  return null;
}

function change(url, size) {
  var modifiedUrl = url.replace(
    /(\d+x\d+)(bb)?\.jpg/,
    size + "x" + size + "bb.jpg"
  );
  return modifiedUrl;
}
async function get_music_detail() {
  const urlParams = new URLSearchParams(window.location.search);
  const music_id = urlParams.get("id");
  console.log(urlParams);
  console.log(music_id);
  if (music_id === null || music_id.length === 0) {
    return null;
  }
  let music = await get_music(music_id);
  music.Images = change(music.Images, 400);
  return music;
}

function resize_titles() {
  var maxWidth = 0;
  $(".info-title").each(function () {
    // Get the width of the current element
    var width = $(this).width();

    // Update the maximum width if necessary
    if (width > maxWidth) {
      maxWidth = width;
    }
  });
  maxWidth += 10;

  $(".info-title").css("min-width", maxWidth + "px");
}
function setMetaTags(title, description, imageUrl) {
  // Set the page title
  document.title = title;

  // Remove existing meta tags (if any)
  var existingMetaTags = document.querySelectorAll("meta");
  existingMetaTags.forEach(function (metaTag) {
    var property = metaTag.getAttribute("property");
    var name = metaTag.getAttribute("name");
    if (
      property === "og:title" ||
      property === "og:description" ||
      property === "og:image" ||
      name === "twitter:title" ||
      name === "twitter:description" ||
      name === "twitter:image"
    ) {
      metaTag.remove();
    }
  });

  // Create new meta tags
  var metaTags = [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];

  metaTags.forEach(function (tag) {
    var metaTag = document.createElement("meta");

    for (var key in tag) {
      metaTag.setAttribute(key, tag[key]);
    }

    document.head.appendChild(metaTag);
  });
}

function updateUI(music){
    const main = document.querySelector("#main");
    console.log(music);
    if (music === null) {
      main.innerHTML = "<h1>Something went wrong!</h1>";
      return;
    }
    const image = document.querySelector(".music_image");
    const details = document.querySelector(".details");
  
    image.setAttribute("src", music.Images);

    $("#bg-image").css("background-image",`url("${music.Images}")`);
  
    function create_info(title, value) {
      // Create the parent div element
      var parentDiv = document.createElement("div");
      parentDiv.className = "info-parent";
  
      // Create the title span element
      var titleSpan = document.createElement("span");
      titleSpan.className = "info-title";
      titleSpan.textContent = title;
  
      // Create the text span element
      var textSpan = document.createElement("div");
      textSpan.className = "info-sep";
      textSpan.textContent = ":";
  
      // Create the text span element
      var textSpan = document.createElement("span");
      textSpan.className = "info-text";
      textSpan.textContent = value;
  
      if (value.length === 0) {
        parentDiv.style.display = "none";
      }
      // Append the title and text spans to the parent div
      parentDiv.appendChild(titleSpan);
      parentDiv.appendChild(textSpan);
      return parentDiv;
    }
    function create_title(value) {
      // Create the parent div element
      var parentDiv = document.createElement("div");
      parentDiv.className = "title-parent";
      // Create the text span element
      var textSpan = document.createElement("span");
      textSpan.className = "info-text";
      textSpan.textContent = value;
  
      // Append the title and text spans to the parent div
      parentDiv.appendChild(textSpan);
      return parentDiv;
    }
  
    details.innerHTML = "";
    details.appendChild(create_title(music.Title));
    details.appendChild(create_info("Artist", music.Artist));
    details.appendChild(create_info("Album", music.Album));
    details.appendChild(create_info("Genre", music.Genre));
    details.appendChild(create_info("Release Year", music.ReleaseYear));
}

get_music_detail().then(function (result) {
  const music = result;

  if (music === null) {
    setMetaTags(
      "Something went wrong!",
      "",
      "https://jadquir.xyz/mra/images/logo.png"
    );
  } else {
    setMetaTags(
      `${music.Title} by ${music.Artist} - MRA - Jadquir`,
      "MRA (short for Music Recognition Application) is a music recognition application, or music identifier, like Shazam but for PC.",
      music.Images
    );
  }
 // Check if the page has already loaded
 if (document.readyState === 'complete') {
    // If the page has loaded, update the UI immediately
    (music);
  } else {
    // If the page is still loading, wait for it to finish
    $(document).ready(function() {
      updateUI(music);
    });
  }

});
