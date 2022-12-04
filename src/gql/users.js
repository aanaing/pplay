import { gql } from "@apollo/client";

export const USERS = gql`
  query Users($limit: Int!, $offset: Int!, $search: String) {
    users(
      limit: $limit
      offset: $offset
      order_by: { created_at: desc }
      where: {
        _or: [{ username: { _ilike: $search } }, { phone: { _ilike: $search } }]
      }
    ) {
      address
      created_at
      disabled
      id
      image_url
      username
      phone
      updated_at
    }
    users_aggregate(
      where: {
        _or: [{ username: { _ilike: $search } }, { phone: { _ilike: $search } }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const USER = gql`
  query User_By_Pk($id: uuid!) {
    users_by_pk(id: $id) {
      addresses {
        id
        address
        username
        phone
        created_at
      }
      created_at
      disabled
      id
      image_url
      username
      phone
      updated_at
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Update_Users_By_Pk($id: uuid!, $disabled: Boolean!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { disabled: $disabled }) {
      created_at
      disabled
      id
      image_url
      username
      phone
      updated_at
    }
  }
`;
