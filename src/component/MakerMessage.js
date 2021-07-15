import CloseButton from "./CloseButton";
const MakerMessage = (props)=>{

    let {makerMessage, handleMakerMessageClick} = props;

    return(
        <div className={`infoBlockContainer ${makerMessage ? 'open':'close'}`}>
        <div className='infoBlock'>
            <CloseButton handleMakerMessageClick={handleMakerMessageClick}/>
            <div className='cardsListContainer'>
            <div className='cardsList'>
                <div className='makerMessage'>
                    <img src={process.env.PUBLIC_URL+'img/logo.png'} alt={'Kai\'s logo'}/>
                    <article>
                        <p>Hi, this is Kai.</p>
                        <p></p>
                    </article>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default MakerMessage;