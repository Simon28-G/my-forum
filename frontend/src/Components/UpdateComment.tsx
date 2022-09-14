import { Formik } from "formik";
import {
  useGetAllCommentQuery,
  useUpdateCommentMutation,
} from "src/store/rtk/comments";
import { CreateCommentForm } from "src/Types/CreateCommentForm";
import * as Yup from "yup";
import { MyTextInput } from "./Auth";

type UpdateCommentProps = {
  idPost: string;
  idComment: string;
  setShowForm: () => void;
};
export const UpdateComment = ({
  idPost,
  idComment,
  setShowForm,
}: UpdateCommentProps) => {
  const { data: records, error } = useGetAllCommentQuery();
  const [updatePost] = useUpdateCommentMutation();
  const comment = records![idPost].find((comment) => comment._id === idComment);

  return (
    <>
      {comment && (
        <Formik
          initialValues={{ text: comment!.text }}
          validationSchema={Yup.object({
            text: Yup.string()
              .matches(/^[\x00-\x7F]*$/)
              .required("Required"),
          })}
          onSubmit={(values, { setFieldError, setSubmitting }) => {
            const patch: CreateCommentForm = {
              _id: idComment,
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
              <h1 className="text-center text-3xl">Update comment</h1>
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
