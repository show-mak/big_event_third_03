$(function () {

    let layer = layui.layer
    let form = layui.form


    // 1.点击按钮去往注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
        // console.log(1);
    })
    // 2.点击按钮去往登录页面
    $('#link_login').on('click', function () {
        // console.log(2);
        $('.reg-box').hide();
        $('.login-box').show()
    })

    // 3自定义表单验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , layer.msg('密码必须6到12位，且不能出现空格')
        ],
        repwd: function (value) {
            console.log(value);
            let pwd = $('.reg-box input[name=password]').val()
            console.log(pwd);
            if (value != pwd) {
                return layer.msg('"两次密码输入不一致,重新输入"')
            }
        }
    })

    //4.注册功能发送ajax
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功!跳转至登陆页面");
                $('#link_login').click();
                $('#form-reg')[0].reset();
            }
        })
    })

    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg("密码或用户名不正确")
                }

                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })


})