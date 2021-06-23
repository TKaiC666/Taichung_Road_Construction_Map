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
            else length =  props.value[0].length;

            arr = Array.from({length: length},(_,index) => index);
            return(arr);
    },[props.value, pageIndex]);

    const handleClick = (x)=>{
        if(x > props.value.length-1 || x < 0) return;
        setPageIndex(x);
    }

    console.log('InfoBlock : page index : '+pageIndex+', cardsNum : '+cardsNum);

    if(props.value === null){
        return(
            <div className='infoBlockContainer'>
            <div className='infoBlock'>
                <div className='cardListContainer'>
                <div className='cardsList'>
                    <Card value={'loading'}/>
                    <Card value={'loading'}/>
                    <Card value={'loading'}/>
                </div>
                </div>
            </div>
            </div>
        );
    }
    else{
        let pageBtns = Array.from({length: props.value.length},(_,index)=>index);

        return(
            <div className='infoBlockContainer'>
            <div className='infoBlock'>
                <div className='toolbarContainer'>
                    <Selectors
                        options={props.option}
                        condition={props.condition}
                        setCondition={props.setCondition}
                        setPageIndex={setPageIndex}
                    />
                    <Pagination
                        // margin={'marginBottom-2'}
                        pageBtns={pageBtns}
                        pageIndex={pageIndex}
                        handleClick={handleClick}
                    />
                </div>
                <div className='cardListContainer'>
                <div className='cardsList'>
                {
                    cardsNum.map((i)=>(
                        <Card key={'card'+(pageIndex*10+i+1)}
                            value={props.value[pageIndex][i]}
                            anchor={i}
                            setConstructionLocation={props.setConstructionLocation}
                            setConstructionPolygon = {props.setConstructionPolygon}
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