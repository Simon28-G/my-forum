import { Formik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { insert } from "src/services/post";
import { useCreateCommentMutation } from "src/store/rtk/comments";
import { useCreatePostMutation } from "src/store/rtk/post";
import { CreateCommentForm } from "src/Types/CreateCommentForm";
import { CreatePostForm } from "src/Types/CreateFormPost";
import { Post } from "src/Types/Post";
import * as Yup from "yup";
import { MyTextInput } from "./Auth";
import { Header } from "./Header";

export const CreateComment = () => {
  const navigate = useNavigate();
  const [createComment] = useCreateCommentMutation();
  const location = useLocation();
  const postId = location.state as string;

  return (
    <>
      <Header />
      <Formik
        initialValues={{ text: "" }}
        validationSchema={Yup.object({
          text: Yup.string()
            .matches(/^[\x00-\x7F]*$/)
            .required("Required"),
        })}
        onSubmit={async (values, { setFieldError, setSubmitting }) => {
          const comment: CreateCommentForm = {
            post: postId,
            text: values.text,
          };
          createComment(comment);
          navigate("/home");
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form
            className="p-12 bg-white rounded-xl drop-shadow-lg space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-center text-3xl">Add comment</h1>
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
