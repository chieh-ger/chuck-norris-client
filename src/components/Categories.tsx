// Import Libraries
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

// Import Components
import { setCategory } from '../actions'
import { LoadingText } from './styled-components';

const GET_CATEGORIES = gql`
    query GetCategories {
        categories
    }
`;
export default function Joke(props: any) {
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const dispatch = useDispatch();
    if(loading) return <LoadingText>Retrieving List of Categories</LoadingText>;
    if (error)
        return (
            <div className="alert alert-primary" role="alert">
                An error has ocurred getting categories
            </div>
        );
    return (
        <div className="row">
            <div className="col-md-12">
                <select className="form-control form-control-s" defaultValue="none" name="categories" onChange={e => dispatch(setCategory(e.target.value))}>
                    <option disabled value="none">-- Select a category --</option>
                    {
                        data.categories.map((category: string) => (
                            <option key={category} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}