import { useMemo, useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import Selectors from './Selectors';

const InfoBlock = (props)=>{

    console.log('InfoBlock : start');

    //目前所在頁數
    const [pageIndex, setPageIndex] = useState(0);
    //目前頁數內的卡片數量
    let cardsNum = useMemo(()=>{
        console.log('InfoBlock : start useMemo()')
            let arr = [];
            let length = 0;

            if(props.value===null) return;
            else if(props.value.length>1) length =  props.value[pageIndex].length;
            else if(props.value.length === 1) length =  props.value[0].length;
            else length = 0;

            arr = Array.from({length: length},(_,index) => index);
            return(arr);
    },[props.value, pageIndex]);

    const handleClick = (x)=>{
        if(x > props.value.length-1 || x < 0) return;
        document.getElementById('topAnchor').scrollIntoView();
        setPageIndex(x);
    }

    console.log('InfoBlock : page index : '+pageIndex+', cardsNum : '+cardsNum);

    if(props.value === 'loading'){
        return(
            <div className={`infoBlockContainer ${(window.innerWidth <= 428) && 'unvisible'}`}>
            <div className='infoBlock'>
                <div className='cardListContainer'>
                <div className='cardsList'>
                </div>
                </div>
            </div>
            </div>
        );
    }else if(props.value === null){
        return(
            <div className={`infoBlockContainer ${(window.innerWidth <= 428) && 'unvisible'}`}>
            <div className='infoBlock'>
                <div className='cardListContainer'>
                <div className='cardsList'>
                    <div className='noContent'>
                        {'伺服器回傳錯誤，\n請稍後在試。'}
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
    }else if(props.value.length === 0){
        return(
            <div className={`infoBlockContainer ${(window.innerWidth <= 428) && 'unvisible'}`}>
            <div className='infoBlock'>
                <div className='toolbarContainer'>
                    <Selectors
                        options={props.option}
                        condition={props.condition}
                        mapParameters={props.mapParameters}
                        setCondition={props.setCondition}
                        setMapParameters={props.setMapParameters}
                        setPageIndex={setPageIndex}
                    />
                </div>
                <div className='cardsListContainer'>
                <div className='cardsList'>
                    <div className='noContent'>
                        沒有符合條件的資料
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
    }
    else{
        let pageBtns = Array.from({length: props.value.length},(_,index)=>index);
        console.log('InfoBlock : render start');
        return(
            <div className={`infoBlockContainer ${(window.innerWidth <= 428) && 'unvisible'}`}>
            <div className='infoBlock'>
                <div className='toolbarContainer'>
                    <Selectors
                        options={props.option}
                        condition={props.condition}
                        mapParameters={props.mapParameters}
                        setCondition={props.setCondition}
                        setPageIndex={setPageIndex}
                        setMapParameters={props.setMapParameters}
                    />
                    <Pagination
                        // margin={'marginBottom-2'}
                        pageBtns={pageBtns}
                        pageIndex={pageIndex}
                        handleClick={handleClick}
                    />
                </div>
                <div className='cardsListContainer'>
                <div className='cardsList'>
                    <div id='topAnchor' style={{marginBottom:'2em'}}/>
                {
                    cardsNum.map((i)=>(
                        <Card key={'card'+(pageIndex*10+i+1)}
                            value={props.value[pageIndex][i]}
                            mapParameters={props.mapParameters}
                            setMapParameters={props.setMapParameters}
                        />
                    ))
                }
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default InfoBlock;