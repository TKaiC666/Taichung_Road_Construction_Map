const InfoButton = (props)=>{

    let {closeInfoBlock,handleCloseClick} = props;

    return(
        <div className='infoButtonContainer' style={{display:closeInfoBlock ? 'block' : 'none'}}>
            <div className='button' onClick={handleCloseClick}>
                <i className="fas fa-search fa-lg"/>
            </div>
        </div>
    );
}

export default InfoButton;