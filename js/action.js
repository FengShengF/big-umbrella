$(function () {
    var daosiTop = 76, //导丝置顶距离
        rightGuideTop = 36, //固定导丝手势的置顶距离
        daoguanTop = 158, //导管置顶距离
        leftGuideTop = 44, //固定导管手势的置顶距离
        daoBoxHeight = $(`#box-right-img .dao-box`).height();

    guideBlink({
        shows: '#box-right-img'
    });
    // 导丝滑动
    animationCall({
        el: '#box-right-img',
        daoHeight: daosiTop,
        callBack: daosiCall,
        imgLength: 44,
        imgFile: httpName + '/gongsi',
        description1: '攻丝（成功送入导丝）',
        imgText: '送入保护伞',
        description2: '点击固定导丝位置',
    });

    // 导丝输送成功回调         第一步
    function daosiCall() {
        guideBlink({
            shows: '#box-right-img',
            initHeight: daoBoxHeight - rightGuideTop
        });
        // 点击固定导丝
        $('#box-right-img .dao-icon,#box-right-img .guide-icon').one('click', function () {
            daoguanFun();
        })
    }

    // 输送导管逻辑         第二步  1
    function daoguanFun() {
        unbidEvent();
        if ($(`#box-right-img .suo-icon`).is(':visible')) {
            return
        }
        $('#box-right-img .suo-icon').show();
        $('.description1').html('向上滑动输送导管');
        $('#box-right .description').html('Barewire导丝已锁定')

        guideBlink({
            shows: '#box-left-img'
        });
        // 导管滑动
        animationCall({
            el: '#box-left-img',
            daoHeight: daoguanTop,
            callBack: daoguanCall,
            description1: '输送导管放置到位',
            imgText: '释放保护伞',
            description2: '点击红色按钮撤出保险栓',
            imgLength: 43,
            imgFile: httpName + '/daoguan',
        });
    }

    //输送导管回调         第二步  2
    function daoguanCall() {
        unbidEvent();

        // 点击撤出保险栓,固定导管
        guideBlink({
            shows: '#box-left-img',
            initHeight: daoBoxHeight - 134
        });

        $('#box-left-img .dao-icon,#box-left-img .guide-icon').one('click', function () {
            $('#box-left-img .dao-icon').attr('src', httpName + '/shusongdaoguan2.png')
            $('#box-left-img .dao-icon').css({
                transform: 'translateX(-17.5px)'
            })
            $('.description1').html('点击固定输送导管');
            $('#box-left-img .guide-icon').css({
                bottom: daoBoxHeight - leftGuideTop
            })
            daoguanCall2();
        })
    }

    //点击固定输送导管,抽出栓、释放大红伞         第二步  3
    function daoguanCall2() {
        unbidEvent();

        $('#box-left-img .dao-icon,#box-left-img .guide-icon').one('click', function () {
            $(`#box-left-img .line`).hide();
            $('#box-left-img .suo-icon').show();
            $('.description1').html('点击抽出栓、释放大红伞');
            $('#box-left-img .guide-icon').css({
                bottom: daoBoxHeight - 134
            })

            daoguanCall3();
        })
    }

    //点击抽出栓、释放大红伞        第二步  4
    function daoguanCall3() {
        unbidEvent();

        $('#box-left-img .dao-icon,#box-left-img .guide-icon').one('click', function () {
            $('#box-left-img .dao-icon').attr('src', httpName + '/shusongdaoguan3.png');
            const imgLength = 21;
            let startNum = 0;
            let shifangbhs = setInterval(function () {
                if (startNum === imgLength) {
                    clearInterval(shifangbhs)
                }
                $('#box-center-img img').attr('src', `${httpName}/shifangbaohusan/${startNum}.jpg`);
                startNum++;
            }, 20)

            $('#box-left-img .dao-icon').css({
                bottom: daoBoxHeight - 188
            })
            $('#box-left-img .guide-icon').css({
                bottom: daoBoxHeight - leftGuideTop
            })
            $('.description1').html('点击解锁输送导管');

            daoguanCall4();
        })
    }

    //点击解锁输送导管  第二步  5
    function daoguanCall4() {
        unbidEvent();

        $('#box-left-img .dao-icon,#box-left-img .guide-icon').one('click', function () {
            $('#box-left-img .suo-icon').hide();
            $('#box-left-img .guide-icon').css({
                bottom: daoBoxHeight - 134
            })
            $('.description1').html('下拉撤出输送导管');

            animationCall2({
                el: '#box-left-img',
                callBack: daoguanCall5,
                showLine: true,
                imgLength: 13,
                imgFile: httpName + '/chechushusong',
                daosiTop: 134
            })
        })
    }

    //下拉撤出输送导管  第二步  6
    function daoguanCall5() {
        unbidEvent();

        $('.description1').html('');
        $(`.center-img p`).hide();
        $('.guide-icon').remove();
        $('#box-left .description').html('回收导管');
        $('#box-left-img .dao-icon').attr('src', httpName + '/huishoudaoguan.png').css({
            bottom: 0,
            transform: 'translateX(-14.5px)'
        });
        $('.center-img').height($('.center-img').height())
        $('.center-img').append(`<img style="width: 100%;display:none;position:absolute;left:0;top:0;z-index:10" src="./assets/videoImg/01.jpg" alt="">`)
        $('.center-img').append(`<img style="width: 100%;display:none;position:absolute;left:0;top:0;z-index:9" src="./assets/videoImg/02.jpg" alt="">`)
        $('.center-img').append(`<img style="width: 100%;display:none;position:absolute;left:0;top:0;z-index:8" src="./assets/videoImg/03.jpg" alt="">`)
        $('.center-img img').eq(0).fadeOut(3000);
        $('.center-img img').eq(1).fadeIn(3000);

        setTimeout(() => {
            $('.center-img img').eq(1).fadeOut(3000)
            $('.center-img img').eq(2).fadeIn(3000)
        }, 3000)

        setTimeout(() => {
            $('.center-img img').eq(2).fadeOut(3000)
            $('.center-img img').eq(3).fadeIn(3000)
        }, 9000)
        setTimeout(() => {
            $('.description1').html('下一步').addClass('next');
            $(`#box-left-img, #box-left .description`).show();
            $('#box-left .description').html('回收导管');
            $('#box-left-img .line').show().css({
                width: '3px',
                background: '#000',
                marginLeft: '-2px'
            });

            $('.description1').one('click', function () {
                videoCall();
            })
        }, 15000)
    }

    //上滑送入导管  第三步
    function videoCall() {
        $('.center-img img').remove();
        $('.center-img').append(`<img style="width: 100%;" src="${httpName}/shifangdahongsan.png" alt="">`);
        $('.center-img p').show().html('回收保护伞');
        $('.description1').removeClass('next').html('上滑送入回收导管');

        guideBlink({
            shows: '#box-left-img'
        });
        // 导丝滑动
        animationCall({
            el: '#box-left-img',
            daoHeight: 100,
            callBack: huishoudaogaunCall,
            imgLength: 25,
            imgFile: httpName + '/huishou',
            description1: '上滑送入回收导管',
            imgText: '回收保护伞',
            description2: '点击锁定回收导管',
        });

    }

    //点击锁定回收导管  第四步
    function huishoudaogaunCall() {
        guideBlink({
            shows: '#box-left-img',
            initHeight: daoBoxHeight - leftGuideTop
        });

        // 点击回收导管
        $('#box-left-img .dao-icon,#box-left-img .guide-icon').one('click', function () {
            if ($(`#box-left-img .suo-icon`).is(':visible')) {
                return
            }
            $('#box-left-img .suo-icon').show();
            $('#box-left-img .description').html('回收导管已锁定');
            $('.description1').html('点击解锁导丝');

            guideBlink({
                shows: '#box-right-img',
                initHeight: daoBoxHeight - rightGuideTop
            });

            jiesuodaosiCall()

        })
    }

    //点击解锁导丝  第五步
    function jiesuodaosiCall() {
        unbidEvent();

        $('#box-right-img .dao-icon,#box-right-img .guide-icon').one('click', function () {
            $('#box-right-img .suo-icon').hide();
            $('#box-right p').html('Barewire导丝');
            $('.description1').html('点击回拉导丝');
            $('#box-right-img .guide-icon').css({
                bottom: daoBoxHeight - daosiTop
            })

            $(`#box-right-img .line`).show();
            animationCall2({
                el: '#box-right-img',
                imgLength: 26,
                daosiTop,
                imgFile: httpName + '/huishoubaohusan',
                callBack: huiladaosiCall,
                showLine: true
            })
        })
    }

    //回拉导丝后的回调
    function huiladaosiCall() {
        unbidEvent();

        $('.description1').html('点击解锁回收导管');
        guideBlink({
            shows: '#box-left-img',
            initHeight: daoBoxHeight - leftGuideTop
        });

        $('#box-left-img .dao-icon,#box-left-img .guide-icon').one('click', function () {
            $('#box-left-img .suo-icon').hide();
            $('.description1').html('下拉撤出回收导管');

            animationCall2({
                el: '#box-left-img',
                imgLength: 15,
                daosiTop: 100,
                imgFile: httpName + '/shousan',
                callBack: lastCall,
                showLine: true
            })
        })
    }

    function lastCall() {
        unbidEvent();
        $('.description1').html('成功回收保护伞');
        $(`.guide-icon`).remove();
    }
})