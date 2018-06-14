// ContactLog
$(document).ready(function(){
    // add contactLog
    $(".add-log").click(function(){
        id = $(this).data('id')
        if( $('#log-data-' + id).val() ){
            data = $('#log-data-' + id).val()
            $.post("@@update_contact_log", data)
                .done(function(){
alert('done')
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
