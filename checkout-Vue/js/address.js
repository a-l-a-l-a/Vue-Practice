/**
 * Created by Administrator on 2017/3/26.
 */
var vm = new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        curAddress:'',
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
      filterAddress: function () {
          return this.addressList.slice(0,this.limitNum);
      }
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if(status == 0){
                    _this.addressList = res.result;
                }
            });
        },
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function(address,index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            });
        },
        delAddress: function (item) {
            this.curAddress = item;
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
        }
    }
});