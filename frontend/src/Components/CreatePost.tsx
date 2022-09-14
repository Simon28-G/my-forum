import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { insert } from "src/services/post";
import { useCreatePostMutation } from "src/store/rtk/post";
import { CreatePostForm } from "src/Types/CreateFormPost";
import { Post } from "src/Types/Post";
import * as Yup from "yup";
import { MyTextInput } from "./Auth";
import { Header } from "./Header";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [createPost] = useCreatePostMutation();

  return (
    <>
      <Header />
      <Formik
        initialValues={{ title: "", text: "" }}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(4, "Must be 4 characters or more")
            .matches(/^[\x00-\x7F]*$/)
            .required("Required"),
          text: Yup.string()
            .matches(/^[\x00-\x7F]*$/)
            .required("Required"),
        })}
        onSubmit={async (values, { setFieldError, setSubmitting }) => {
          const post: CreatePostForm = {
            title: values.title,
            text: values.text,
          };
          await createPost(post);
          navigate("/home");
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form
            className="p-12 bg-white rounded-xl drop-shadow-lg space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-center text-3xl">Add post</h1>
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
    </>
  );
};
