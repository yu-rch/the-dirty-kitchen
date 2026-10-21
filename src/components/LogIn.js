import React from 'react'

const LogIn = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = '/home';
  };

  return (
    <div>

      <div className="wrapper">
        <div className="login-wrapper">
            <div className="login-header">Login</div>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-wrapper">
                <input type="text" id="user" className="input-field" required/>
                <label htmlFor="user" className="label">Username</label>
                <i className="bx bx-user icon"></i>
                </div>
                <div className="input-wrapper">
                <input type="password" id="pw" className="input-field" required/>
                <label htmlFor="pw" className="label">Password</label>
                <i className="bx bx-lock-alt icon"></i>
                </div>
                <div className="login-check">
                <div className="remember">
                    <input type="checkbox" id="remember-me"/>
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="forgot">
                    <a href="#">Forgot password?</a>
                </div>
                </div>
                <div className="input-wrapper">
                <button type="submit" className="input-login">Login</button>
                </div>
                <div className="register">
                <span>Don't have an account? <a href="#">Register</a>
                </span>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default LogIn
