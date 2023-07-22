import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {

  //TEMP DATA
  const posts = [
    {
      id: 1,
      name: "Mario Mario",
      userId: 1,
      profilePic: "/assets/person/mario.png",
      desc: "Its a me a Mario so Lets a go!!",
      img: "/assets/person/peach.webp"
    },
    {
      id: 2,
      name: "Mario Mario",
      userId: 1,
      profilePic: "/assets/person/mario.png",
      desc: "Its a me a Mario so Lets a go!!",
    },
  ];

  return (
    <div className="posts">
      {posts.map(post => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  );
};

export default Posts;