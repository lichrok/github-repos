// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';
import { SEARCH_FOR_REPOS } from '../../api/queries';
import RepositoryItem from '../RepositoryItem';
import Loader from '../Loader';
import { RepositoryListProps, SearchDataProps } from '../../types';

function RepositoryList({ searchTerm }: RepositoryListProps) {
	const [debouncedSearchTerm] = useDebounce(searchTerm, 600);
	const { data, loading, error }:SearchDataProps = useQuery(
		SEARCH_FOR_REPOS,
		{ variables: { search_term: debouncedSearchTerm } }
	);

	if (loading) {
		return <Loader/>
	}

	if (error) {
		return <p className="is-error">Error: {error}</p>
	}

	if (!data.search.repositoryCount) {
		return <p>No repositories.</p>
	}

	return (
		<div className="repository-list">
			{data.search.edges.map(repo => <RepositoryItem repo={repo} key={repo.node.id}/>)}
		</div>
	)
}

export default RepositoryList;
