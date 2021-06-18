(function (window) {
    const cateBox = document.querySelector('.filter > .cate > #ul1')
    const cateBox1 = document.querySelector('.filter > .cate > #ul2')
    const cateBox2 = document.querySelector('.filter > .cate > #ul3')

    const pagiBox = document.querySelector('.pagi')
    const goodsBox = document.querySelector('.goods > ul')
    const sortBox = document.querySelector('.sort > ul')
  
    const listInfo = {
      current: 1,
      pagesize: 10,
      catename: '个护健康',
      ispromote: 2, 
      sortType: 1, 
      sort: 'ASC', 
    }
  var a
    getCateList()
    function getCateList() {
      ajax({
        url:'./list.php',
        dataType: 'json',
        success (res) {
          const { code, list } = res
          if (code !== 1) return
          bindCateList(list)
          erji()
          sanji()
        }
      })
    }
    erji()
    function erji() {
      ajax({
        url:'./erji.php',
        dataType: 'json',
        data: { ejcd: listInfo.catename},
        success (res) {
          console.log(res);
          const { code, list } = res
          if (code !== 1) return
          erjicd(list)
          console.log( listInfo.catename);
        }
      })
    }
    sanji()
    function sanji() {
      // 发送请求
      ajax({
        url:'./sanji.php',
        dataType: 'json',
        data: { sjcd: a},
        success (res) {
          console.log(res);
          const { code, list } = res
          if (code !== 1) return
          sanjicd(list)
        }
      })
    }
    function erjicd(list) {
      let str = ''
  
      list.forEach((item, index) => {
        str += `
          <li data-catename="${ item.cat_two_id }" class="${ index === 0 && 'active' }">${ item.cat_two_id }</li>
        `
      })
      cateBox1.innerHTML = str
  
    }
    function sanjicd(list) {
      let str = '<li>详细</li>'
  
      list.forEach((item, index) => {
        str += `
          <li data-catename="${ item.cat_three_id }" class="${ index === 0 && 'active' }">${ item.cat_three_id }</li>
        `
      })
      cateBox2.innerHTML = str
  
    }
    function bindCateList(list) {
      let str = ''
  
      list.forEach((item, index) => {
        str += `
          <li data-catename="${ item.cat_one_id }" class="${ index === 0 && 'active' }">${ item.cat_one_id }</li>
        `
        if (index === 0) listInfo.catename = item.cat_one_id
      })
      cateBox.innerHTML = str

      getCount()
    }
  
    function getCount() {
      ajax({
        url: './count.php',
        data: {
          catename: listInfo.catename,
          ispromote: listInfo.ispromote
        },
        dataType: 'json',
        success (res) {
          const { code, count } = res
  
          if (code !== 1) return
  
          bindPagi(count - 0)
          console.log(count);
        }
      })
    }
    function bindPagi(count) {
      const div = document.createElement('div')
      div.className = 'pagination'
      pagiBox.appendChild(div)
  
      new Pagination('.pagi > .pagination', {
        current: listInfo.current,
        pagesize: listInfo.pagesize,
        total: count,
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '末页',
        go: '跳转',
        change (num) {
          listInfo.current = num
          getGoodsList()
        }
      })
    }
    function getGoodsList() {
      ajax({
        url: './goodsList.php',
        data: listInfo,
        dataType: 'json',
        success (res) {
          const { code, list } = res
  
          if (code !== 1) return
  
          bindGoods(list)
        }
      })
    }
    function bindGoods(list) {
      console.log(list);
      console.log({list});
      goodsBox.innerHTML = template('goodsTmp', { list })
    }
  
    
    bindEvent()
    function bindEvent() {
      cateBox.addEventListener('click', e => {
        e = e || window.event
        
        const target = e.target || e.srcElement
      
        if (target.nodeName === 'LI') {
          const catename = target.dataset.catename
          listInfo.catename = catename
          listInfo.current = 1
          getCount()
          erji()
          cateBox2.innerHTML = ''
          ;[...cateBox.children].forEach(item => item.className = '')
          target.className = 'active'
        }
      })
      cateBox1.addEventListener('click', e => {
        e = e || window.event
        
        const target = e.target || e.srcElement
        if (target.nodeName === 'LI') {
          const catename = target.dataset.catename
          a  = catename
          sanji()
          ;[...cateBox1.children].forEach(item => item.className = '')
          target.className = 'active'

        }
      })
      cateBox2.addEventListener('click', e => {
        e = e || window.event
        
        const target = e.target || e.srcElement
  
        if (target.nodeName === 'LI') {
          const catename = target.dataset.catename
          ;[...cateBox2.children].forEach(item => item.className = '')
          target.className = 'active'
        }
      })
      sortBox.addEventListener('click', e => {
        e = e || window.event
        const target = e.target || e.srcElement
        
        if (target.nodeName === 'LI') {
          const sort = target.dataset.sort
          const sortType = target.dataset.sorttype
          listInfo.sort = sort
          listInfo.sortType = sortType
          listInfo.current = 1
          
          target.dataset.sort = sort === 'ASC' ? 'DESC' : 'ASC'
          getCount()
          ;[...sortBox.children].forEach(item => item.className = '')
          target.className = 'active'
        }
      })
      
    }
    $('#OP').parent().click(function(){
      console.log(1);
      if (!getCookie("name")) {
        alert('亲！！！请先登录')
      }
      })
  })(window)
  