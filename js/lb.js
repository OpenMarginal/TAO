    let timer = 0
    let index = 1
    let flag = true

    setPoint()
    function setPoint() {
      const num = $('.img_box > li').length
      let str = ''
      for (var i = 0; i < num; i++) {
        str += `<li class="${i === 0 ? 'active' : ''}"></li>`
      }
      $('.point_box')
        .html(str)
        .css('width', num * 35)
        .css('marginLeft', $('.point_box').width() / -2)
    }

    copyEle()
    function copyEle() {
      const first = $('.img_box').children().first().clone()
      const last = $('.img_box').children().last().clone()

      $('.img_box')
        .append(first)
        .prepend(last)
        .css({
          width: $('.img_box > li').length * 100 + '%',
          left: $('.banner1').width() * -1
        })
    }

    autoPlay()
    function autoPlay() {
      timer = setInterval(() => {
        index++
        $('.img_box').animate({ left: -index * $('.banner1').width() }, 500, moveEnd)
      }, 1000)
    }

    function moveEnd() {
      if (index >= $('.img_box > li').length - 1) {
        index = 1
        $('.img_box').css('left', -index * $('.banner1').width())
      }

      if (index <= 0) {
        index = $('.img_box > li').length - 2
        $('.img_box').css('left', -index * $('.banner1').width())
      }

      $('.point_box > li').removeClass('active').eq(index - 1).addClass('active')

      flag = true
    }

    bindEvent()
    function bindEvent() {
      $('.banner1')
        .mouseenter(() => clearInterval(timer))
        .mouseleave(() => autoPlay())
        .on('click', '.left', () => {
          if (!flag) return
          flag = false
          index--
          $('.img_box').animate({ left: -index * $('.banner1').width() }, 500, moveEnd)
        })
        .on('click', '.right', () => {
          if (!flag) return
          flag = false
          index++
          $('.img_box').animate({ left: -index * $('.banner1').width() }, 500, moveEnd)
        })
        .on('click', '.point_box > li', function () {
          if (!flag) return
          flag = false
          index = $(this).index() + 1
          $('.img_box').stop().animate({ left: -index * $('.banner1').width() }, 500, moveEnd)
        })
    }

    changeTab()
    function changeTab() {
      $(document).on('visibilitychange', function () {
        if (document.visibilityState === 'hidden') clearInterval(timer)
        else if (document.visibilityState === 'visible') autoPlay()
      })
    }
