// const searchSong = async() =>{
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // Lode Data;
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySong(data.data)
// }

const searchSong = () =>{
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // Lode Data;
    fetch(url)
    .then(res => res.json())
    .then (data => displaySong(data.data))
    .catch(error => displayError('Something is Wrong..!! Please Try Later'))
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const displaySong = song => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ""
    song.forEach(song =>{
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = 
        ` 
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
                
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error){
        displayError("sorry..!! I Failed To Load Lyrics, Please Try Later." )
    }
    // const res = await fetch (url);
    // const data = await res.json();
    // displayLyrics(data.lyrics);

}


const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('songLyrics');
    lyricsDiv.innerText = lyrics;
}