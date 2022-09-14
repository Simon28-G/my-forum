import { replace } from "formik";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./Components/Auth";
import { Home } from "./Components/Home";
import { CreatePost } from "./Components/CreatePost";
import { UpdatePost } from "./Components/UpdatePost";
import { useCallback, useState } from "react";
import { Post } from "./Types/Post";
import { CreateComment } from "./Components/CreateComment";
import { UpdateComment } from "./Components/UpdateComment";
import { Profile } from "./Components/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Auth signUp={false} />}></Route>
        <Route path="/signup" element={<Auth signUp={true} />}></Route>
        <Route path="/post" element={<CreatePost />}></Route>
        <Route path="/comment" element={<CreateComment />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
