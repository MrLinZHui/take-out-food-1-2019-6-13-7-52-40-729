var promotions = loadPromotions();
var items =loadAllItems();
var PromotionsItem = promotions[1].items;
//actual time:15min
function bestCharge(selectedItems) {
  let bestChargeStr = "";
  let ItemsObj =  countOrderSimple(selectedItems);
  bestChargeStr = countPayandPrintCharge(ItemsObj);
  console.log(bestChargeStr);
  return bestChargeStr;
}
//countOrderSimple(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]) 
//actual time:5min
function countOrderSimple(selectedItems){
return selectedItems.reduce((itemObj,order) =>{
  order = order.replace(" ","");
  let object = order.split("x");
  itemObj[object[0]] = object[1];
  return itemObj;
},{});
return ItemsObj;
}
//actual time:20min
function countPayandPrintCharge(ItemsObj){
  let bestChargeStr =`============= 订餐明细 =============\n${ printOrderSimple(ItemsObj)}-----------------------------------\n`;
  let payArray = PayOrderAll(ItemsObj);
  let payAll = payArray[0];
  let payPromotions = payArray[2];
  let payCompare = payArray[1];
  if(payAll == payPromotions && payAll == payCompare){
    bestChargeStr =bestChargeStr+  `总计：${payPromotions}元
===================================`
  }
  else if(payCompare>payPromotions){
    bestChargeStr =bestChargeStr+ `使用优惠:\n指定菜品半价(黄焖鸡，凉皮)，省${payAll-payPromotions}元
-----------------------------------
总计：${payPromotions}元
===================================`;
  }
  else if(payCompare<=payPromotions){
    bestChargeStr =bestChargeStr+  `使用优惠:\n满30减6元，省6元
-----------------------------------
总计：${payCompare}元
===================================`;
  }
  return bestChargeStr;
}
//actual time:10min
function PayOrderAll(ItemsObj){
  let payArray = [];
  let payAll = 0;
  let payPromotions = 0;
  let payCompare = 0;
  for(let key in ItemsObj){
    for(let i = 0;i< items.length;i++){
      if(key === items[i].id){
        payAll += items[i].price * ItemsObj[key];
        if(PromotionsItem.indexOf(key)!=-1){
          payPromotions += (items[i].price * ItemsObj[key])/2;
        }else{
          payPromotions += items[i].price * ItemsObj[key];
        }
      }
    }
  }
  payCompare = ((payAll >= 30 )? payAll - 6:payAll);
  payArray.push(payAll);
  payArray.push(payCompare);
  payArray.push(payPromotions);
  //console.log("payPromotions:"+payPromotions);
  return payArray;
}
//actual time:5min
function printOrderSimple(ItemsObj){
  let bestChargeStr1 = "";
  for(let key in ItemsObj){
    for(let i = 0;i< items.length;i++){
      if(key === items[i].id){
        bestChargeStr1 +=`${items[i].name} x${ItemsObj[key]} = ${items[i].price*ItemsObj[key]}元\n`
      }
    }
  }
  //console.log(bestChargeStr);
  return bestChargeStr1;
}