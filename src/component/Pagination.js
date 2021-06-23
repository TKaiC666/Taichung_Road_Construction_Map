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
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                <a  key={'page-'+minPageIndex+1} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageBtn ${focusPage(minPageIndex)}`}>
                    {minPageIndex+1}
                </a>
                <div className='pageBtn'></div>
                {
                    pages.map((i)=>(
                        <a key={'page'+(i+1)} href={'#firstCard'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${focusPage(i)}`}>
                            {i+1}
                        </a>
                    ))
                }
                <div className='pageBtn'></div>
                <a key={'page-'+maxPageIndex+1} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageBtn ${focusPage(maxPageIndex)}`}>
                    {maxPageIndex+1}
                </a>
                <a  className='pageBtn' key={`nextPage`} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }else if(pageIndex - minPageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#firstCard'}
                    style={pageIndex===minPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                {
                    pages.map((i)=>(
                        <a key={'page-'+(i+1)} href={'#firstCard'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${focusPage(i)}`}>
                            {i+1}
                        </a>
                    ))
                }
                <div className='pageBtn'></div>
                <a key={'page-'+maxPageIndex+1} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageBtn ${focusPage(maxPageIndex)}`}>
                    {maxPageIndex+1}
                </a>
                <a  className='pageBtn' key={`nextPage`} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }else if(maxPageIndex - pageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index+maxPageIndex-4);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                <a key={'page-'+minPageIndex+1} href={'#firstCard'}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageBtn ${focusPage(minPageIndex)}`}>
                    {minPageIndex+1}
                </a>
                <div className='pageBtn'></div>
                {
                    pages.map((i)=>(
                        <a key={'page-'+(i+1)} href={'#firstCard'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${focusPage(i)}`}>
                            {i+1}
                        </a>
                    ))
                }
                <a  className='pageBtn' key={`nextPage`} href={'#firstCard'}
                    style={pageIndex===maxPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }
    }
    else{
        returnElement = 
        <div className={`pagination ${margin}`}>
            {
                pageBtns.map((i)=>(
                    <a key={'page-'+(i+1)} href={'#firstCard'}
                        onClick={()=>{handleBtnClick(i)}}
                        className={`pageBtn ${focusPage(i)}`}>
                        {i+1}
                    </a>
                ))
            }
        </div>
    }
    return(returnElement);
}

export default Pagination;