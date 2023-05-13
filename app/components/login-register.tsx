import React, {useState} from 'react';
import Locale from '@/app/locales';
import styles from './Login-register.module.scss';
import {IconButton} from "@/app/components/button";
import CloseIcon from "@/app/icons/close.svg";
import {Path} from "@/app/constant";
import {useNavigate} from "react-router-dom";
import {useMobileScreen} from "@/app/utils";

function LoginForm(props: { toggleForm: () => void }) {
    const isMobileScreen = useMobileScreen();
    return (
        <div className={`${styles.formContainer} ${isMobileScreen ? styles.signInContainerP : styles.signInContainer}`}>
            <form action="house/mainHouse">
                <h1>{Locale.LoginRegister.login}</h1>
                <span>{Locale.LoginRegister.login1}</span>
                <input type="text" placeholder={Locale.LoginRegister.phoneTip}/>
                <input type="password" placeholder={Locale.LoginRegister.pwdInputTip}/>
                <div className={styles.tips}>
                    <a href="#">{Locale.LoginRegister.forgetPwd}</a>
                    <a onClick={props.toggleForm}>{Locale.LoginRegister.registerNow}</a>
                </div>
                <button>{Locale.LoginRegister.login}</button>
            </form>
        </div>
    );
}

function RegisterForm(props: { toggleForm: () => void }) {
    const isMobileScreen = useMobileScreen();
    return (
        <div className={`${styles.formContainer} ${isMobileScreen ? styles.signUpContainerP : styles.signUpContainer}`}>
            <form action="user/addUser">
                <h1>{Locale.LoginRegister.reg}</h1>
                <span>{Locale.LoginRegister.tip}</span>
                <input type="text" id="phone" name="phone" placeholder={Locale.LoginRegister.phoneTip}/>
                <input type="password" id="Password" name="password" placeholder={Locale.LoginRegister.pwdTip}/>
                <input type="password" id="Password2" name="password2" placeholder="确认密码"/>
                {isMobileScreen ? (<div className={styles.regTips}>
                    <span onClick={props.toggleForm}>{Locale.LoginRegister.hasAcc}{Locale.LoginRegister.loginNow}</span>
                </div>) : (<span/>)}
                <button>{Locale.LoginRegister.register}</button>
            </form>
        </div>
    );
}

function Header(props: { isLoginForm: boolean }) {
    const navigate = useNavigate();
    return (
        <div className="window-header">
            <div className="window-header-title">
                <div className="window-header-main-title">
                    {props.isLoginForm ? Locale.LoginRegister.login : Locale.LoginRegister.reg}
                </div>
                <div className="window-header-sub-title">
                    {props.isLoginForm ? Locale.LoginRegister.loginTip : Locale.LoginRegister.registerTips}
                </div>
            </div>
            <div className="window-actions">
                <div className="window-action-button">
                    <IconButton
                        icon={<CloseIcon/>}
                        onClick={() => navigate(Path.Home)}
                        bordered
                        title={Locale.Settings.Actions.Close}
                    />
                </div>
            </div>
        </div>
    );
}

export function LoginRegister() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const isMobileScreen = useMobileScreen();

    function toggleForm() {
        setIsLoginForm(prev => !prev);
    }

    return (
        <div className={styles.home}>
            <Header isLoginForm={isLoginForm}/>
            <div className={styles.login}>
                <div className={`${styles.bookdown} ${isLoginForm ? '' : styles.rightPanelActive}`} id="bookdown">
                    {isLoginForm ? <LoginForm toggleForm={toggleForm}/> : <RegisterForm toggleForm={toggleForm}/>}
                    {isMobileScreen ? '' : (<div className={styles.overlayContainer}>
                        <div className={styles.overlay}>
                            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                                <h1>{Locale.LoginRegister.hasAcc}</h1>
                                <p>{Locale.LoginRegister.loginTip}</p>
                                <button className={styles.ghost} id="signIn"
                                        onClick={toggleForm}>{Locale.LoginRegister.login}</button>
                            </div>
                            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                                <h1>{Locale.LoginRegister.noAcc}</h1>
                                <p>{Locale.LoginRegister.registerTips}</p>
                                <button className={styles.ghost} id="signUp"
                                        onClick={toggleForm}>{Locale.LoginRegister.register}</button>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
}
