import React, { useEffect, useState } from "react";
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from './DB/firebase'
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const Dashboard = () => {
    const [inputtext, setinputtext] = useState('')
    const [summary, setsummary] = useState('')
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [isLogedin, setLogedin] = useState(false);


    const SigninWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("user signin", user);
        } catch (error) {
            console.log("error during sign in", error)
        }

    }

    const handleLogOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth)
            alert("You have been logged out")

        } catch (error) {
            console.log("error logging out", error)
        }
    }


    const saveSumm = async (text, summary) => {
        if(!isLogedin){
            console.error("user not logged in. can't save data")
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if(!user){
            console.error("user is not authenticated. can't save data")
            return;
        }

        const sumRef = collection(db, "users", user.uid,"summaries");
        try {
            const q = query(sumRef, orderBy("timestamp", "asc"))
            const querysnapshot = await getDocs(q);

            if (querysnapshot.size >= 3) {
                const oldsnap = querysnapshot.docs[0];
                await deleteDoc(doc(db, "users", user.id, "summaries", oldsnap.id))
            }
            await addDoc(sumRef, { text, summary, timestamp: Date.now() })
        }
        catch (error) {
            console.error("error saving to Firestore", error.message)
        }

    }



    const haddleSummarize = async () => {
        if (!isLogedin) {
            seterror("Please log in to use the summarization tool.");
            return;
        }

        if (!inputtext.trim()) {
            seterror("plese enter text to summarize")
            return;
        }
        setloading(true)
        seterror("")
        try {
            const response = await fetch('http://13.211.6.27:8000/summarize', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputtext }),
            });

            if (!response.ok) {
                throw new Error("Failed to summarize the text. Please try again later.");
            }
            const data = await response.json();
            setsummary(data.summary)

            await saveSumm(inputtext, data.summary)

        } catch (error) {
            seterror(error.message)
            setsummary("")
        }
        finally {
            setloading(false)
        }
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogedin(true)
            }
            else {
                setLogedin(false)
            }
        });
        return () => unsubscribe();
    })



    return (
        <div className=" vh-100">
            <nav className="bg-info d-flex justify-content-between" style={{ height: '60px' }}>
                <div className="bg-info w-25 my-2 d-flex justify-content-center align-items-center ">
                    <p className="w-25 fw-bold fs-5 d-flex justify-content-center align-items-center" style={{ marginTop: '16px', fontFamily: 'Playwrite HR Lijeva Guides', fontWeight: "400", fontStyle: "normal" }}>
                        TEXTSUMM
                    </p>
                </div>
                <div className="d-flex justify-content-center" style={{ width: "30vw" }}>
                    {isLogedin && (
                        <button
                            className="w-25 btn btn-dark my-2 mx-4"
                            onClick={() => navigate("/History")}
                        >
                            View History
                        </button>
                    )}
                    {!isLogedin && (
                        <div className=" pt-3 me-4">
                            <p>Login for more features</p>
                        </div>
                    )}
                    {!isLogedin && (
                        <button
                            className="w-25 btn btn-light my-2"
                            onClick={SigninWithGoogle}
                        >
                            Sign In
                        </button>
                    )}
                    {isLogedin && (
                        <button
                            className="w-25 btn btn-light my-2"
                            onClick={handleLogOut}
                        >
                            Logout
                        </button>
                    )}

                </div>
            </nav>
            <div className="mt-5">
                <h1 className="text-center mb-5" style={{ fontFamily: "Dosis" }}>Text Summarization Tool</h1>
                <div className="d-flex flex-column align-items-center">
                    <textarea cols="30" rows="10" className="w-75" placeholder="Enter text to summarize"
                        value={inputtext}
                        onChange={(e) => setinputtext(e.target.value)}>
                    </textarea>
                    <button className="w-25 btn btn-secondary mt-3"
                        onClick={haddleSummarize}
                        disabled={loading}>
                        {loading ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            "Summarize"
                        )}
                    </button>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center mt-5 bg-info bg-opacity-25 mx-5 px-5">
                    {error && <p className="text-danger">{error}</p>}
                    <h5>Summary</h5>
                    <p>{summary}</p>
                </div>

            </div>
        </div>
    )

}
export default Dashboard;