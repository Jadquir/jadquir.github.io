const urlParams = new URLSearchParams(window.location.search);
const music_id = urlParams.get("id");
if (music_id !== null || music_id.length !== 0) {
    window.location.replace(`./music.html?id=${music_id}`);
}