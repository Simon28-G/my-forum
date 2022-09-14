import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, insert, update } from "src/services/post";
import { useGetAllPostQuery, useUpdatePostMutation } from "src/store/rtk/post";
import { CreatePostForm } from "src/Types/CreateFormPost";
import * as Yup from "yup";
import { MyTextInput } from "./Auth";

type UpdatePostProps = {
  idPost: string;
  setShowForm: () => void;
};

export const UpdatePost = ({ idPost, setShowForm }: UpdatePostProps) => {
  const { data, error } = useGetAllPostQuery();
  const [updatePost] = useUpdatePostMutation();
  const post = data![idPost];

  return (
    <>
      {post && (
        <Formik
          initialValues={{ title: post!.title, text: post!.text }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(4, "Must be 4 characters or more")
              .matches(/^[\x00-\x7F]*$/)
              .required("Required"),
            text: Yup.string()
              .matches(/^[\x00-\x7F]*$/)
              .required("Required"),
          })}
          onSubmit={(values, { setFieldError, setSubmitting }) => {
            const patch: CreatePostForm = {
              _id: idPost,
              title: values.title,
              text: values.text,
            };
            updatePost(patch);
            setShowForm();
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form
              className="p-12 bg-white rounded-xl drop-shadow-lg space-y-5"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="text-center text-3xl">Update post</h1>
              <MyTextInput label="title" name="title" />
              <MyTextInput label="text" name="text" type="text" />
              <button
                className="block bg-blue-400 hover:bg-blue-500 active:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
