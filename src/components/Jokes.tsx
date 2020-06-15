// Import Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

import JokeItem from './JokeItem';
import { singular, multi } from '../actions';
import { LoadingText, ButtonContainer } from './styled-components';

export default function Jokes() {
    const dispatch = useDispatch();
    const showType = useSelector((state: any) => state.type);
    const category = useSelector((state: any) => state.category);
    
    const QUERY_CATEGORY = gql`
        query GetJoke($category: String) {
            randomJokeByCategory(category: $category) {
                id
                value
            }
        }
    `;
    const QUERY_ALL = gql`
        query GetAllJokes($category: String) {
            randomCategoryList(query: $category) {
                result {
                    id
                    value
                }
            }
        }
    `;

    const [ getJoke, { loading, error, data }] = useLazyQuery(QUERY_CATEGORY, {variables: {category}});
    const [ getAllJokes, { loading: loadingList, error: listError, data: response }] = useLazyQuery(QUERY_ALL, {variables: {category}});

    if (loading) return <LoadingText>Getting a {category} joke...</LoadingText>;
    if (loadingList) return <LoadingText>Getting a list of {category} jokes...</LoadingText>;
    if (error) 
        return (
            <div className="alert alert-primary" role="alert">
                An error has ocurred getting a joke
            </div>
        )
    if (listError) 
        return (
            <div className="alert alert-primary" role="alert">
                An error has ocurred getting a list of jokes
            </div>
        )

    return (
        <div className="row">
            <div className="col-md-12" style={{marginTop: '10px'}}>
                <ButtonContainer>
                    <button disabled={category === 'NONE' ? true : false} className="btn btn-dark" onClick={() => {getJoke(); dispatch(singular())}}>Get a joke!</button>
                    <button disabled={category === 'NONE' ? true : false} className="btn btn-dark" onClick={() => {getAllJokes(); dispatch(multi())}}>Get All!</button>
                </ButtonContainer>
                <p>Below shows a random joke retrieved based on category: "{category}"</p>
                {
                    showType === 'single' && data ? <JokeItem key={data.randomJokeByCategory.id} joke={data.randomJokeByCategory.value}/> : null
                }
                {
                    showType === 'multi' && response ? response.randomCategoryList.result.map((joke: any) => (
                        <JokeItem key={joke.id} joke={joke.value}/>
                    )) : null
                }
            </div>
        </div>
    )
}
