"use strict";

var IdeaItem = function(text){
  if (text) {
    var obj = JSON.parse(text);
    this.key = obj.key;
    this.value = obj.value;
  }else {
    this.key = "";
    this.value = "";

  }
};
IdeaItem.prototype = {
  toString:function(){
    return JSON.stringify(this);
  }
};
var SuperIdea = function(){
  LocalContractStorage.defineMapProperty(this,"repo",{
    parse:function(text){
      return new IdeaItem(text);
    },
    stringify:function(o){
      return o.toString();
    }
  });
};

SuperIdea.prototype = {
  init:function(){

  },
  save:function(key,value){

        key = key.trim(); // 去掉两边的空格
        value = value.trim(); // // 去掉两边的空格
        if (key === "" || value === ""){ //不能为空
            throw new Error("empty key / value");
        }

        if (value.length > 64 || key.length > 64){ //长度限制
            throw new Error("key / value exceed limit length")
        }

				// 自动获取当前钱包检测到的登录钱包地址
				// n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw
        // var from = Blockchain.transaction.from;
				// this.repo[key] nil
        var dictItem = this.repo.get(key);
				// 如果key对应的value存在，抛出异常
        if (dictItem){
            throw new Error("value has been occupied");
        }
				// 创建一个IdeaItem对象
        dictItem = new IdeaItem();

        dictItem.key = key;
        dictItem.value = value;

				// this.repo[key] = dictItem
				// this.repo.set(key, dictItem);
        this.repo.put(key, dictItem);
    },

		// 查询
    get: function (key) {
        key = key.trim();
        if ( key === "" ) {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = SuperIdea;
