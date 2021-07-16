import CloseButton from "./CloseButton";
const MakerMessage = (props)=>{

    let {makerMessage, handleMakerMessageClick} = props;

    const getCSSState = (condition)=>{
        let state = '';
        if(condition === null) state = 'hide';
        else if(condition === true) state = 'open';
        else if(condition === false) state = 'close';
        return state;
    }

    return(
        <div className={`infoBlockContainer ${getCSSState(makerMessage)}`}>
        <div className='infoBlock maker'>
            <CloseButton handleMakerMessageClick={handleMakerMessageClick}/>
            <div className='makerMessage flex'>
                <img src={process.env.PUBLIC_URL+'img/logo.png'} alt={'Kai\'s logo'}/>
                <article>
                    <p>嗨，我是Kai。</p>
                    <p>台中道路施工地圖是為了練習API串接所做的side project。</p>
                    <p>還有很多細節需要改進，還有太多太多的知識要學習。學海無涯，只能繼續精進。</p>
                </article>
                <div/>
                <div className='socialMedia'>
                    <a href='https://github.com/TKaiC666' target='_blank' rel="noreferrer">
                        <i className="fab fa-github fa-lg"/>
                    </a>
                    <a href='https://www.facebook.com/profile.php?id=100002803117493' target='_blank' rel="noreferrer">
                        <i className="fab fa-facebook fa-lg"/>
                    </a>
                    <a href='https://www.instagram.com/attifmai/' target='_blank' rel="noreferrer">
                        <i className="fab fa-instagram fa-lg"/>
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
}

export default MakerMessage;