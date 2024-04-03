"use client";
import '../globals.css';
import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    email: string;
    password: string;
    username: string;
}

export default function signup() {
    const [user, setUser] = useState<User>({ email: "", password: "", username: "" });
    const [buttonDisabled, setButtonDisable] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok && response.status === 201) {
                toast.success('signup successfully!', { position: 'top-center', hideProgressBar: true });
            } else {
                toast.error(response.statusText, { position: 'top-center', hideProgressBar: true });
            }
        } catch (error: any) {
            toast.error(error.message, { position: 'top-center', hideProgressBar: true });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
        const hasWhiteSpace = /\s/.test(user.password);
        if (hasWhiteSpace) {
            toast.error("can not use white space!", { position: 'top-center', hideProgressBar: true })
            setButtonDisable(false);
        }
    }, [user]);

    return (
         <div className={styles.mainconatiner}>
            <div className={styles.signupInnerContainer}>
                <div className={styles.signupInsideItem}>
                    <h1>{loading ? "Processing ..." : "signup"}</h1>
                    <label>username</label>
                    <input
                        className={styles.inputField}
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username" />
                    <label>email</label>
                    <input
                        className={styles.inputField}
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email" />
                    <label>password</label>
                    <input
                        className={styles.inputField}
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password" />

                    <button onClick={onSignup} disabled={buttonDisabled}>{loading ? "Processing ..." : "Signup"}</button>
                    <Link href="/signin" className={styles.loginLink}>SignIn page</Link >
                </div>
            </div >
            <ToastContainer />
        </div>
    )
}

