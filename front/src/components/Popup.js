import './Popup.css'

const Popup = ({ type }) => {
    if (type === 'offer')
        return (
            <div className='popup-container'>
                Offer
            </div>
        )
}

export default Popup