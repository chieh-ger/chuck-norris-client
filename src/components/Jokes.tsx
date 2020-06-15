// Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

// Components
import JokeItem from './JokeItem';
import { singular, multi } from '../actions';
import { LoadingText, ButtonContainer, DescriptionText } from './styled-components';

export default function Jokes() {
    const dispatch = useDispatch();
    const showType = useSelector((state: any) => state.type);
    const category = useSelector((state: any) => state.category);
    
    const QUERY = gql`
        query GetJoke {
            randomJoke {
                id
                value
            }
        }
    `;
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

    const { loading: randomJoke, error: randomJokeError, data: randomJokeResponse, refetch } = useQuery(QUERY, { variables: { category }});
    const [ getJoke, { loading, error, data }] = useLazyQuery(QUERY_CATEGORY, { variables: { category }});
    const [ getAllJokes, { loading: loadingList, error: listError, data: listResponse }] = useLazyQuery(QUERY_ALL, { variables: { category }});

    if (randomJoke) return <LoadingText>Getting a random joke...</LoadingText>;
    if (loading) return <LoadingText>Getting a "{ category }" joke...</LoadingText>;
    if (loadingList) return <LoadingText>Getting a list of "{ category }" jokes...</LoadingText>;
    if (randomJokeError) 
        return (
            <div className="alert alert-primary" role="alert">
                An error has ocurred getting a random joke. { randomJokeError }
            </div>
        )
    if (error) 
        return (
            <div className="alert alert-primary" role="alert">
                An error has ocurred getting a random "{ category }" joke. { error }
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
                    <button disabled={category === 'NONE' ? true : false} className="btn btn-warning" onClick={() => {getJoke(); dispatch(singular())}}>Get a "{ category }" joke!</button>
                    <button disabled={category === 'NONE' ? true : false} className="btn btn-info" onClick={() => {getAllJokes(); dispatch(multi())}}>Get All!</button>
                </ButtonContainer>
                {
                    data || listResponse ? <DescriptionText>Below shows a random joke retrieved based on category:<b>"{category}"</b></DescriptionText> : null
                }
                {
                    showType === 'single' && data ? <JokeItem key={data.randomJokeByCategory.id} joke={data.randomJokeByCategory.value}/> : null
                }
                {
                    showType === 'multi' && listResponse ? listResponse.randomCategoryList.result.map((joke: any) => (
                        <JokeItem key={joke.id} joke={joke.value}/>
                    )) : null
                }
                <DescriptionText>Below shows a random joke</DescriptionText>
                <JokeItem key={randomJokeResponse.randomJoke.id} joke={randomJokeResponse.randomJoke.value}></JokeItem>
                <ButtonContainer>
                    <button className="btn btn-success" onClick={() => refetch()}>Get another random joke!</button>
                </ButtonContainer>
            </div>
        </div>
    )
}
