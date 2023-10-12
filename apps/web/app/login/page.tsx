const Login = () => {
  return (
    <div>
      <a href='http://localhost:5010/auth/login/zerodha'>
        <button type='button'>Login with Zerodha</button>
      </a>
      <br />
      <br />
      <a href='http://localhost:3000/api/auth/login/upstox'>
        <button type='button'>Login with Upstox</button>
      </a>
      <br />
      <br />
      <a href='http://localhost:3000/api/auth/login/angelone'>
        <button type='button'>Login with Angel One</button>
      </a>
      <br />
      <br />
      <a href='http://localhost:3000/api/auth/login/icicidirect'>
        <button type='button'>Login with ICICI Direct</button>
      </a>
      <br />
      <br />
      <a href='http://localhost:3000/api/auth/login/5paisa'>
        <button type='button'>Login with 5 Paisa</button>
      </a>
      <br />
      <br />
      <a href='http://localhost:3000/api/auth/login/iifl'>
        <button type='button'>Login with IIFL</button>
      </a>
    </div>
  );
};

export default Login;
