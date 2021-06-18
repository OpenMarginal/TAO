jQuery('form').validate({
    rules: {
      username: true,
      password: true
    },
    messages: {
      username: '用户名不能为空' ,
      password: '密码不能为空' 
    },
    
  })
  $$('Btn').addEventListener('click', function () {
    ajax({
      url: './login.php',
	  type:'get',
      data: {
        username: $$('username').value,
        password: $$('password').value,
      },
      dataType: 'json',
      success: function (res) {
        if (res['status'] == '1') {
          alert(res['msg'])
		  setCookie('name',res['name'])
          window.location.href = './TB.html'
        } else {
          alert(res['msg'])
        }
      }
    })
  })
  $('.Tab>ul>li').click(function(){
    $(this)
		.css('cursor','pointer')                  
      .addClass('active')     
      .siblings()             
      .removeClass('active')  
      .parent()               
      .next()                 
      .find('li')         
      .removeClass('active')  
      .eq($(this).index())   
      .addClass('active')

  })
$('#IP').click(function(){
	$('#span').css('display','none')
})

$(function() {
	var btn = $(".btn");
	$(function() {
		btn.click(settime);
    
	})
	var countdown = 60;
	function settime() {
		if(!$('#IP').val()){
			$('#span').css('display','block').html('请输入手机号')
			return false
		}else{
			$('#span').css('display','none')
			let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
			if(!regs.test($('#IP').val())){
				$('#span').css('display','block').html('手机号码格式不正确')
				return
			}
		}
		if (countdown == 0) {
			btn.attr("disabled", false);
			btn.html("获取验证码");
			countdown = 60;
			return;
		} else {
			btn.attr("disabled", true);
			btn.html("重新发送(" + countdown + ")");
			countdown--;
		}
		setTimeout(settime, 1000);
	}
 
})