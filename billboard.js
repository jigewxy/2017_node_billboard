const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');

var file = fs.createWriteStream('bb.html');

http.get({
 host: "www.billboard.com",
 path: "/charts/hot-100",
 port: 80
}, (res)=>{

res.pipe(file);
res.on('data', function(chunk){

console.log(chunk.length);

} );

file.on('finish', function(){

extractSong();
console.log("file written successfuly");


})


});


function extractSong(){
//LEARNING: This is wrong, as cheerio will read iostream only.
//var $ = cheerio.load('bb.html');
var $ = cheerio.load(fs.readFileSync('bb.html'));
var songs =[];
var artists = [];
$('h2.chart-row__song').each(function(i, elems){
songs.push($(elems).text());
artists.push($(elems).siblings('.chart-row__artist').text());

});

/*$('span.chart-row__artist').each(function(i, elems){

artists.push($(elems).text());

});*/

console.log(songs.length);
console.log(artists.length);

fs.writeFileSync('result.html', '<html><head></head>\n <body>\n <div><table style="width:100%; border:1px solid black"> \n \
 <tr><th>Ranking</th><th>Song</th><th>Artist</th></tr> \n', 'utf-8');

for (let i=0; i<songs.length; i++){

fs.appendFileSync('result.html', `<tr><td>${i+1}</td><td>${songs[i]}</td><td>${artists[i]}</td></tr> \n`, 'utf-8');

}

fs.appendFileSync('result.html', '</table></div>\n</body>\n</html>');

//fs.writeFileSync('artist.txt', artists);

console.log('content extracted');


}
