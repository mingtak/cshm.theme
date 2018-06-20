// ContactLog
$(document).ready(function(){

    // update seatNo
    $('a#update-seatNo').click(function(){
        items = $('input.seatNo')
        data = {}
        nos = []
        // 檢查重複
        for(i=0; i<items.length; i++){
            if( nos.includes($(items[i]).val()) ){
                alert('座號編碼錯誤: 有重複編號')
                return
            }else{
                id = $(items[i]).data('id')
                data['seat-' + id] = $(items[i]).val()
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
                alert('座位編碼成功');
                location.reload();
            }).fail(function(){
                alert('座位編碼失敗，請稍候再試，\n若持續失敗，請與系統管理員聯絡')
            });
    })

    // add contactLog
    $(".add-log").click(function(){
        id = $(this).data('id')
        if( $('#log-data-' + id).val() ){
            // 串接新舊資料
            if( $('#view-log-' + id).data('log') ){
                logData = $('#view-log-' + id).data('log') + '\n' + $('#log-data-' + id).val()
            }else{
                logData = $('#log-data-' + id).val()
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
