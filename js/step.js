$(function () {
    setTimeout(function () {
        const innerH = window.innerHeight, innerW = window.innerWidth;
        $('#indexs').remove();
        if (imgOklist.length > 190) {
            $('#loading').remove();
            $('#active-box').css({
                display: 'flex'
            });
            setTimeout(() => {
                $('.center-img .loading-img').fadeOut(1000);
            }, 6000)
            setTimeout(() => {
                $('.center-img .loading-img').remove();
            }, 7000)
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
                    setTimeout(() => {
                        $('.center-img .loading-img').fadeOut(1000);
                    }, 6000)
                    setTimeout(() => {
                        $('.center-img .loading-img').remove();
                    }, 7000)
                }
            }, 500)
        }

    }, 3000)
})