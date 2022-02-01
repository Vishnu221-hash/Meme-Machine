import "./header.scss";
const Header = (props) => {
  return (
    <div className="row header_container">
      <div className="circle_logo"> Meme Machine </div>{" "}
      <h1 className="header_title col-9"> Meme Machine </h1>{" "}
      <h2 className="header_title_2 col-1">Hi! {props.loginId}</h2>
      <button onClick={props.logOut}>Logout</button>
    </div>
  );
};

export default Header;
