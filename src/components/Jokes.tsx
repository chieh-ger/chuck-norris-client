import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import JokesItem from '../components/JokesItem';
import { useSelector } from 'react-redux';

let isList: boolean = false;

export default function Jokes({category}: any) {
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
    const { loading, error, data, refetch } = useQuery(QUERY_CATEGORY, {variables: {category}, skip: !category});
    const [ getAllJokes, { loading: loadingList, data: response }] = useLazyQuery(QUERY_ALL, {variables: {category}});
    // console.log(data);
    console.log(response);
    // console.log(isList);
    if (loading) return <p>Getting a {category} joke...</p>;
    if (loadingList) return <p>Getting a list of {category} jokes...</p>;
    if (error) return `An error has ocurred`;
    if (!data) return null;
    return (
        <div className="row">
            <div className="col-md-12" style={{marginTop: '10px'}}>
                <p>Below shows a random joke retrieved under "{category}"</p>
                <button className="btn btn-dark" onClick={() => {refetch(); isList = false}}>Get Another!</button>
                <button className="btn btn-dark" onClick={() => {getAllJokes(); isList = true}}>Get All!</button>
                {
                    !isList ? 
                    <JokesItem key={data.randomByCategory.id} joke={data.randomByCategory.value}/> :
                    response.jokeList.result.map((joke: any) => (
                        <JokesItem key={joke.id} joke={joke.value}/>
                    ))
                }
            </div>
        </div>
    )
}
