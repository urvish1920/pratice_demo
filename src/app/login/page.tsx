"use client";
import React, { useEffect, useState } from "react";
import Styles  from "./login.module.css"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';

interface User {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {


    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisable] = useState<boolean>(false);

    const onLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(user),
            });

            if (response.ok && response.status === 201) {
                window.location.href = '/'
            } else {
                console.log(response);
                toast.error("Invalid email or password", { position: 'top-center', hideProgressBar: true });
            }
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message, { position: 'top-center', hideProgressBar: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user]);

    return (
        <div className={Styles.Container}>
            <div className={Styles.innarcontainer}>
                <div className={Styles.outer}>
                    <h1>{loading ? "Processing" : "Login"}</h1>
                    <label>email</label>
                    <input
                        className={Styles.input}
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email" />
                    <label>password</label>
                    <input
                        className={Styles.input}
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password" />

                    <button className="input" onClick={onLogin} disabled={buttonDisabled}>{loading ? "Processing ..." : "Login"}</button>
                    <Link href="/signup" className={Styles.loginlink}>signup page</Link >
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
