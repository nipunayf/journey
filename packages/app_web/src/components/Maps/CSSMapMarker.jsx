import './marker.css'

export default function CSSMapMarker({isSelected = false}) {
    return(
        <div>
            <div className='pin bounce'/>
            {isSelected && <div className='pulse'/>}
        </div>
    );
}
