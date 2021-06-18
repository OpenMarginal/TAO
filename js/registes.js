
$('#IP').click(function(){
	$('#span').css('display','none')
})
$('#OP').parent().click(function(){
	console.log(1);
	if (!getCookie("name")) {
		alert('亲！！！请先登录')
	}
  })
$(function() {
	var btn = $(".btn");
	$(function() {
		btn.click(function(){
			settime()
		});
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