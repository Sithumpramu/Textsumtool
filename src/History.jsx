import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import db from './DB/firebase';
import { getAuth } from "firebase/auth";

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchLastSummaries = async () => {
        setLoading(true);
        setError("");

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setError("You need to log in to view your history.");
            setLoading(false);
            return;
        }

        const sumRef = collection(db, "users" ,user.uid, "summaries");
        try {
            const q = query(sumRef, orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);

            const summaries = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setHistory(summaries);
        } catch (err) {
            setError("Failed to fetch summaries. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLastSummaries();
    }, []);

    return (
        <div className="vh-100 bg-info bg-opacity-25">

            <div>
                <h3 className="text-center mb-5 pt-3">History (Last 3 Summaries)</h3>
                <div className="d-flex flex-column align-items-center bg-info bg-opacity-25">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {history.map((item) => (
                        <div key={item.id} className="text-start w-75 p-2 mb-4 border rounded bg-light">
                            <p><strong>Text:</strong> {item.text}</p>
                            <p><strong>Summary:</strong> {item.summary}</p>
                        </div>
                    ))}
                    {!loading && !error && history.length === 0 && (
                        <p className="text-muted">No summaries available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
