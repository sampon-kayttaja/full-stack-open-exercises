import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";

const HomePage = ({ blogs }) => {
  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default HomePage;
