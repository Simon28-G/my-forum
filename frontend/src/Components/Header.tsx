import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "src/store";
import { userSlice } from "src/store/slices/user";
import { DropDown } from "./DropDown";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between p-2 m-2 list-none">
      <button
        className="block bg-green-200 hover:bg-green-500 active:bg-green-700 text-black font-bold rounded text-lg"
        onClick={() => navigate("/home")}
      >
        MY FORUM
      </button>
      <div className="flex gap-20">
        <DropDown
          key="user"
          title={"USER"}
          namesMenu={["Profile"]}
          paths={["/profile"]}
        />  
        <DropDown
          key="post"
          title={"POST"}
          namesMenu={["Create your post"]}
          paths={["/post"]}
        />

        {store.getState().user.access_token === "" ? (
          <button
            className="block bg-blue-400 hover:bg-blue-500 active:bg-blue-700 text-black font-bold rounded"
            onClick={() => navigate("/login")}
          >
            Connection
          </button>
        ) : (
          <button
            className="block bg-blue-400 hover:bg-blue-500 active:bg-blue-700 text-black font-bold rounded"
            onClick={() => {
              dispatch(userSlice.actions.clearState());
              navigate("/home");
            }}
          >
            Disconnection
          </button>
        )}
      </div>
    </div>
  );
};
