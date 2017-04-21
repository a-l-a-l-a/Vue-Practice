/**
 * Created by Administrator on 2017/3/14.
 */

Vue.filter("money",function(value,type){//全局过滤器，比如可以提出来放进filters.js的文件中，公用
    return "￥"+value.toFixed(2)+type;
});

new Vue({
    el:"#app",
    data:{
        totalMoney : 0,
        productList : [],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
    filters:{
        formatMoney: function (value,type) {//局部过滤器 type和全局过滤器中的一致
            return "￥"+value.toFixed(2);
        }
    },
    mounted: function(){
        this.$nextTick(function(){//mounted钩子函数，需要用Vue.nextTick(function()...) / this/vm.$nextTick(function......);主要用来改变作用域，this指向vm            vm.cartView();
            this.cartView();
        })
    },
    methods:{
        cartView: function(){//获取数据
            //let _this = this;
            this.$http.get("data/cart.json").then(res=>{//es6语法相当于function（res）{。。。}
                this.productList = res.body.result.productList;//引用的vue-resource.js
                //this.totalMoney = res.body.result.totalMoney;
            });
        },
        changeMoney: function (product, way) {
            if(way>0){
                //alert(way);
                product.productQuentity++;
            }else{
                //alert(way);
                product.productQuentity--;
                if(product.productQuentity < 1){
                    product.productQuentity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectProduct: function (item) {
            if(typeof item.checked == "undefined"){//判断item中是否存在checked 等于“undefined”说明不存在
                Vue.set(item,"checked",true)//全局注册 在item中注册个checked 并且状态为true
                //this.$set(item,"checked",true)//局部注册 在item中注册个checked 并且状态为true 用于当实例
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();//计算总金额
        },
        checkAll : function (flag) {
            var _this = this;
            //console.log(this.productList);
            this.checkAllFlag = flag;
            this.productList.forEach(function(value,index){//value应该就是指this.productList，所以是网this.porductList中插入checked属性，index是索引值
                if(typeof value.checked == 'undefined'){
                    _this.$set(value,"checked",_this.checkAllFlag);
                }else{
                    value.checked = _this.checkAllFlag;
                    //console.log(value);
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if(item.checked){
                    _this.totalMoney +=item.productPrice * item.productQuentity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag =true;
            this.curProduct = item;
            //console.log(item);
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            console.log(index);
            this.productList.splice(index,1);//index即是第几个（从0）开始，而1是指删除一个
            this.delFlag = false;
        }
    }
});