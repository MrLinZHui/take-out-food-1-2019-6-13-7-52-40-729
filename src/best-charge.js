var promotions = loadPromotions();
var items =loadAllItems();
function bestCharge(selectedItems) {
  var ItemsObj =  countOrderSimple(selectedItems);
  return /*TODO*/;
}
//countOrderSimple(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"])
//actual time:5min
function countOrderSimple(selectedItems){
var ItemsObj = [];
ItemsObj = selectedItems.reduce((itemObj,order) =>{
  order = order.replace(" ","");
  let object = order.split("x");
  itemObj[object[0]] = object[1];
  return itemObj;
},[]);
return ItemsObj;
}
function countPayandPrintCharge(ItemsObj){
  let bestChargeStr = "";
  return bestChargeStr;
}
function PayOrderoffer(ItemsObj){
  let payOrder = 0.00;
  return payOrder;
}
function countOrderSimple(payOrder){
  let bestChargeStr = "";
  return bestChargeStr;
}