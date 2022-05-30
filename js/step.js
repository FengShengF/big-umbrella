$(function () {
    setTimeout(function () {
        const innerH = window.innerHeight, innerW = window.innerWidth;
        $('#indexs').remove();
        if (imgOklist.length > 190) {
            $('#loading').remove();
            $('#active-box').css({
                display: 'flex'
            });
        } else {
            $('#loading').css({
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                'align-items': 'center',
                width: innerH,
                height: innerW
            }).show();
            var imgSetInter = setInterval(function () {
                if (imgOklist.length > 190) {
                    clearInterval(imgSetInter);
                    $('#loading').remove();
                    $('#active-box').css({
                        display: 'flex'
                    });
                }
            }, 500)
        }

    }, 3000)
})