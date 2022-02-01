import { useState } from "react";
import "./login.scss";
const LoginPage = (props) => {
  const [creds, setCreds] = useState({ userName: "", password: "" });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };
  const submit = (type) => {
    var data = JSON.stringify(creds);
    console.log(data);
    fetch("http://localhost:7777/" + type, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res, res.body);
        if (res.status === 200) {
          props.login(true, creds.userName);
        } else if (res.status === 201) {
          window.alert(res.statusText);
        } else {
          window.alert(
            "User Name or Password is incorrect. Please register if you are a new User."
          );
        }
      })
      .catch((error) => window.alert(error.msg));
  };

  return (
    <div className="login-conainer">
      <div className="login">
        <div className="input-row">
          <span>
            <label> User Name: </label>
            <input
              value={creds.userName}
              name="userName"
              onChange={handelChange}
            ></input>
          </span>
          <span>
            <label> Password: </label>
            <input
              value={creds.password}
              name="password"
              type={"password"}
              onChange={handelChange}
            ></input>
          </span>
        </div>
        <div className="button-row">
          <button onClick={() => submit("login")}> Login </button>
          <button onClick={() => submit("register")}> Register </button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
