import { useNavigate } from "react-router-dom";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

const AddNewBlog = ({ user, addBlog }) => {
  const navigate = useNavigate();

  const onSubmit = async (blogObject) => {
    const success = await addBlog(blogObject);
    if (success) {
      navigate("/");
    }
  };

  return <div>{user && <BlogForm handleSubmit={onSubmit} />}</div>;
};

export default AddNewBlog;
