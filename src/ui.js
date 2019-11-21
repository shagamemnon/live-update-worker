export default {
  body (req) {
    return String.raw`<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico">
        <title>Workers Shopping Cart</title>
      <style>
        html, body {
      background-color: #eee;
      font-family: calibri, sans-serif;
    }

    #app {
      width: 760px;
      margin: 20px auto;
    }
    #app #product .box {
      width: 230px;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      display: inline-block;
      margin: 0 10px;
      position: relative;
    }
    #app #product .box img {
      width: 230px;
      height: auto;
      position: relative;
      overflow: hidden
    }
    #app #product .box i {
      width: 50px;
      height: 50px;
      background: #ED277F;
      color: #ffffff;
      border-radius: 25px;
      text-align: center;
      line-height: 50px;
      font-size: 1.4rem;
      position: absolute;
      right: 20px;
      top: 150px;
      box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
      cursor: pointer;
      transition: all 0.3s;
    }
    #app #product .box i:hover {
      transform: scale(1.05);
    }
    #app #product .box h2 {
      margin-left: 20px;
    }
    #app #product .box p {
      margin-left: 20px;
    }
    #app #cart {
      margin-top: 50px;
      overflow: hidden;
    }
    #app #cart #head {
      width: 100%;
      border-bottom: 1px solid #BFBFBF;
      height: 40px;
      display: block;
    }
    #app #cart #head h3 {
      display: inline-block;
      line-height: 40px;
      margin: 0;
    }
    #app #cart #head #price {
      display: inline-block;
      color: #777777;
      margin-left: 200px;
      line-height: 40px;
    }
    #app #cart #head #inventory {
      display: inline-block;
      color: #777777;
      margin-left: 100px;
      line-height: 40px;
    }
    #app #cart #head #total {
      display: inline-block;
      color: #777777;
      line-height: 40px;
      float: right;
    }
    #app #cart .row {
      width: 100%;
      border-bottom: 1px solid #BFBFBF;
      overflow: hidden;
      padding: 10px 0;
      display: block;
      float: left;
    }
    #app #cart .row img {
      height: 100px;
      float: left;
    }
    #app #cart .row h4 {
      float: left;
      margin: 0;
      line-height: 100px;
      margin-left: 20px;
      width: 100px;
    }
    #app #cart .row p {
      float: left;
      margin: 0;
      width: 80px;
      line-height: 100px;
      margin-left: 35px;
      text-align: center;
    }
    #app #cart .row .qty-minus {
      float: left;
      width: 20px;
      line-height: 100px;
      margin-left: 60px;
      text-align: center;
      cursor: pointer;
    }
    #app #cart .row .qty {
      float: left;
      width: 20px;
      line-height: 100px;
      margin-left: 20px;
      text-align: center;
    }
    #app #cart .row .qty-plus {
      float: left;
      width: 20px;
      line-height: 100px;
      margin-left: 20px;
      text-align: center;
      cursor: pointer;
    }
    #app #cart .row .del {
      float: left;
      width: 80px;
      line-height: 100px;
      margin-left: 60px;
      cursor: pointer;
      text-decoration: underline;
      color: #ED277F;
    }
    #app #cart .row .totalprice {
      float: left;
      width: 80px;
      line-height: 100px;
      margin-left: 10px;
      text-align: right;
    }
    #app #cart .row .row p::before, #app #cart .row .box p::before, #app #cart .row .totalprice::before {
      content: "$";
    }
    #app #cart h5 {
      font-size: 1.2rem;
      text-align: right;
    }

    #app {
      width: 100%
    }

    #app #product .box {
      width: 230px;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      display: block;
      margin: 0 auto;
      position: relative;
      margin-bottom: 50px;
    }

    #app #product .box p {
      margin-right: 20px;
      text-align: right;
      font-size: 24px;
      margin-bottom: 5px;
      border-bottom: 3px solid white
    }

    .number {
      font-size: 2rem;
      font-weight: bold;
      font-family: helvetica;
      text-align: center;
      color: black;
      transition-timing-function: cubic-bezier(0,.6,.79,1.35);
      transition-duration: 300ms
    }

    .transition {
      font-size: 3rem !important;
      transition-timing-function: cubic-bezier(0,.54,.79,1.35) !important;
      transition-duration: 120ms !important;
      opacity: 0.2 !important;
    }

      </style>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>
    </head>

    <body>
    <div id="app">
        <div id="product">
          <item v-for="item in items" v-bind:item_data="item"></item>
        </div>
        <div id="cart">
          <div id="head">
            <h3>Shopping Cart</h3>
            <div id="price">Price</div>
            <div id="total">Total</div>
          </div>
          <buyitem v-for="buyitem in buyitems" v-bind:buy_data="buyitem"></buyitem>
          <h5 v-if="total()">Sum: $ {{total()}}</h5>
        </div>
      </div>

      <template id="product-box">
        <div class="box">
          <img :src="item_data.img"/>
          <i class="fa fa-plus" v-on:click="addItem(item_data)"></i>
          <h2>{{item_data.title}}</h2>
          <p>$ {{item_data.price}}</p>
          <p>
          <span>Only</span>
          <span style="font-weight:bold;text-align:right;" id="inventory-counter" :class="item_data.id" class="number">{{item_data.inventory}} </span><span> left!</span>
          </p>
        </div>
      </template>

      <template id="buy-box">
        <div class="row">
          <img :src="buy_data.img"/>
          <h4>{{buy_data.title}}</h4>
          <p>$ {{buy_data.price}}</p>
          <div class="qty-minus" v-on:click="minusQty(buy_data)">-</div>
          <div class="qty">{{buy_data.qty}}</div>
          <div class="qty-plus" v-on:click="plusQty(buy_data)">+</div>
          <div class="del" v-on:click="removeItem(buy_data)">Remove</div>
          <div class="totalprice">{{buy_data.total}}</div>
        </div>
      </template>
      <script>
      async function fetchAndUpdate() {
        console.log('Fetching update')
        let response = await fetch('/inventory')
        response = await response.json()
        return updateInventory(response)
      }

      setInterval(fetchAndUpdate, 1000)

      const updateInventory = (items) => {
        const parse = (selector, currentInventory) => {
          console.log(selector, currentInventory)
          let elem = document.querySelector('.' + selector + '')
          if (elem && elem.innerText !== String(currentInventory)) {
            elem.innerText = String(currentInventory)
          }
        }
        items = Object.entries(items)
        for (const [k,v] of items) {
          parse(k, v)
        }
      }

      const updateItem = async (key, plusOrMinus) => {
        let res = await fetch('/update?key=' + key + '&direction=' + plusOrMinus + '')
        res = await res.text()
        let quantities = document.querySelectorAll('' + key + '')
        quantities.forEach(quantity => {
          elem.classList.toggle('transition')
          quantity.innerText = parseInt(res)
          setTimeout(() => { elem.classList.toggle('transition') }, 1000)
        })
      }
      </script>
      <script>

        var shoesClick = 0;
        var hatsClick = 0;
        var shirtsClick = 0;

        Vue.component("item", {
          template: "#product-box",
          props: ["item_data", "buyitems"],
          methods: {
            addItem: function(item_data) {
              if (item_data.id == "shoes") {
                shoesClick += 1;
                if (shoesClick <= 1) {
                  this.pushData();
                } else {
                  var i = this.findIndex(this.$parent.buyitems, "id", "shoes");
                  this.$parent.buyitems[i].qty += 1;
                  this.$parent.buyitems[i].total = this.$parent.buyitems[i].qty*this.$parent.buyitems[i].price;
                  console.log(i);
                }
              } else if (item_data.id == "hats") {
                hatsClick += 1;
                if (hatsClick <= 1) {
                  this.pushData();
                } else {
                  var i = this.findIndex(this.$parent.buyitems, "id", "hats");
                  this.$parent.buyitems[i].qty += 1;
                  this.$parent.buyitems[i].total =this.$parent.buyitems[i].qty*this.$parent.buyitems[i].price;
                }
              } else {
                shirtsClick += 1;
                if (shirtsClick <= 1) {
                  this.pushData();
                } else {
                  var i = this.findIndex(this.$parent.buyitems, "id", "shirts");
                  this.$parent.buyitems[i].qty += 1;
                  this.$parent.buyitems[i].total = this.$parent.buyitems[i].qty*this.$parent.buyitems[i].price;
                }
              }
              updateItem(item_data.id, 'plus')
              console.log(shoesClick, hatsClick, shirtsClick);
            },
            pushData: function() {
              this.$parent.buyitems.push({
                img: this.item_data.img,
                title: this.item_data.title,
                price: this.item_data.price,
                qty: 1,
                total: this.item_data.price,
                id: this.item_data.id
              })
            },
            findIndex: function(array, attr, value) {
              for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                  return i;
                }
              }
              return -1;
            },
          }
        });
        Vue.component("buyitem", {
          template: "#buy-box",
          props: ["buy_data", "buyitems"],
          methods: {
            removeItem: function(buy_data) {
              var index = this.$parent.buyitems.indexOf(buy_data);
              this.$parent.buyitems.splice(index, 1);
              if (buy_data.id == "shoes") {
                shoesClick = 0;
              } else if (buy_data.id == "hats") {
                hatsClick = 0;
              } else {
                shirtsClick = 0;
              }
              updateItem(buy_data.id, 'minus')
            },
            plusQty: function(buy_data){
              updateItem(buy_data.id, 'plus')
              buy_data.qty += 1;
              buy_data.total = buy_data.qty*buy_data.price;
            },
            minusQty: function(buy_data){
              buy_data.qty -= 1;
              if (buy_data.qty < 1) {
                var index = this.$parent.buyitems.indexOf(buy_data);
                this.$parent.buyitems.splice(index, 1);
                buy_data.qty = 0;
                if (buy_data.id == "shoes") {
                  shoesClick = 0;
                } else if (buy_data.id == "hats") {
                  hatsClick = 0;
                } else {
                  shirtsClick = 0;
                }
              }
              updateItem(buy_data.id, 'minus')
              buy_data.total = buy_data.qty*buy_data.price;
            }
          }
        })

        var app = new Vue({
          el: "#app",
          data: {
            items: [
              {
                img: "https://storage.franktaylor.io/d06cef5527f329e519553f649b3a76e219f2c9d6/shoes-2.jpg",
                title: "Shoes",
                price: "25",
                id: "shoes",
                inventory: 0
              },
              {
                img: "https://storage.franktaylor.io/d06cef5527f329e519553f649b3a76e219f2c9d6/hat-2.jpg",
                title: "Hats",
                price: "73",
                id: "hats",
                inventory: 0
              },
              {
                img: "https://storage.franktaylor.io/d06cef5527f329e519553f649b3a76e219f2c9d6/tshirt.jpg",
                title: "Shirts",
                price: "35",
                id: "shirts",
                inventory: 0
              }
            ],
            buyitems: []
          },
          methods: {
            total: function(){
              var sum = 0;
              this.buyitems.forEach(function(buyitem){
                    sum += parseInt(buyitem.total);
              });
              return sum;
            }
          }
        })
        </script>


          </body>
          </html>
    `
  },

  render (req) {
    return new Response(`${this.body()}`, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  }
}
