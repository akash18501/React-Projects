import "./App.css";
import { useEffect, useState } from "react";
import Post from "./components/Post";
import PostLoading from "./components/Postloading";
import { axiosInstance } from "./api";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    console.log("compoent did mounted");
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("http://127.0.0.1:8000/api/");
        console.log("response is first");
        setPosts(response.data);
        console.log("this is the response", response);
        setLoading(false);
        console.log("response is third");
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="App">
      {loading === false ? <Post posts={posts} /> : <PostLoading />}
    </div>
  );
}

export default App;
