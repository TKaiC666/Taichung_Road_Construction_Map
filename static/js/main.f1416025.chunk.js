(this.webpackJsonpTaichung_Road_Construction_Map=this.webpackJsonpTaichung_Road_Construction_Map||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(7),c=a.n(l),i=a(15),r=a(1);var o=e=>{let t=e.value;return Object(r.jsxs)("div",{className:"cardMini",children:[Object(r.jsxs)("div",{className:"title",children:[Object(r.jsx)("div",{className:"state inlineBlock ".concat("\u662f"===t.workingState?"working":"notWorking"),children:"\u662f"===t.workingState?"\u65bd\u5de5\u4e2d":"\u672a\u65bd\u5de5"}),Object(r.jsx)("div",{className:"pipeType inlineBlock",children:t.pipeType})]}),Object(r.jsx)("div",{className:"title",children:Object(r.jsxs)("div",{className:"date",children:[Object(r.jsx)("span",{className:"slash",children:t.date.start.year}),Object(r.jsx)("span",{className:"slash",children:t.date.start.month}),Object(r.jsx)("span",{children:t.date.start.day}),Object(r.jsx)("i",{className:"fas fa-caret-right fa-lg"}),Object(r.jsx)("span",{className:"slash",children:t.date.end.year}),Object(r.jsx)("span",{className:"slash",children:t.date.end.month}),Object(r.jsx)("span",{children:t.date.end.day})]})}),Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"item",children:"\u6848\u4ef6\u985e\u5225"}),Object(r.jsx)("div",{className:"data",children:t.constructionType})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"item",children:"\u5de5\u7a0b\u540d\u7a31"}),Object(r.jsx)("div",{className:"data",children:t.title})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"item",children:"\u5730\u9ede"}),Object(r.jsx)("div",{className:"data last",children:t.distriction+t.address})]})]})};const d=[{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#f0f0f0"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"},{color:"#ec7868"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{visibility:"on"},{color:"#3da7a7"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#ffffff"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#cccccc"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#f9f9f9"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"},{lightness:700}]},{featureType:"water",elementType:"all",stylers:[{color:"#83cfe2"}]}],j={fillColor:"#FF7777",fillOpacity:.1,strokeColor:"#FF7777",strokeOpacity:1,strokeWeight:1,clickable:!1,draggable:!1,editable:!1,geodesic:!1,zIndex:0},m={styles:[{textSize:14,height:66,width:66,url:"/Taichung_Road_Construction_Map/img/markerclusterer/m1.png"},{textSize:14,height:66,width:66,url:"/Taichung_Road_Construction_Map/img/markerclusterer/m2.png"},{height:66,width:66,url:"/Taichung_Road_Construction_Map/img/markerclusterer/m3.png"},{height:66,width:66,url:"/Taichung_Road_Construction_Map/img/markerclusterer/m4.png"},{height:66,width:66,url:"/Taichung_Road_Construction_Map/img/markerclusterer/m5.png"}]};var g=e=>{const[t,a]=Object(n.useState)(60),{constructionsData:s,mapParameters:l,closeInfoBlock:c,setMapParameters:g,isMobile:h,makerMessage:u,userLocation:b}=e,p=Object(n.useRef)(null);let O=null!==s&&0!==s.length;const f=Object(n.useMemo)((()=>{const e=e=>{let t=10*(s.length-1)+s[s.length-1].length;return Array.from({length:t},((e,t)=>t)).map((t=>0!==s[Math.floor(t/10)][t%10].coordinate.lat&&0!==s[Math.floor(t/10)][t%10].coordinate.lng&&Object(r.jsx)(i.d,{position:{lat:Number(s[Math.floor(t/10)][t%10].coordinate.lat),lng:Number(s[Math.floor(t/10)][t%10].coordinate.lng)},onClick:()=>(e=>{let t=s[Math.floor(e/10)][e%10],a=p.current.getCenter().toJSON();g({center:a,polygon:t.coordinate.polygon,zoom:l.zoom,selectMarker:t,closeInfoWindow:!1})})(t),clusterer:e,noClustererRedraw:!0,icon:"\u662f"===s[Math.floor(t/10)][t%10].workingState?{url:"/Taichung_Road_Construction_Map/img/marker/cone.png",scaledSize:{width:37,height:37}}:{url:"/Taichung_Road_Construction_Map/img/marker/cone_gray.png",scaledSize:{width:37,height:37}}},"marker_"+t)))};return O&&Object(r.jsx)(i.e,{averageCenter:!0,options:m,gridSize:t,children:t=>e(t)},"markerClusterer")}),[s,O,t,l,g]);return Object(r.jsxs)("div",{className:"mapContainer",children:[Object(r.jsx)("div",{id:"mapCover",className:"mapCover ".concat(null===s?"open":h?null===c&&null===u?"close":!1===c||!0===u?"open":!0===c||!1===u?"close":void 0:"close")}),Object(r.jsx)(i.c,{googleMapsApiKey:"AIzaSyA7GA3igLrQdSo4_qwbZq8tcu1x_7e-f44",children:Object(r.jsxs)(i.a,{mapContainerStyle:{width:"100%",height:"inherit"},zoom:l.zoom,center:l.center,options:{styles:d,minZoom:11,maxZoom:20,disableDefaultUI:!0},onLoad:e=>{(e=>{p.current=e})(e)},onZoomChanged:()=>{let e=null;!p.current||p.current.zoom<=18?e=60:p.current.zoom>18&&(e=1),a(e)},children:[f,null!==b&&Object(r.jsx)(i.d,{position:b,zIndex:100},"userLocation"),(()=>{let e=!1;return!0===l.closeInfoWindow?e=!1:null!==l.selectMarker&&(e=!0),e})()&&Object(r.jsx)(i.b,{position:{lat:l.selectMarker.coordinate.lat,lng:l.selectMarker.coordinate.lng},options:{pixelOffset:new window.google.maps.Size(0,-45)},onCloseClick:()=>{g({center:l.center,polygon:l.polygon,zoom:l.zoom,selectMarker:null,closeInfoWindow:!0})},children:Object(r.jsx)(o,{value:l.selectMarker})}),l.polygon&&Object(r.jsx)(i.f,{path:l.polygon,options:j})]})})]})};var h=e=>{let t=e.value;const[a,s]=Object(n.useState)(!0),{setMapParameters:l}=e;return"loading"===t?Object(r.jsx)("div",{className:"card loading",children:Object(r.jsx)("div",{children:"Loading..."})}):Object(r.jsxs)("div",{className:"card",children:[Object(r.jsxs)("div",{className:"card-meta",children:[Object(r.jsxs)("div",{className:"card-meta-title",children:[Object(r.jsx)("div",{className:"highlighter bgColor_mintGreen-light",style:{width:t.pipeType.length+"em"}}),Object(r.jsx)("div",{className:"state unselectable ".concat("\u662f"===t.workingState?"working":"notWorking"),children:"\u662f"===t.workingState?"\u65bd\u5de5\u4e2d":"\u672a\u65bd\u5de5"}),Object(r.jsx)("div",{className:"pipeType",style:{position:"relative"},children:t.pipeType})]}),Object(r.jsxs)("div",{className:"card-meta-basicInfo",children:[Object(r.jsxs)("div",{className:"date",children:[Object(r.jsx)("span",{className:"slash",children:t.date.start.year}),Object(r.jsx)("span",{className:"slash",children:t.date.start.month}),Object(r.jsx)("span",{children:t.date.start.day}),Object(r.jsx)("i",{className:"fas fa-caret-right fa-lg"}),Object(r.jsx)("span",{className:"slash",children:t.date.end.year}),Object(r.jsx)("span",{className:"slash",children:t.date.end.month}),Object(r.jsx)("span",{children:t.date.end.day})]}),Object(r.jsxs)("div",{className:"info",children:[Object(r.jsx)("div",{className:"item",children:"\u6848\u4ef6\u985e\u5225"}),Object(r.jsx)("div",{children:t.constructionType})]}),Object(r.jsxs)("div",{className:"info",children:[Object(r.jsx)("div",{className:"item",children:"\u5730\u9ede"}),Object(r.jsx)("div",{children:t.distriction+t.address})]})]}),Object(r.jsxs)("div",{className:"buttons",children:[0!==t.coordinate.lat&&0!==t.coordinate.lat&&Object(r.jsx)("div",{title:"\u986f\u793a\u4f4d\u7f6e",className:"buttons-locate",onClick:()=>{(()=>{let e=Math.random()/1e6;l({center:{lat:t.coordinate.lat+e,lng:t.coordinate.lng+e},polygon:t.coordinate.polygon,zoom:20+e,selectMarker:t,closeInfoWindow:!1})})()},children:Object(r.jsx)("i",{className:"fas fa-map-marker-alt"})}),Object(r.jsx)("div",{title:"\u66f4\u591a\u8cc7\u8a0a",className:a?"buttons-moreInfo":"buttons-moreInfoClicked",onClick:()=>{s(!a)},children:Object(r.jsx)("i",{className:"fas ".concat(a?"fa-angle-double-down":"fa-angle-double-up")})})]})]}),Object(r.jsx)("div",{className:"".concat(a&&"noneDisplay"," horiLine")}),Object(r.jsx)("div",{className:"".concat(a&&"noneDisplay"," card-body"),children:Object(r.jsxs)("div",{className:"card-body-detailInfo",children:[Object(r.jsxs)("div",{className:"oneRow",children:[Object(r.jsx)("div",{className:"item",children:"\u5de5\u7a0b\u540d\u7a31"}),Object(r.jsx)("div",{className:"constructTitle",children:t.title})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"item",children:"\u7533\u8acb\u66f8\u7de8\u865f"}),Object(r.jsx)("div",{children:t.applicationNumber})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"item",children:"\u8a31\u53ef\u8b49\u7de8\u865f"}),Object(r.jsx)("div",{children:t.licenseNumber})]}),Object(r.jsxs)("div",{className:"oneRow",children:[Object(r.jsx)("div",{className:"item",children:"\u7533\u8acb\u55ae\u4f4d"}),Object(r.jsx)("div",{children:t.applicant})]}),Object(r.jsxs)("div",{className:"oneRow",children:[Object(r.jsx)("div",{className:"item",children:"\u5ee0\u5546"}),Object(r.jsx)("div",{children:t.contractor.name}),Object(r.jsx)("div",{className:"phone",children:t.contractor.phone})]}),Object(r.jsxs)("div",{className:"oneRow",children:[Object(r.jsx)("div",{className:"item",children:"\u8ca0\u8cac\u4eba"}),Object(r.jsx)("div",{children:t.personInCharge.name}),Object(r.jsx)("div",{className:"phone",children:t.personInCharge.phone})]})]})})]})};var u=e=>{let{handleCloseClick:t,handleMakerMessageClick:a}=e;return Object(r.jsx)("div",{className:"closeButtonContainer",children:Object(r.jsx)("div",{className:"closeButton",onClick:()=>{void 0!==t?t():void 0!==a&&a()},children:Object(r.jsx)("i",{className:"fas fa-times fa-lg"})})})};var b=e=>{const{margin:t,pageBtns:a,pageIndex:n,isMobile:s}=e,l=e.handlePaginationClick;let c=null,i=a.length-1;const o=e=>{if(e===n)return"currentPage"};if(1===a.length)return null;if(s){let e=Array.from({length:a.length},((e,t)=>t)),t=null;c=Object(r.jsxs)("div",{className:"pagination unselectable",children:[Object(r.jsx)("div",{className:" pageArrow",onClick:()=>{t=n-1,l(t),t>0&&(document.getElementById("pageSelect").value=t)},children:Object(r.jsx)("i",{className:"fas fa-chevron-left"})},"prePage"),Object(r.jsxs)("div",{className:"pageElement",children:[Object(r.jsx)("i",{className:"selectArrow fas fa-chevron-down fa-lg"}),Object(r.jsx)("span",{children:n+1}),Object(r.jsx)("select",{id:"pageSelect",value:n,onChange:e=>l(Number(e.target.value)),children:e.map((e=>Object(r.jsx)("option",{value:e,children:e+1},"pageSelect_"+(e+1))))})]}),Object(r.jsx)("div",{className:" pageArrow",onClick:()=>{t=n+1,l(t),t<i&&(document.getElementById("pageSelect").value=t)},children:Object(r.jsx)("i",{className:"fas fa-chevron-right"})},"nextPage")]})}else if(a.length>7){if(n-0>3&&i-n>3){let e=Array.from({length:3},((e,t)=>t+n-1));c=Object(r.jsxs)("div",{className:"pagination unselectable ".concat(t),children:[Object(r.jsx)("div",{className:"pageElement pageArrow",onClick:()=>{l(n-1)},children:Object(r.jsx)("i",{className:"fas fa-chevron-left"})},"prePage"),Object(r.jsx)("div",{onClick:()=>{l(0)},className:"pageElement pageBtn ".concat(o(0)),children:1},"page-01"),Object(r.jsx)("div",{className:"pageElement dot"}),e.map((e=>Object(r.jsx)("div",{onClick:()=>{l(e)},className:"pageElement pageBtn ".concat(o(e)),children:e+1},"page"+(e+1)))),Object(r.jsx)("div",{className:"pageElement dot"}),Object(r.jsx)("div",{onClick:()=>{l(i)},className:"pageElement pageBtn ".concat(o(i)),children:i+1},"page-"+i+1),Object(r.jsx)("div",{className:"pageElement pageArrow",onClick:()=>{l(n+1)},children:Object(r.jsx)("i",{className:"fas fa-chevron-right"})},"nextPage")]})}else if(n-0<=3){let e=Array.from({length:5},((e,t)=>t));c=Object(r.jsxs)("div",{className:"pagination unselectable ".concat(t),children:[Object(r.jsx)("div",{className:"pageElement pageArrow",style:0===n?{visibility:"hidden"}:{},onClick:()=>{l(n-1)},children:Object(r.jsx)("i",{className:"fas fa-chevron-left"})},"prePage"),e.map((e=>Object(r.jsx)("div",{onClick:()=>{l(e)},className:"pageElement pageBtn ".concat(o(e)),children:e+1},"page-"+(e+1)))),Object(r.jsx)("div",{className:"pageElement dot"}),Object(r.jsx)("div",{onClick:()=>{l(i)},className:"pageElement pageBtn ".concat(o(i)),children:i+1},"page-"+i+1),Object(r.jsx)("div",{className:"pageElement pageArrow",onClick:()=>{l(n+1)},children:Object(r.jsx)("i",{className:"fas fa-chevron-right"})},"nextPage")]})}else if(i-n<=3){let e=Array.from({length:5},((e,t)=>t+i-4));c=Object(r.jsxs)("div",{className:"pagination unselectable ".concat(t),children:[Object(r.jsx)("div",{className:"pageElement pageArrow",onClick:()=>{l(n-1)},children:Object(r.jsx)("i",{className:"fas fa-chevron-left"})},"prePage"),Object(r.jsx)("div",{onClick:()=>{l(0)},className:"pageElement pageBtn ".concat(o(0)),children:1},"page-01"),Object(r.jsx)("div",{className:"pageElement dot"}),e.map((e=>Object(r.jsx)("div",{onClick:()=>{l(e)},className:"pageElement pageBtn ".concat(o(e)),children:e+1},"page-"+(e+1)))),Object(r.jsx)("div",{className:"pageElement pageArrow",style:n===i?{visibility:"hidden"}:{},onClick:()=>{l(n+1)},children:Object(r.jsx)("i",{className:"fas fa-chevron-right"})},"nextPage")]})}}else c=Object(r.jsx)("div",{className:"pagination unselectable ".concat(t),children:a.map((e=>Object(r.jsx)("div",{onClick:()=>{l(e)},className:"pageElement pageBtn ".concat(o(e)),children:e+1},"page-"+(e+1))))});return c},p=a(38),O=a.n(p),f=a(41);a(49);var x=e=>{const[t,a]=Object(n.useState)([null,null]),[s,l]=t,[c,i]=Object(n.useState)(""),[o,d]=Object(n.useState)({dist:null,workingState:null}),{options:j,condition:m,mapParameters:g,setCondition:h,setPageIndex:u,setMapParameters:b}=e,x=Object(n.useCallback)((()=>{let e=document.getElementById("districtionSelect");v(e),v(e.previousElementSibling,e.value),Object(p.registerLocale)("zh-TW",f.a)}),[]);Object(n.useEffect)((()=>{x(),d({dist:y("districtionSelect"),workingState:y("workingStateSelect")})}),[x]);const v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.value;e.dataset.chosen=t},k=e=>{let t="number"===typeof e?e.toString():e;return 1===t.length&&(t="0"+t),t},N=()=>{b({center:{lat:24.1512535,lng:120.6617366},polygon:null,zoom:12+Math.random()/1e4,selectMarker:g.selectMarker,closeInfoWindow:!0})},y=e=>{let t=document.getElementById(e),a=null;if(null===t)a="\u8f09\u5165\u4e2d";else{if(a=t.value,"workingStateSelect"===e)switch(a){case"0":a="\u5168\u6848\u4ef6";break;case"\u662f":a="\u65bd\u5de5\u4e2d";break;case"\u5426":a="\u672a\u65bd\u5de5"}"districtionSelect"===e&&"0"===a&&(a="\u5168\u5730\u5340")}return a},w=e=>{let t=null;switch(e){case 0:t="\u5168\u6848\u4ef6";break;case"\u662f":t="\u65bd\u5de5\u4e2d";break;case"\u5426":t="\u672a\u65bd\u5de5"}return t};let C=Array.from({length:j.workingState.length},((e,t)=>t)),S=Array.from({length:j.distriction.length},((e,t)=>t));return Object(r.jsxs)("div",{className:"selectors",children:[Object(r.jsxs)("div",{className:"selectContainer",children:[Object(r.jsx)("i",{className:"selectArrow fas fa-chevron-down"}),Object(r.jsxs)("select",{name:"workingState",id:"workingStateSelect",defaultValue:"\u662f",onChange:e=>{let t=m.distriction,a=0===Number(e.target.value)?0:e.target.value,n=null===m.date.start?null:{...m.date.start},s=null===m.date.end?null:{...m.date.end},l=c,r=m.stack;v(e.target),v(e.target.previousElementSibling,e.target.value),d((e=>({...e,workingState:w(a)}))),-1===r.indexOf("workingState")?r.push("workingState"):0===a&&(r=r.filter((e=>"workingState"!==e))),N(),u(0),i(""!==l?"".concat(n.year,"/").concat(k(n.month),"/").concat(k(n.day)," - ").concat(s.year,"/").concat(k(s.month),"/").concat(k(s.day)):""),h({workingState:a,distriction:t,date:{start:null===n?null:{...n},end:null===s?null:{...s}},stack:r})},children:[Object(r.jsx)("option",{value:0,children:"\u5168\u6848\u4ef6"}),C.map((e=>Object(r.jsx)("option",{value:j.workingState[e],children:"\u662f"===j.workingState[e]?"\u65bd\u5de5\u4e2d":"\u672a\u65bd\u5de5"},j.workingState[e])))]}),Object(r.jsx)("span",{children:o.workingState})]}),Object(r.jsxs)("div",{className:"selectContainer",children:[Object(r.jsx)("i",{className:"selectArrow fas fa-chevron-down"}),Object(r.jsxs)("select",{name:"distriction",id:"districtionSelect",defaultValue:"0",onChange:e=>{let t=0===Number(e.target.value)?0:e.target.value,a=m.workingState,n=null===m.date.start?null:{...m.date.start},s=null===m.date.end?null:{...m.date.end},l=c,r=m.stack;v(e.target),v(e.target.previousElementSibling,e.target.value),d((e=>({...e,dist:0===t?"\u5168\u5730\u5340":t}))),-1===r.indexOf("distriction")?r.push("distriction"):0===t&&(r=r.filter((e=>"distriction"!==e))),N(),u(0),i(""!==l?"".concat(n.year,"/").concat(k(n.month),"/").concat(k(n.day)," - ").concat(s.year,"/").concat(k(s.month),"/").concat(k(s.day)):""),h({workingState:a,distriction:t,date:{start:null===n?null:{...n},end:null===s?null:{...s}},stack:r})},children:[Object(r.jsx)("option",{value:0,children:"\u5168\u5730\u5340"}),S.map((e=>Object(r.jsx)("option",{value:j.distriction[e],children:j.distriction[e]},j.distriction[e])))]}),Object(r.jsx)("span",{children:o.dist})]}),Object(r.jsx)(O.a,{value:c,locale:"zh-TW",wrapperClassName:"dateSelectContainer",className:"dateSelect",placeholderText:"\u65e5\u671f\u7bc4\u570d",dateFormat:"yyyy/MM/dd",selectsRange:!0,startDate:s,endDate:l,minDate:new Date(Object.values(j.date.start)),maxDate:new Date(Object.values(j.date.end)),isClearable:!0,shouldCloseOnSelect:!1,onChange:e=>{if(a(e),null!==e[0]&&null===e[1])return void i("".concat(e[0].getFullYear(),"/").concat(k(e[0].getMonth()+1),"/").concat(k(e[0].getDate())," -"));if(null===e[0]&&null===e[1]){let e=m.stack,t=m.distriction,a=m.workingState;return e=e.filter((e=>"date"!==e)),N(),i(""),void h({workingState:a,distriction:t,date:{start:null,end:null},stack:e})}let t=m.distriction,n=m.workingState,s={year:e[0].getFullYear(),month:e[0].getMonth()+1,day:e[0].getDate()},l={year:e[1].getFullYear(),month:e[1].getMonth()+1,day:e[1].getDate()},c=m.stack;-1===c.indexOf("date")&&c.push("date"),N(),u(0),i("".concat(s.year,"/").concat(k(s.month),"/").concat(k(s.day)," - ").concat(l.year,"/").concat(k(l.month),"/").concat(k(l.day))),h({workingState:n,distriction:t,date:{start:{...s},end:{...l}},stack:c})},onFocus:e=>e.target.blur()})]})};var v=e=>{const{closeInfoBlock:t,handleCloseClick:a,isMobile:s}=e,[l,c]=Object(n.useState)(0);let i=Object(n.useMemo)((()=>{let t=[],a=0;if(null!==e.value)return a=e.value.length>1?e.value[l].length:1===e.value.length?e.value[0].length:0,t=Array.from({length:a},((e,t)=>t)),t}),[e.value,l]);const o=t=>{t>e.value.length-1||t<0||(document.getElementById("topAnchor").scrollIntoView(!1),c(t))},d=e=>{let t="";return null===e?t="hide":!0===e?t="close":!1===e&&(t="open"),t};if("loading"===e.value)return Object(r.jsx)("div",{className:"infoBlockContainer",children:Object(r.jsx)("div",{className:"infoBlock",style:{paddingTop:"0",backgroundColor:"#ececec"},children:Object(r.jsx)("div",{className:"loading",children:Object(r.jsx)("i",{className:"fas fa-circle-notch fa-lg"})})})});if(null===e.value)return Object(r.jsx)("div",{className:"infoBlockContainer",children:Object(r.jsx)("div",{className:"infoBlock",children:Object(r.jsxs)("div",{className:"noContent",children:[Object(r.jsx)("div",{className:"exclamationMark",children:Object(r.jsx)("i",{className:"fas fa-exclamation-triangle fa-lg"})}),Object(r.jsx)("div",{children:"\u767c\u751f\u932f\u8aa4\uff0c\u8acb\u7a0d\u5f8c\u5728\u8a66"})]})})});if(0===e.length)return Object(r.jsx)("div",{className:"infoBlockContainer ".concat(d(t)),children:Object(r.jsxs)("div",{className:"infoBlock",children:[Object(r.jsx)(u,{handleCloseClick:a}),Object(r.jsx)("div",{className:"toolbarContainer",children:Object(r.jsx)(x,{options:e.option,condition:e.condition,mapParameters:e.mapParameters,setCondition:e.setCondition,setMapParameters:e.setMapParameters,setPageIndex:c})}),Object(r.jsx)("div",{className:"cardsListContainer",children:Object(r.jsx)("div",{className:"cardsList",children:Object(r.jsx)("div",{className:"noContent",children:"\u6c92\u6709\u7b26\u5408\u689d\u4ef6\u7684\u8cc7\u6599"})})})]})});{let n=Array.from({length:e.value.length},((e,t)=>t));return Object(r.jsx)("div",{className:"infoBlockContainer ".concat(d(t)),children:Object(r.jsxs)("div",{className:"infoBlock",children:[Object(r.jsx)(u,{handleCloseClick:a}),Object(r.jsx)("div",{className:"toolbarContainer",children:Object(r.jsx)(x,{options:e.option,condition:e.condition,setCondition:e.setCondition,setPageIndex:c,mapParameters:e.mapParameters,setMapParameters:e.setMapParameters})}),Object(r.jsx)("div",{className:"cardsListContainer",children:Object(r.jsxs)("div",{className:"cardsList",children:[Object(r.jsx)(b,{pageBtns:n,pageIndex:l,handlePaginationClick:o,isMobile:s}),Object(r.jsx)("div",{id:"topAnchor",style:{marginBottom:"2em"}}),i.map((t=>Object(r.jsx)(h,{value:e.value[l][t],setMapParameters:e.setMapParameters},"card"+(10*l+t+1)))),Object(r.jsx)(b,{pageBtns:n,pageIndex:l,handlePaginationClick:o,isMobile:s})]})})]})})}};var k=e=>{let{closeInfoBlock:t,makerMessage:a,handleCloseClick:n,handleMakerMessageClick:s,userLocation:l,mapParameters:c,setMapParameters:i}=e;return Object(r.jsxs)("div",{className:"infoButtonContainer ".concat(!1!==t&&!0!==a?"open":"close"),children:[Object(r.jsx)("div",{className:"button",onClick:n,children:Object(r.jsx)("i",{className:"fas fa-search fa-lg"})}),Object(r.jsx)("div",{className:"button",onClick:()=>{let e=Math.random()/1e6;i({center:{lat:l.lat+e,lng:l.lng+e},polygon:c.polygon,zoom:c.zoom,selectMarker:c.selectMarker,closeInfoWindow:!1})},style:{display:null===l?"none":""},children:Object(r.jsx)("i",{className:"fas fa-map-marker-alt fa-lg"})}),Object(r.jsx)("div",{className:"button",onClick:()=>{s()},children:Object(r.jsx)("i",{className:"fas fa-info fa-lg"})})]})};var N=e=>{let{makerMessage:t,handleMakerMessageClick:a}=e;return Object(r.jsx)("div",{className:"infoBlockContainer ".concat((e=>{let t="";return null===e?t="hide":!0===e?t="open":!1===e&&(t="close"),t})(t)),children:Object(r.jsxs)("div",{className:"infoBlock maker",children:[Object(r.jsx)(u,{handleMakerMessageClick:a}),Object(r.jsxs)("div",{className:"makerMessage flex",children:[Object(r.jsx)("img",{src:"/Taichung_Road_Construction_Map/img/logo.png",alt:"Kai's logo"}),Object(r.jsxs)("article",{children:[Object(r.jsx)("p",{children:"\u55e8\uff0c\u6211\u662fKai\u3002"}),Object(r.jsx)("p",{children:"\u53f0\u4e2d\u9053\u8def\u65bd\u5de5\u5730\u5716\u662f\u70ba\u4e86\u7df4\u7fd2API\u4e32\u63a5\u6240\u505a\u7684side project\u3002"}),Object(r.jsx)("p",{children:"\u9084\u6709\u5f88\u591a\u7d30\u7bc0\u9700\u8981\u6539\u9032\uff0c\u9084\u6709\u592a\u591a\u592a\u591a\u7684\u77e5\u8b58\u8981\u5b78\u7fd2\u3002\u5b78\u6d77\u7121\u6daf\uff0c\u53ea\u80fd\u7e7c\u7e8c\u7cbe\u9032\u3002"})]}),Object(r.jsx)("div",{}),Object(r.jsxs)("div",{className:"socialMedia",children:[Object(r.jsx)("a",{href:"https://github.com/TKaiC666",target:"_blank",rel:"noreferrer",children:Object(r.jsx)("i",{className:"fab fa-github fa-lg"})}),Object(r.jsx)("a",{href:"https://www.facebook.com/profile.php?id=100002803117493",target:"_blank",rel:"noreferrer",children:Object(r.jsx)("i",{className:"fab fa-facebook fa-lg"})}),Object(r.jsx)("a",{href:"https://www.instagram.com/attifmai/",target:"_blank",rel:"noreferrer",children:Object(r.jsx)("i",{className:"fab fa-instagram fa-lg"})})]})]})]})})};var y=()=>{const[e,t]=Object(n.useState)(null),[a,s]=Object(n.useState)(null),[l,c]=Object(n.useState)(null),[i,o]=Object(n.useState)(null),[d,j]=Object(n.useState)("loading"),[m,h]=Object(n.useState)({workingState:"\u662f",distriction:0,date:{start:null,end:null},stack:["workingState"]}),[u,b]=Object(n.useState)({center:{lat:24.1512535,lng:120.6617366},polygon:null,zoom:12,selectMarker:null,closeInfoWindow:null}),p=Object(n.useCallback)((()=>{let e=null;x(),e=y(428),window.addEventListener("resize",x),window.addEventListener("resize",(()=>y(428))),O(),f(e)}),[]),O=()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition((e=>{(e=>{let t={center:{lat:e.coords.latitude,lng:e.coords.longitude},polygon:null,zoom:12,selectMarker:null,closeInfoWindow:null};b(t),s(t.center)})(e)})):console.log("geolocation is not available")},f=e=>{!1===e&&c(!1)},x=()=>{document.documentElement.style.setProperty("--vh","".concat(window.innerHeight/100,"px"))},y=e=>{let a=null;return a=window.innerWidth<=e,t(a),a},w=e=>{let[t,a,n]=Object.values(e);return t=t.toString(),a=a.toString(),n=n.toString(),1===a.length&&(a="0"+a),1===n.length&&(n="0"+n),parseInt(t+a+n,10)},C=e=>{let t=e,a=[];for(let n=0;n<t.length;n+=10)a.push(t.slice(n,n+10));return a},S=Object(n.useCallback)((()=>{const e=e=>{let t=function(e){const t=(e,t)=>{let a={lat:0,lng:0};return a.lat=Number(e),a.lng=Number(t),a};return{date:{start:{year:Number(e["\u6838\u51c6\u8d77\u65e5"].substring(0,3))+1911,month:Number(e["\u6838\u51c6\u8d77\u65e5"].substring(3,5)),day:Number(e["\u6838\u51c6\u8d77\u65e5"].substring(5))},end:{year:Number(e["\u6838\u51c6\u8fc4\u65e5"].substring(0,3))+1911,month:Number(e["\u6838\u51c6\u8fc4\u65e5"].substring(3,5)),day:Number(e["\u6838\u51c6\u8fc4\u65e5"].substring(5))}},personInCharge:{name:e["\u627f\u8fa6\u4eba"].substring(0,1)+"\u25ef\u25ef"},coordinate:{lat:t(e["\u4e2d\u5fc3\u9edeY\u5750\u6a19"],e["\u4e2d\u5fc3\u9edeX\u5750\u6a19"]).lat,lng:t(e["\u4e2d\u5fc3\u9edeY\u5750\u6a19"],e["\u4e2d\u5fc3\u9edeX\u5750\u6a19"]).lng,polygon:(e=>{if(!/^POLYGON\(\(.*\)\)$/.test(e.replace(/\s/g,"")))return null;return e.replace(/\s/g,"").split("POLYGON((")[1].split("))")[0].split(",").map((e=>{const[t,a]=e.split("24.");return{lat:Number("24."+a),lng:Number(t)}}))})(e["\u65bd\u5de5\u7bc4\u570d\u5750\u6a19"])}}}(e);return{title:e["\u5de5\u7a0b\u540d\u7a31"],distriction:e["\u5340\u57df\u540d\u7a31"],address:e["\u5730\u9ede"],pipeType:e["\u7ba1\u7dda\u5de5\u7a0b\u985e\u5225"],constructionType:e["\u6848\u4ef6\u985e\u5225"],workingState:e["\u662f\u5426\u958b\u5de5"],date:{start:{year:t.date.start.year,month:t.date.start.month,day:t.date.start.day},end:{year:t.date.end.year,month:t.date.end.month,day:t.date.end.day}},applicationNumber:e["\u7533\u8acb\u66f8\u7de8\u865f"],licenseNumber:e["\u8a31\u53ef\u8b49\u7de8\u865f"],applicant:e["\u7533\u8acb\u55ae\u4f4d"],contractor:{name:e["\u5ee0\u5546\u540d\u7a31"],phone:e["\u5ee0\u5546\u96fb\u8a71"]},personInCharge:{name:t.personInCharge.name,phone:e["\u627f\u8fa6\u4eba\u96fb\u8a71"]},coordinate:{lat:t.coordinate.lat,lng:t.coordinate.lng,polygon:t.coordinate.polygon}}};console.time("fetch\u82b1\u8cbb\u6642\u9593"),fetch("https://datacenter.taichung.gov.tw/swagger/OpenData/d5adb71a-00bb-4573-b67e-ffdccfc7cd27").then((e=>{if(console.timeEnd("fetch\u82b1\u8cbb\u6642\u9593"),200===e.status)return e.text();throw new Error("response was not ok.")})).then((t=>{if("["!==t[0])console.error("fetch error : \n",t),j(null);else{let a=(t=>{let a=t,n=[];for(let s=0;s<a.length;s++)n.push(e(a[s]));return n})(JSON.parse(t));j(a)}})).catch((e=>{console.error("fetch error : ",e.message),j(null)}))}),[]);Object(n.useEffect)((()=>{p(),S()}),[p,S]);const M=Object(n.useMemo)((()=>{let e=(e=>{let t=d,a=[];if(null===t||"loading"===t)a=t;else if(3===e.stack.length)a=t.filter((t=>(w(e.date.start)>=w(t.date.start)&&w(e.date.start)<=w(t.date.end)||w(e.date.end)>=w(t.date.start)&&w(e.date.end)<=w(t.date.end))&&t.workingState===e.workingState&&t.distriction===e.distriction));else if(2===e.stack.length)if(-1!==e.stack.indexOf("date")){let n=e.stack[1-e.stack.indexOf("date")];a=t.filter((t=>(w(e.date.start)>=w(t.date.start)&&w(e.date.start)<=w(t.date.end)||w(e.date.end)>=w(t.date.start)&&w(e.date.end)<=w(t.date.end))&&t[n]===e[n]))}else a=t.filter((t=>t.workingState===e.workingState&&t.distriction===e.distriction));else 1===e.stack.length&&(0!==e.distriction?a=t.filter((t=>t.distriction===e.distriction)):null!==e.date.start&&null!==e.date.end?a=t.filter((t=>w(e.date.start)>=w(t.date.start)&&w(e.date.start)<=w(t.date.end)||w(e.date.end)>=w(t.date.start)&&w(e.date.end)<=w(t.date.end))):0!==e.workingState&&(a=t.filter((t=>t.workingState===e.workingState))));return a})(m);return e}),[m,d]),T=Object(n.useMemo)((()=>{let e={workingState:[],distriction:[],date:{start:{},end:{}}};if(m.stack.length>=0&&"loading"!==d&&null!==d){e.date.start={...d[0].date.start},e.date.end={...d[0].date.end};for(let t of d)-1===e.workingState.indexOf(t.workingState)&&e.workingState.push(t.workingState),-1===e.distriction.indexOf(t.distriction)&&e.distriction.push(t.distriction),w(t.date.start)<=w(e.date.start)&&(e.date.start={...t.date.start}),w(t.date.end)>=w(e.date.end)&&(e.date.end={...t.date.end})}return e}),[m.stack,d]),P=()=>{let e=l;e=null!==e&&!e,c(e)},I=()=>{let e=i;e=null===i||!e,o(e)};if("loading"===d||null===d)return Object(r.jsxs)("div",{children:[Object(r.jsx)(g,{constructionsData:null,mapParameters:u,setMapParameters:b}),Object(r.jsx)(v,{value:d})]});{let t=null;return t=0===m.distriction&&null===m.date.start&&null===m.date.end&&0===m.workingState?d:M,Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)(g,{constructionsData:C(t),mapParameters:u,closeInfoBlock:l,setMapParameters:b,makerMessage:i,isMobile:e,userLocation:a}),Object(r.jsx)(k,{closeInfoBlock:l,makerMessage:i,handleCloseClick:P,handleMakerMessageClick:I,userLocation:a,mapParameters:u,setMapParameters:b}),Object(r.jsx)(v,{value:C(t),length:t.length,option:T,condition:m,mapParameters:u,closeInfoBlock:l,isMobile:e,handleCloseClick:P,setCondition:h,setMapParameters:b}),Object(r.jsx)(N,{makerMessage:i,handleMakerMessageClick:I})]})}};a(97),a(98);c.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(y,{})}),document.getElementById("root"))},97:function(e,t,a){}},[[101,1,2]]]);
//# sourceMappingURL=main.f1416025.chunk.js.map