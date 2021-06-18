(function (window) {
  var goodsBox=document.querySelector('#uL')
  //  const DATA = JSON.parse(localStorage.getItem('loc'))
  //  if(DATA.length>0){
     
  //  }
  
    const obj1 = getStr(window.location.search)
    if (!obj1.goodsId) return 
    const goodsId = obj1.goodsId
    console.log(goodsId);

      getGoodsInfo()
      $('#uL').empty()
    function getGoodsInfo() {
        ajax({
          url: './detail.php',
          data: { goodsId },
          dataType: 'json',
          success (res) {
              const { code, info } = res
              if (code !== 1) return
              var goodsItem =JSON.parse(localStorage.getItem('loc'));
              if(goodsItem ==null){
                var loc = new Array()
                loc.push(info)
                localStorage.setItem('loc',JSON.stringify(loc))
              }else{
                            
                for(var i = 0; i < goodsItem.length;i++){
                  if(goodsItem[i].goods_id===info.goods_id){
                    goodsItem.splice(i,1)
                  }
                }
                goodsItem.push(info)
                localStorage.setItem('loc',JSON.stringify(goodsItem))
              }
              var goodsItem =JSON.parse(localStorage.getItem('loc'));

              bindGoods(goodsItem)
              total()
              jQuery('#Q').change(function () {
                jQuery('#uL>li>input').setChecked(jQuery(this).getChecked())
                total()
            })
            jQuery('#uL>li>input').change(function () {
                jQuery('#Q').setChecked(jQuery('#uL>li>input').selectAll())
                total()
            })
              $('#cle').click(function(){
                jQuery('#Q').prop("checked",false)
                $('#J').html(0)
                $('#Mon').html(0)
                localStorage.clear()
                $('#uL').empty()
                
                  var str = `
                      <div style="padding-left:10px;" class="jumbotron">
                          <h1 style="font-size:56px;font-weight:bold">购物车空空如也!</h1>
                          <p style="font-size:26px">赶快去列表页挑选商品吧</p>
                          <p style="font-size:46px;font-weight:bold"><a class="btn btn-primary btn-lg" href="./list.html" role="button">去列表页</a></p>
                      </div>
                  `
                  $('#uL').html(str)
              
              })
              total()
              sum()
              function sum(){
                $('#uL>li>div>#Left').click(function(){
                  var num = $(this).next().html()-0
                  num--
                  $(this).next().html(num)
                  if(num<=1){
                      num = 1
                      $(this).next().html(num)                  
                  }
                  console.log(1);
                  var price = $(this).parent().prev().children().html()
                  var subtotal = price * num;
                  $(this).parent().next().children().html(subtotal.toFixed(2))
                  total()
                })
                $('#uL>li>div>#Right').click(function(){
                  var num = $(this).prev().html()-0
                  num++
                  $(this).prev().html(num)
                  if(num<=1){
                      num = 1
                      $(this).prev().html(num)                  
                  }
                  var price = $(this).parent().prev().children().html()
                  var subtotal = price * num;
                  $(this).parent().next().children().html(subtotal.toFixed(2))
                  total()
                })
              }
  
              $('#main>#uL>li>#Remove').click(function(){
                var B = confirm('确定删除？')
                if(B){
                  var data = JSON.parse(localStorage.getItem('loc'))
                  var goodsid = $(this).attr('title')
                  console.log(data);
                  for(var i = 0; i < data.length;i++){
                    if(data[i].goods_id===goodsid){
                      data.splice(i,1)
                    }
                  }
                  $(this).parent().remove()
                  total()
                  sum()
                  localStorage.setItem('loc',JSON.stringify(data))
                  if(!data.length){
                    jQuery('#Q').prop("checked",false)
                    $('#J').html(0)
                    $('#Mon').html(0)
                    var str = `
                        <div style="padding-left:10px;" class="jumbotron">
                            <h1 style="font-size:56px;font-weight:bold">购物车空空如也!</h1>
                            <p style="font-size:26px">赶快去列表页挑选商品吧</p>
                            <p style="font-size:46px;font-weight:bold"><a class="btn btn-primary btn-lg" href="./list.html" role="button">去列表页</a></p>
                        </div>
                    `
                    $('#uL').html(str)
                }
                }
              })
                function total(){
                  var totalNum = 0;
                  var totalPrice = 0
                  $('#uL>li>input:checked').each(function(i,v){
                      totalNum += $(v).parent().find('div').find('i').html()-0
                      console.log(totalNum);
                      totalPrice += $(v).parent().find('em').children().html()-0
                      console.log(totalPrice);
                  })
                  console.log($('#J'));
                  console.log($('#Mon'));
                  $('#J').html(totalNum)
                  $('#Mon').html(totalPrice)
              }
              
          }
    });
      
    }
    
    function bindGoods(arr) {
      $('.jumbotron').remove()
        arr.forEach(item => {
          goodsBox.innerHTML += template('Good',  {item})
        });
      }


  })(window)
jQuery.extend(jQuery.fn, {
  selectAll() {
      var flag = true
      for (var i = 0; i < this.length; i++) {
          if (!this[i].checked) {
              flag = false
              break
          }
      }
      return flag
  },
  setChecked(type) {
      for (var i = 0; i < this.length; i++) {
          this[i].checked = type === false ? false : true
      }
      return this
  },
  getChecked() {
      if (this.length) return this[0].checked
      return false
  }
})


  
 an()
function an(){
  const DAT = JSON.parse(localStorage.getItem('loc'))
    if(DAT==null||DAT.length==0){
          var str = `
              <div style="padding-left:10px;" class="jumbotron">
                  <h1 style="font-size:56px;font-weight:bold">购物车空空如也!</h1>
                  <p style="font-size:26px">赶快去列表页挑选商品吧</p>
                  <p style="font-size:46px;font-weight:bold"><a class="btn btn-primary btn-lg" href="./list.html" role="button">去列表页</a></p>
              </div>
          `
          $('#uL').html(str)
    }else{
      $('.jumbotron').remove()
    }
}