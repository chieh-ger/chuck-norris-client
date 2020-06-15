// Libraries
import React from 'react'

// Components
import { JokeContainer } from './styled-components';

export default function JokesItem({joke}: any) {
    return (
        <JokeContainer>
            <p>{joke}</p>
        </JokeContainer>
    )
}
