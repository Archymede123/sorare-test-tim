import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

export const useGQLQuery = (
  key: string,
  query: any,
  variables: any,
  config = {}
) => {
  const endpoint = "/api/graphql";

  const graphQLClient = new GraphQLClient(endpoint);

  const fetchData = async () => await graphQLClient.request(query, variables);

  return useQuery(key, fetchData, config);
};
