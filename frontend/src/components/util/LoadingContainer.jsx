import React from "react"
import loader from '../../assets/images/notes.gif'

const LoadingContainer = () => {

    return (
        <div className="loading-container">
            <img src={loader} alt="" />
        </div>
    )
}

export default LoadingContainer;
