
const InfoButton = ()=>{

    const handleClick = ()=>{
        if(window.innerWidth <= 428) alert('smul');
        else alert('big');
    }

    return(
        <div className='infoButtonContainer'>
            <div className='infoButton' onClick={handleClick}>
                <i className="fas fa-search fa-lg"/>
            </div>
        </div>
    );
}

export default InfoButton;