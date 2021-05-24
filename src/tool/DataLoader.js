

let DataLoader = () =>{
    const httpRequest = new XMLHttpRequest();
    const dataUrl = 'https://datacenter.taichung.gov.tw/swagger/OpenData/863064b3-7678-437e-9161-8dcda3d95ab7';
    let data;

    function sendRequest(){
        httpRequest.overrideMimeType('application/json');
        httpRequest.onprogress = function(event){
            console.log('loading...');
        };

        httpRequest.onload = readyStateChange;
        httpRequest.open('GET',dataUrl,true);
        httpRequest.send();
    }

    function readyStateChange(){
        if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
            //renderData();
            console.log('store data');
            data = JSON.parse(httpRequest.responseText);
            console.log(data[0]);
            // renderCard(data[0]);
        }else{
            console.warn('狀態異常,readyState:'+httpRequest.readyState+' HTTP狀態碼:'+httpRequest.status);
        }
    }
}

export default DataLoader;