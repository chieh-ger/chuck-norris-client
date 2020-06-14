import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

import JokesItem from '../components/JokesItem';
import { singular, multi } from '../actions';

export default function Jokes() {
    const dispatch = useDispatch();
    const showType = useSelector((state: any) => state.type);
    const category = useSelector((state: any) => state.category);
    
    const QUERY_CATEGORY = gql`
        query GetJoke($category: String) {
            randomByCategory(category: $category) {
                id
                value
            }
        }
    `;
    const QUERY_ALL = gql`
        query GetAllJokes($category: String) {
            jokeList(query: $category) {
                result {
                    id
                    value
                }
            }
        }
    `;

    const [ getJoke, { loading, error, data }] = useLazyQuery(QUERY_CATEGORY, {variables: {category}});
    const [ getAllJokes, { loading: loadingList, error: listError, data: response }] = useLazyQuery(QUERY_ALL, {variables: {category}});

    if (loading) return <p>Getting a {category} joke...</p>;
    if (loadingList) return <p>Getting a list of {category} jokes...</p>;
    if (error) return `An error has ocurred`;
    if (listError) return `An error has ocurred`;
    return (
        <div className="row">
            <div className="col-md-12" style={{marginTop: '10px'}}>
                <p>Below shows a random joke retrieved based on category: "{category}"</p>
                <button className="btn btn-dark" onClick={() => {getJoke(); dispatch(singular())}}>Get a joke!</button>
                <button className="btn btn-dark" onClick={() => {getAllJokes(); dispatch(multi())}}>Get All!</button>
                {
                    showType === 'single' && data ? <JokesItem key={data.randomByCategory.id} joke={data.randomByCategory.value}/> : null
                }
                {
                    showType === 'multi' && response ? response.jokeList.result.map((joke: any) => (
                        <JokesItem key={joke.id} joke={joke.value}/>
                    )) : null
                }
            </div>
        </div>
    )
}
