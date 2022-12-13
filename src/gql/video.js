import { gql } from "@apollo/client";

//get all videos
export const ALL_VIDEOS = gql`
  query MyQuery($search: String) {
    video_list(where: { video_title: { _ilike: $search } }) {
      main_type
      package_type
      video_title
      created_at
      duration
      id
      promotion
      promotions
      sub_type
      target_period
      thumbnail_image_url
      updated_at
      video_url
    }
  }
`;

//update video
export const UPDATE_VIDEOS = gql`
  mutation MyMutation($id: uuid!, $video_title: String!, $video_url: String!) {
    update_video_list_by_pk(
      pk_columns: { id: $id }
      _set: { video_title: $video_title, video_url: $video_url }
    ) {
      created_at
      duration
      id
      main_type
      package_type
      promotion
      promotions
      sub_type
      target_period
      thumbnail_image_url
      updated_at
      video_title
      video_url
    }
  }
`;

//Delete Video
export const DELETE_VIDEOS = gql`
  mutation MyMutation($id: uuid!) {
    delete_video_list_by_pk(id: $id) {
      id
    }
  }
`;
