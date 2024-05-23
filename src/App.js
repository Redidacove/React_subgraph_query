import React from "react";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    useQuery,
} from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://gateway-arbitrum.network.thegraph.com/api/[<your-api-key>]/subgraphs/id/4TbqVA8p2DoBd5qDbPMwmDZv3CsJjWtxo8nVSqF2tA9a",

    cache: new InMemoryCache(),
});

const QUERY = gql`
	query MyQuery {
        tokens(first: 5) {
          id
          name
          symbol
          decimals
        }
        rewardTokens(first: 5) {
          id
          token {
            id
          }
          type
        }
      }
`;

function MyComponent() {
    const { data, error, loading } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;

    console.log(JSON.stringify(data, null, 2));
    return (
        <div>
            <p>Data fetched successfully</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

function App() {
    return (
        <ApolloProvider client={client}>
            <MyComponent />
        </ApolloProvider>
    );
}

export default App;