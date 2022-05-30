$(function () {
    styleInit();
})

function styleInit() {
    const innerH = window.innerHeight, innerW = window.innerWidth;

    $('#box').css({
        width: innerH,
        height: innerW,
        transform: 'rotate(90deg)',
        background: 'url(assets/bg.jpg)',
        backgroundSize: '100% 100%',
        marginLeft: - (innerH - innerW) / 2,
        marginTop: (innerH - innerW) / 2,
    })

    // 首页
    $('#indexs').css({
        width: innerH,
        height: innerW,
    })

    // left right
    $('#box-left,#box-right').css({
        width: innerH * 0.2,
        height: innerW
    })

    $('#box-left-img,#box-right-img').css({
        width: innerH * 0.2,
        height: innerW * 0.8,
        display: 'table-cell',
        verticalAlign: 'middle',
        position: 'relative'
    })

    $('.dao-box').css({
        height: innerW * 0.6,
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
    })

    // center
    $('#box-center').css({
        width: innerH * 0.6,
        height: innerW
    })

    $('#box-center-img').css({
        width: innerH * 0.6,
        height: innerW * 0.8,
        display: 'table-cell',
        verticalAlign: 'middle'
    })
}