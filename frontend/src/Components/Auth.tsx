import axios from "axios";
import { ErrorMessage, Formik, useField, FieldHookConfig } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login, signUp } from "src/services/user";
import store, { useAppSelector } from "src/store";
import { loginUser } from "src/store/slices/user";
import * as Yup from "yup";

interface Props {
  signUp: boolean;
}

type MyTextInputProps = FieldHookConfig<string> & {
  label: string;
};
export const MyTextInput = ({ label, ...props }: MyTextInputProps) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <input
          type={props.type}
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-grey-darker"
          {...field}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const Auth = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state.user.status);
  return (
    <div
      className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-purple-700 to-rose-500"
    >
      <h1>{status}</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(4, "Must be 4 characters or more")
            .matches(/^[\x00-\x7F]*$/)
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(4, "Must be 4 characters or more")
            .matches(/^[\x00-\x7F]*$/)
            .required("Required"),
        })}
        onSubmit={(values, { setFieldError, setSubmitting }) => {
          if (props.signUp) {
            signUp(values.username, values.password)
              .then(() => {
                navigate("/home");
              })
              .catch((error) => {
                setFieldError(
                  error.response?.data.field,
                  error.response?.data.error
                );
                setSubmitting(false);

                return;
              });
          } else {
            dispatch(
              loginUser({
                username: values.username,
                password: values.password,
              })
            );
            navigate("/home");
            setSubmitting(false);
            return;
          }
        }}
      >
        {(formik) => (
          <form
            className="p-12 bg-white rounded-xl drop-shadow-lg space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-center text-3xl">My Forum</h1>
            <MyTextInput label="Username" name="username" />
            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="*****************"
            />
            <button
              className="block bg-blue-400 hover:bg-blue-500 active:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
            <Link
              className="block text-blue-400 hover:text-blue-500 active:text-blue-700"
              to="/signup"
            >
              Sign up here !
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};
