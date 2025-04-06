import LoginForm from "../components/auth/LoginForm"
import "../styles/pages/classic.css"

function LoginPage() {
  return (
    <div className="login-page">
   
          <div className="login-box">
            <LoginForm/>
        
      </div>
    </div>
  )
}

export default LoginPage;