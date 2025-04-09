import React from 'react'

const LogIn = () => {
  return (
    <div>

      <div className="wrapper">
        <div className="login-wrapper">
            <div className="login-header">Login</div>
            <div className="login-form">
                <div className="input-wrapper">
                <input type="text" id="user" class="input-field" required/>
                <label for="user" class="label">Username</label>
                <i class="bx bx-user icon"></i>
                </div>
                <div class="input-wrapper">
                <input type="password" id="pw" class="input-field" required/>
                <label for="pw" class="label">Password</label>
                <i class="bx bx-lock-alt icon"></i>
                </div>
                <div class="login-check">
                <div class="remember">
                    <input type="checkbox" id="remember-me"/>
                    <label for="remember-me">Remember me</label>
                </div>
                <div class="forgot">
                    <a href="#">Forgot password?</a>
                </div>
                </div>
                <div class="input-wrapper">
                <input type="submit" class="input-login" value="Login"/>
                </div>
                <div class="register">
                <span>Don't have an account? <a href="#">Register</a>
                </span>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default LogIn
