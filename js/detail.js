(function (window) {
    const obj = getStr(window.location.search)
    if (!obj.goodsId) return window.location.href = './list.html'
    const goodsId = obj.goodsId
      getGoodsInfo()
    function getGoodsInfo() {
      ajax({
        url: './detail.php',
        data: { goodsId },
        dataType: 'json',
        success (res) {
          const { code, info } = res
          if (code !== 1) return
          bindHtml(info)
        }
      })
    }
  
    function bindHtml(goodsInfo) {
      const img = document.querySelector('.goodsInfo img')
      const bigimg = document.querySelector('#bigBox img')
      const desc = document.querySelector('.goodsInfo .desc')
      const price = document.querySelector('.goodsInfo .price')
      const info = document.querySelector('.info')
  
      img.src = goodsInfo.goods_big_logo
      bigimg.src = goodsInfo.goods_big_logo
      desc.innerHTML = goodsInfo.goods_name
      price.innerHTML = '价格 ￥ ' + goodsInfo.goods_price
      info.innerHTML = goodsInfo.goods_introduce
    }
  })(window)
  