// 指引icon闪烁
function guideBlink({ shows, initHeight = 0 }) {
    $(`.guide-icon`).remove();
    $(`${shows} .dao-box`).append("<img style='display:block' class='guide-icon' src='./assets/dianji_icon.png'>");

    // 固定导丝位置
    $(`${shows} .guide-icon`).css({
        bottom: initHeight
    })

    window.guideInter = setInterval(function () {
        $(`${shows} .guide-icon`).fadeOut(800).fadeIn(800);
    }, 1600);
}

// 向上滑动
function animationCall({ el, daoHeight, callBack, imgLength, description1, imgText, description2, imgFile }) {
    let mouseLeft = 0, mouseMove = 0, ownTrans, guideIconTop, movePX, lineHeight, scrollBottom;
    const daoBoxHeight = $(`${el} .dao-box`).height();
    const everyHeight = (daoBoxHeight - daoHeight) / imgLength;
    //开始
    $(`${el} .dao-icon`).on('touchstart', function (e) {
        mouseLeft = e.originalEvent.changedTouches[0].pageX;
        ownTrans = parseInt($(`${el} .dao-icon`).css('bottom'));
        guideIconTop = parseInt($(`${el} .guide-icon`).css('bottom'));
        lineHeight = $(`${el} .line`).height();
        clearInterval(guideInter)
    })
    //滑动
    $(`${el} .dao-icon`).on('touchmove', function (e) {
        clearInterval(guideInter)
        scrollBottom = parseInt($(`${el} .dao-icon`).css('bottom'));
        mouseMove = e.originalEvent.changedTouches[0].pageX;
        movePX = mouseMove - mouseLeft;
        if ((scrollBottom - ownTrans) < movePX && scrollBottom < daoBoxHeight - daoHeight) {
            // 切换图片
            let nums = parseInt((movePX + ownTrans) / everyHeight);
            if (nums > imgLength) {
                nums = imgLength
            }
            $('#box-center-img img').attr('src', `${imgFile}/${nums}.jpg`)
            // 导丝滑动
            $(`${el} .dao-icon`).css({
                bottom: movePX + ownTrans
            })
            // 引导滑动
            $(`${el} .guide-icon`).css({
                bottom: guideIconTop + movePX
            })
            $(`${el} .line`).css({
                height: lineHeight - movePX
            })
        } else {
            $('.description1').html(description1);
        }
    })
    //结束
    $(`${el} .dao-icon`).on('touchend', function () {
        if (scrollBottom == daoBoxHeight - daoHeight || scrollBottom > daoBoxHeight - daoHeight) {
            //滑动过快，超出
            if (scrollBottom > daoBoxHeight - daoHeight) {
                $(`${el} .dao-icon`).css({
                    bottom: daoBoxHeight - daoHeight
                })
            }
            clearInterval(guideInter)
            $('.center-img p').html(imgText);
            $('.description1').html(description2);
            $(`${el} .dao-icon`).unbind();
            callBack()
        } else {
            const selfBottom = $(`${el} .guide-icon`).css('bottom');
            guideBlink({
                shows: el,
                initHeight: selfBottom
            });
        }
    })
}

//向下滑动
function animationCall2({ el, callBack, imgLength, daosiTop, imgFile, showLine }) {
    let mouseLeft = 0, mouseMove = 0, ownTrans, guideIconTop, movePX, scrollBottom, everyHeight, lineHeight;

    if (imgLength) {
        const daoBoxHeight = $(`${el} .dao-box`).height();
        everyHeight = (daoBoxHeight - daosiTop) / imgLength;
    }
    //开始
    $(`${el} .dao-icon`).on('touchstart', function (e) {
        mouseLeft = e.originalEvent.changedTouches[0].pageX;
        ownTrans = parseInt($(`${el} .dao-icon`).css('bottom'));
        guideIconTop = parseInt($(`${el} .guide-icon`).css('bottom'));
        lineHeight = $(`${el} .line`).height();
        clearInterval(guideInter)
    })
    //滑动
    $(`${el} .dao-icon`).on('touchmove', function (e) {
        clearInterval(guideInter)
        scrollBottom = parseInt($(`${el} .dao-icon`).css('bottom'));
        mouseMove = e.originalEvent.changedTouches[0].pageX;
        movePX = mouseMove - mouseLeft;

        if ((scrollBottom - ownTrans) > movePX && scrollBottom > 0) {
            // 导丝滑动
            $(`${el} .dao-icon`).css({
                bottom: ownTrans + movePX
            })
            // 引导滑动
            $(`${el} .guide-icon`).css({
                bottom: guideIconTop + movePX
            })
            if (showLine) {
                // 切换line
                $(`${el} .line`).show().css({
                    height: lineHeight - movePX
                })
            }

            if (imgLength) {
                // 切换图片
                let nums = parseInt((movePX + ownTrans) / everyHeight);
                if (nums > imgLength) {
                    nums = imgLength
                }
                $('#box-center-img img').attr('src', `${imgFile}/${imgLength - nums}.jpg`)

            }
        }
    })
    //结束
    $(`${el} .dao-icon`).on('touchend', function (e) {
        if (scrollBottom < 0 || scrollBottom == 0) {
            if (scrollBottom < 0) {
                $(`${el} .dao-icon`).css({
                    bottom: 0
                })
            }
            clearInterval(guideInter)
            callBack();
        } else {
            const selfBottom = $(`${el} .guide-icon`).css('bottom');
            guideBlink({
                shows: el
            });
            $(`${el} .guide-icon`).css({
                bottom: selfBottom
            })
        }
    })
}

function unbidEvent() {
    $('#box-left-img .dao-icon, #box-left-img .guide-icon, #box-right-img .dao-icon, #box-right-img .guide-icon').unbind();
}