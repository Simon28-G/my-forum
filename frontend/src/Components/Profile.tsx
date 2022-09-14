import jwtDecode from "jwt-decode";
import moment from "moment";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useAppSelector } from "src/store";
import { useGetAllCommentQuery } from "src/store/rtk/comments";
import {
  useGetAllPostQuery,
  useGetBiggestContributorsQuery,
  useGetCountAllPostsQuery,
  useGetCountLikesByPostsQuery,
  useGetLikesByWeekQuery,
  useGetPostsByWeekQuery,
} from "src/store/rtk/post";
import { Post } from "src/Types/Post";
import { string } from "yup";
import { Header } from "./Header";

export const Profile = () => {
  const { data: countAllPosts } = useGetCountAllPostsQuery();
  const { data: countAllLikes } = useGetCountLikesByPostsQuery();
  const { data: postsWeek } = useGetPostsByWeekQuery();
  const { data: likesWeek } = useGetLikesByWeekQuery();
  const { data: contributors } = useGetBiggestContributorsQuery();
  console.log(contributors);
  return (
    <>
      <Header />
      <h1>Nombre total posts publiés : {countAllPosts}</h1>
      <h1>
        Nombre de likes total que ces posts lui ont rapporté : {countAllLikes}
      </h1>
      <h1>Nombre de posts fait depuis 7 jours : {postsWeek}</h1>
      <h1>Nombre de likes sur les posts depuis 7 jours : {likesWeek}</h1>
      <Chart
        chartType="PieChart"
        data={contributors}
        options={{ title: "Biggest contributors" }}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
};
