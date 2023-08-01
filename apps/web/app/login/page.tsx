export default function Login() {
    return (<>
          <div>
              <a href="http://localhost:3000/api/auth/login/zerodha"><button>Login with Zerodha</button></a>
              <br/><br/>
              <a href="http://localhost:3000/api/auth/login/upstox"><button>Login with Upstox</button></a>
              <br/><br/>
              <a href="http://localhost:3000/api/auth/login/angelone"><button>Login with Angel One</button></a>
              <br/><br/>
              <a href="http://localhost:3000/api/auth/login/icicidirect"><button>Login with ICICI Direct</button></a>
              <br/><br/>
              <a href="http://localhost:3000/api/auth/login/5paisa"><button>Login with 5 Paisa</button></a>
              <br/><br/>
              <a href="http://localhost:3000/api/auth/login/iifl"><button>Login with IIFL</button></a>
          </div>
      </>
    )
}