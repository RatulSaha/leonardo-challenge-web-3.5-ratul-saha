import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int!) {
    locations(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;