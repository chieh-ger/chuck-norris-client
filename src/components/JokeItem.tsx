import React from 'react'

export default function JokesItem({joke}: any) {
    return (
        <div style={{marginTop: '10px', padding: '10px', background: '#f6f6f6', textAlign: 'center', borderRadius: '10px', border: '1px solid #eee'}}>
            <p>{joke}</p>
        </div>
    )
}
