const CloseButton = (props)=>{

    let handleCloseClick = props.handleCloseClick;

    return(
        <div className='closeButtonContainer'>
            <div className='closeButton' onClick={handleCloseClick}>
                <i className="fas fa-times fa-lg"/>
            </div>
        </div>
    );
}

export default CloseButton;