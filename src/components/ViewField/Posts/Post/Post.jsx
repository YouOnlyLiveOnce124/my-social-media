import s from "./Post.module.css";
import postICO from "./../../../../assets/imgs/free-icon-bubble-11081590.png";

const Post = (props) => {
  return (
    <div className={s.main_div}>
      <img src={postICO} alt="message" />
      <div className={`${s.item} ${s.field_div}`}>{props.message}</div>{" "}
      <span className={s.like}>{props.likes} - like </span>
    </div>
  );
};

export default Post;
