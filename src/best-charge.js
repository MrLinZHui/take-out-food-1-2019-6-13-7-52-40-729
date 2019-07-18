var promotions = loadPromotions();
var items =loadAllItems();
var PromotionsItem = promotions[1].items;
//actual time:15min
function bestCharge(selectedItems) {
  let bestChargeStr = "";
  let ItemsObj =  countOrderSimple(selectedItems);
  bestChargeStr = countPayandPrintCharge(ItemsObj);
  return bestChargeStr;
}
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
  return printPromotion(payArray,bestChargeStr);
}

function printPromotion(payArray,bestChargeStr){
  let payAll = payArray[0];
  let payPromotions = payArray[2];
  let payCompare = payArray[1];
  if(payAll == payPromotions && payAll == payCompare){
    bestChargeStr =bestChargeStr;
  }
  else if(payCompare>payPromotions){
  bestChargeStr =bestChargeStr+ `使用优惠:\n指定菜品半价(黄焖鸡，凉皮)，省${payAll-payPromotions}元
-----------------------------------\n`;
  }
  else if(payCompare<=payPromotions){
    payPromotions = payCompare;
  bestChargeStr =bestChargeStr+ `使用优惠:\n满30减6元，省6元
-----------------------------------\n`;
  } 
  let endstr = `总计：${payPromotions}元
===================================`;
  return bestChargeStr+endstr;
  }
//actual time:10min
function PayOrderAll(ItemsObj){
  let payArray = [];
  let payAll = 0;
  let payPromotions = 0;
  let payCompare = 0;
  Object.keys(ItemsObj).forEach(key => {
    items.filter(item =>{
      if(key===item.id){
        payAll += item.price * ItemsObj[key];
        payPromotions += PromotionsItem.indexOf(key)!=-1?(item.price * ItemsObj[key])/2:item.price * ItemsObj[key];
      }
    })
  });
  payCompare = ((payAll >= 30 )? payAll - 6:payAll);
  payArray.push(payAll);
  payArray.push(payCompare);
  payArray.push(payPromotions);
  return payArray;
}
//actual time:5min
function printOrderSimple(ItemsObj){
  let bestChargeStr1 = "";
  Object.keys(ItemsObj).forEach(key => {
    items.filter(item =>{
      if(key ===item.id){
        bestChargeStr1 +=`${item.name} x${ItemsObj[key]} = ${item.price*ItemsObj[key]}元\n`
      }
    });
  });
  return bestChargeStr1;
}