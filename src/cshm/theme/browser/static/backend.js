// ContactLog
$(document).ready(function(){

    // Popup 視窗 Start
    function popupInfo(el) {
        el.children('.popup').children('.popuptext').toggle();
    }
    $('.popup-box').hover( function(){popupInfo($(this))}, function(){popupInfo($(this))} )
    // Popup 視窗 End

    // update seatNo 更新編碼(受訓狀態同步更新)
    $('a#update-seatNo').click(function(){
        items = $('input.seatNo')
        data = {}
        nos = [] //檢查重複用
        // 檢查重複
        for(i=0; i<items.length; i++){
            if( ! $.isNumeric($(items[i]).val()) ){
                alert('編號作業請輸入數字，並且編號不可空白')
                return
            }else if( Number($(items[i]).val()) < 1 || Number($(items[i]).val()) > items.length){
                alert('編號超過範圍，請檢查所有編號，有效範圍 1~' + items.length)
                return
            }else if( nos.includes($(items[i]).val()) ){
                alert('座號編碼錯誤: 有重複編號')
                return
            }else{
                id = $(items[i]).data('id')
                data['seat-' + id] = $(items[i]).val()
                data['status-' + id] = $('#status-' + id).find(":selected").val();
                nos.push($(items[i]).val())
            }
        }

        $.post("@@update_seat_no", data)
            .done(function(data){
                alert('更新座位編號成功')
                location.reload();
            }).fail(function(){
                alert('作業失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
            });
    })

    // export to download site
    $('a.to-url').click(function(){
        data = {'url': $('input.to-url').val()}
        $.post("@@export_to_download_site", data)
            .done(function(data){
                if(data == '0'){
                    alert('匯出失敗，請檢查網址或與系統管理員聯絡');
                }else if(data == '1'){
                    alert('匯出帳號成功')
                }
            }).fail(function(){
                alert('作業失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
            });
    })

    // waiting trans to admit
    $('.waiting-trans-to-admit').click(function(){
        data = {'id': $(this).data('id')}
        $.post("@@waiting_trans_to_admit", data)
            .done(function(data){
                alert('備取轉正取成功');
                location.reload();
            }).fail(function(){
                alert('作業失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
            });
    })

    // all trans to admit
    $('#all-trans-to-admit').click(function(){
        $.post("@@all_trans_to_admit")
            .done(function(data){
                if( data == '1'){
                    alert('若正取已有名單，則無法進行全轉正取作業')
                }else{
                    alert('全轉正取成功');
                    location.reload();
                }
            }).fail(function(){
                alert('作業失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
            });
    })

    // batch admit numbering
    $('#admit-batch-numbering').click(function(){
        $.post("@@admit_batch_numbering")
            .done(function(data){
                if(data == '1'){
                    alert('批次編號只能執行一次，請改以手動更新編號')
                }else{
                    alert('座位編碼成功');
                    location.reload();
                }
            }).fail(function(){
                alert('座位編碼失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
            });
    })

    // add contactLog
    $(".add-log").click(function(){
        id = $(this).data('id')
        currentName = $(this).data('currentname')
        var date = new Date()
        year = date.getFullYear()
        month = date.getMonth()
        day = date.getDate()
        dateStr = year + '-' + month + '-' + day
        if( $('#log-data-' + id).val() ){
            // 串接新舊資料
            if( $('#view-log-' + id).data('log') ){
                logData = $('#view-log-' + id).data('log') + '\n' + currentName + ' / ' + dateStr + ' / ' + $('#log-data-' + id).val() //後續聯絡
            }else{
                logData = currentName + ' / ' + dateStr + ' / ' + $('#log-data-' + id).val() //第一次聯絡
            }
            data = {
                'id': id,
                'contactLog': logData
            }

            $.post("@@update_contact_log", data)
                .done(function(){
                    alert('新增留言成功');
                    location.reload();
                }).fail(function(){
                    alert('新增留言失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
                });

        }else{
            alert('您沒有輸入聯絡記錄')
        }
    })

    // show contactLog
    $(".view-log").click(function(){
        if( $(this).data('log') ){
            alert($(this).data('log'))
        }else{
            alert('尚無聯絡記錄')
        }
    })
})
