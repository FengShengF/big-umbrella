//需要加载的图片，共187张
const list = [{
    src: '/gongsi',
    imgLength: 44
}, {
    src: '/daoguan',
    imgLength: 43
}, {
    src: '/chechushusong',
    imgLength: 13
}, {
    src: '/huishou',
    imgLength: 25
}, {
    src: '/huishoubaohusan',
    imgLength: 26
}, {
    src: '/shousan',
    imgLength: 15
}, {
    src: '/shifangbaohusan',
    imgLength: 21
}];
const imgList2 = [
    '/shusongdaoguan2',
    '/shusongdaoguan3',
    '/huishoudaoguan',
    '/shifangdahongsan',
]
const imgList3 = [
    '/videoImg/01.jpg',
    '/videoImg/02.jpg',
    '/videoImg/03.jpg',
]
window.imgOklist = [];

for (let i = 0; i < list.length; i++) {
    reloadImg({
        imgFile: list[i].src,
        imgLength: list[i].imgLength
    })
}

for (let i = 0; i < imgList2.length; i++) {
    reloadImg2(imgList2[i])
}

for (let i = 0; i < imgList3.length; i++) {
    reloadImg3(imgList3[i])
}

function reloadImg({ imgFile, imgLength }) {
    for (var i = 0; i < imgLength; i++) {
        var img = new Image();
        img.src = `${httpName}${imgFile}/${i}.jpg`;
        img.onload = function () {
            imgOklist.push(img.src);
            $('#loading span').html(`进度${parseInt(imgOklist.length / 190 * 100)}%`)
        }
    }
}

function reloadImg2(imgFile) {
    var img = new Image();
    img.src = httpName + imgFile + '.png';
    img.onload = function () {
        imgOklist.push(img.src)
    }
}

function reloadImg3(imgFile) {
    var img = new Image();
    img.src = httpName + imgFile;
    img.onload = function () {
        imgOklist.push(img.src)
    }
}
