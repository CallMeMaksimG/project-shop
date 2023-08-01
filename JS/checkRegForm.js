$(document).ready(function(){

    $('#name-reg, #surname-reg ,#patronymic-reg, #email-reg, #password-reg').on('focusout', function(e){
        let el = $(e.currentTarget);
        let action = el.attr('id');
        $('.status').show();
        let status = $(this).parent().find('.status');
        let textError = $(this).parent().find('.text-error');
        if(action == 'name-reg'){
            // console.log('имя')
            //проверка имени
            if($(this).val().indexOf(' ')>-1  || /[0-9]/.test($(this).val())){
                        // status.html('  &#65794;');
                        status.html('<img class="status-false" src="image/icon/false.png">');
                        textError.html('проверьте правильность заполнения формы');
                        textError.show();
                    }else if($(this).val()==''){
                        // status.html(' &#65794;');
                        status.html('<img class="status-false" src="image/icon/false.png">');
                        textError.html('поле обязательно для заполнения');
                        textError.show();
                    }else {
                        status.html('<img class="status-true" src="image/icon/true.png">');
                        textError.hide();
                    }
        }else if(action == 'surname-reg'){
            // console.log('Фамилия')
            //проверка фамилии
            if($(this).val().indexOf(' ')>-1  || /[0-9]/.test($(this).val())){
                        status.html('<img class="status-false" src="image/icon/false.png">');
                        textError.html('проверьте правильность заполнения формы');
                        textError.show();
                    }else if($(this).val()==''){
                        status.html('<img class="status-false" src="image/icon/false.png">');
                        textError.html('поле обязательно для заполнения');
                        textError.show();
                    }else {
                        status.html('<img class="status-true" src="image/icon/true.png">');
                        textError.hide();
                    }
        }else if(action == 'patronymic-reg'){
            // console.log('отчество')
            //проверка отчества
            if($(this).val().indexOf(' ')>-1  || /[0-9]/.test($(this).val())){
                        status.html('<img class="status-false" src="image/icon/false.png">');
                        textError.html('проверьте правильность заполнения формы');
                        textError.show();
                    }else if($(this).val()==''){
                        status.html('');
                        textError.hide();
                    }
                    else {
                        status.html('<img class="status-true" src="image/icon/true.png">');
                        textError.hide();
                    }
        }else if(action == 'email-reg'){
            // console.log('email')
            //проверка email
            if($(this).val().indexOf('@')>-1 && $(this).val().indexOf('.')>-1){
                            status.html('<img class="status-true" src="image/icon/true.png">');
                            textError.hide();
                        }else if($(this).val()==''){
                            status.html('<img class="status-false" src="image/icon/false.png">');
                            textError.html('поле обязательно для заполнения');
                            textError.show();
                        }
                        else {
                            status.html('<img class="status-false" src="image/icon/false.png">');
                            textError.html('проверьте правильность заполнения формы');
                            textError.show();
                        }
        }else if(action == 'password-reg'){
            //  console.log('пароль')
             //проверка пароля
             if($(this).val()==''){
                            status.html('<img class="status-false" src="image/icon/false.png">');
                            textError.html('поле обязательно для заполнения');
                            textError.show();
                        }else if($(this).val().length >= 6 && /[0-9]/.test($(this).val()) && /[a-za-яё]/i.test($(this).val()) && $(this).val().toLowerCase() !== $(this).val()){
                            status.html('<img class="status-true" src="image/icon/true.png">');
                            textError.hide();
                        }else{
                            status.html('<img class="status-false" src="image/icon/false.png">');
                            textError.html('пароль должен содержать как минимум 6 знаков, 1 цифру и одну заглавную букву');
                            textError.show();
                        }
            }

    })
})

