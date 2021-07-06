const Pagination = (props)=>{
    //必須變數from Card list，依賴Card list
    //不能用[]
    const {margin ,pageBtns, pageIndex} = props;
    //PageButtons有自己的handleClick，變數名稱有衝突
    //另外用一個變數儲存從CardList傳來的handleClick，而不解構賦值
    const handleBtnClick = props.handleClick;
    let returnElement;
    let minPageIndex = 0, maxPageIndex = pageBtns.length - 1;

    const focusPage = (i)=>{
        if(i===pageIndex) return 'bgColor_mintGreen';
    }

    if(pageBtns.length === 1) return null;
    if(pageBtns.length > 7){
        if(pageIndex - minPageIndex > 3 && maxPageIndex - pageIndex > 3){
            let pages = Array.from({length:3},(_,index)=>index+pageIndex-1);
            returnElement = 
            <div className={`pagination unselectable ${margin}`}>
                <div className='pageElement pageArrow' key={`prePage`}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </div>
                <div key={'page-'+minPageIndex+1}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageElement pageBtn ${focusPage(minPageIndex)}`}>
                    {minPageIndex+1}
                </div>
                <div className='pageElement dot'/>
                {
                    pages.map((i)=>(
                        <div key={'page'+(i+1)}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageElement pageBtn ${focusPage(i)}`}>
                            {i+1}
                        </div>
                    ))
                }
                <div className='pageElement dot'/>
                <div key={'page-'+maxPageIndex+1}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageElement pageBtn ${focusPage(maxPageIndex)}`}>
                    {maxPageIndex+1}
                </div>
                <div className='pageElement pageArrow' key={`nextPage`}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </div>
            </div>
        }else if(pageIndex - minPageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index);
            returnElement = 
            <div className={`pagination unselectable ${margin}`}>
                <div className='pageElement pageArrow' key={`prePage`}
                    style={pageIndex===minPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </div>
                {
                    pages.map((i)=>(
                        <div key={'page-'+(i+1)}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageElement pageBtn ${focusPage(i)}`}>
                            {i+1}
                        </div>
                    ))
                }
                <div className='pageElement dot'/>
                <div key={'page-'+maxPageIndex+1}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageElement pageBtn ${focusPage(maxPageIndex)}`}>
                    {maxPageIndex+1}
                </div>
                <div className='pageElement pageArrow' key={`nextPage`}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </div>
            </div>
        }else if(maxPageIndex - pageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index+maxPageIndex-4);
            returnElement = 
            <div className={`pagination unselectable ${margin}`}>
                <div className='pageElement pageArrow' key={`prePage`}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </div>
                <div key={'page-'+minPageIndex+1}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageElement pageBtn ${focusPage(minPageIndex)}`}>
                    {minPageIndex+1}
                </div>
                <div className='pageElement dot'/>
                {
                    pages.map((i)=>(
                        <div key={'page-'+(i+1)}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageElement pageBtn ${focusPage(i)}`}>
                            {i+1}
                        </div>
                    ))
                }
                <div className='pageElement pageArrow' key={`nextPage`}
                    style={pageIndex===maxPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </div>
            </div>
        }
    }
    else{
        returnElement = 
        <div className={`pagination unselectable ${margin}`}>
            {
                pageBtns.map((i)=>(
                    <div key={'page-'+(i+1)}
                        onClick={()=>{handleBtnClick(i)}}
                        className={`pageElement pageBtn ${focusPage(i)}`}>
                        {i+1}
                    </div>
                ))
            }
        </div>
    }
    return(returnElement);
}

export default Pagination;