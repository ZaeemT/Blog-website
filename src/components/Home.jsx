import { useState, useEffect } from "react";
import BlogList from "./BlogList";


const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
                if (res != ok){     // This is for if there is fault in response while the server or network is fine.
                    throw Error('Could not fetch data for that resource.');
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {     // This for displaying network error message.
                isPending(false);
                setError(err.message);
            });
    }, []);


    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading....</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </div>
    );
}
 
export default Home;