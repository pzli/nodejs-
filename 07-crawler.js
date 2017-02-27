var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.imooc.com/learn/75';

function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	// console.log(chapters);
	// [{
	// 	chapterName: '',
	// 	videos: [
	// 		{
	// 			id: '',
	// 			videoName: ''
	// 		}
	// 	]
	// }]

	var courseData = [];
	chapters.each(function(item){
		var chapter = $(this);
		var chapterInfo = chapter.find('strong').text().trim();
		var intro = chapter.find('.chapter-content').text();
		var chapterName = chapterInfo.split(intro)[0].trim();
		// console.log(chapterName);
		var videos = chapter.find('.video').children('li');
		// console.log(videos);
		var chapterData = {
			chapterName: chapterName,
			videos: []
		};

		videos.each(function(item){
			var video = $(this).find('.J-media-item');
			// console.log(video);
			var videoName = video.text().split('开始学习')[0].trim();
			var videoId = video.attr('href').split('/video/')[1];
			// console.log(videoId);
			var videoData = {
				id: videoId,
				videoName: videoName
			}
			chapterData.videos.push(videoData);
		})

		courseData.push(chapterData);

	})

	return courseData;
}

function printfInfo(courseData){
	courseData.forEach((item) => {
		var chapterName = item.chapterName;
		console.log(chapterName + '\n');
		var videos = item.videos;

		videos.forEach((item) => {
			var videoId = item.id;
			var videoName = item.videoName;
			console.log(' 【' + videoId + '】 ' + videoName + '\n');
		})
	})
}

http.get(url, (res) => {
	var html = '';

	res.on('data', (data) => {
		html += data;
	})

	res.on('end', () => {

		// console.log(html);

		var courseData = filterChapters(html);
		printfInfo(courseData);
	})
}).on('error', () => {
	console.log('获取数据失败');
})