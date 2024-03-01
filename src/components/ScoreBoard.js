import React from 'react'

const ScoreBoard = ({ score, xPlaying }) => {
    
    const [xScores, oScores] = score;

    return (
        <div className='scoreBoard'>
            <span className={`score x-score ${!xPlaying && "inactive"}`}>X - {xScores}</span>
            <span className={`score o-score ${xPlaying && "inactive"}`}>O - {oScores}</span>
        </div>
    )
}

export default ScoreBoard