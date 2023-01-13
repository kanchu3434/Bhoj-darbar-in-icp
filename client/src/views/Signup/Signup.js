import React from "react";
import './Signup.css'
// import './Signupimg/signup-image.png'
function Signup(){
    return (
        <div>
            <div className="container">
                <div className="mycard">
                    <div className="row">
                        <div className="col-md-6">
                         <div className="signup-left-conatiner">
                            <from className="signup-form text-center">
                                <header>create new acount</header>
                                <div className="from-group">
                                    <i className="fas fa-user"></i>
                                    <input type="text"placeholder="username" className="signup-inputbox" id="userName" required/>
                                    <div className="invalid-feedback">
                                        please fill out this field
                                    </div>
                                </div>

                                <div className="from-group">
                                  <i className="fas fa-envelope"></i>
                                  <input className="signup-inputbox" type="text" placeholder="enter your email" id="email" required/>
                                </div>
                                <div className="from-group">
                                  <i className="fas fa-lock"></i>
                                  <input className="signup-inputbox" type="password" placeholder="enter your password" id="password" required/>
                                </div>
                                <div className="from-group">
                                  <lable>
                                    <input id="chek_1" name="check_1" type="checkbox" required/>
                                    <small>I read and agree to terms condition </small>
                                    <div className="invalid-feedback">you must check the box</div>
                                  </lable>
                                  
                                </div>
                                <input type="submit" className="signup-button" value="create account"></input>
                            </from>
                         </div>
                        </div>

                        <div className="col-md-6">
                            <div className="signup-right-conatiner">
                                <div>
                                    {/* <img src="signup-image"/> */}
                                </div>
                                <div className="box"><header>Hello Word</header>
                                 <p>ipsum loreum ufjdfu amet adispicing</p>
                                 <input className="butt_out" type="button" value="learn more"/>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup