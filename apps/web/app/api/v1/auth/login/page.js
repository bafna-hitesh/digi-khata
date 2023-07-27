// app/api/v1/auth/login

export default function Page() {
  return (<>
        <div>
            <a href="/api/v1/auth/login/zerodha"><button>Login with Zerodha</button></a>
            <br/><br/>
            <a href="/api/v1/auth/login/upstox"><button>Login with Upstox</button></a>
            <br/><br/>
            <a href="/api/v1/auth/login/angelone"><button>Login with Angel One</button></a>
            <br/><br/>
            <a href="/api/v1/auth/login/icicidirect"><button>Login with ICICI Direct</button></a>
            <br/><br/>
            <a href="/api/v1/auth/login/5paisa"><button>Login with 5 Paisa</button></a>
            <br/><br/>
            <a href="/api/v1/auth/login/iifl"><button>Login with IIFL</button></a>
        </div>
    </>
  )
}
