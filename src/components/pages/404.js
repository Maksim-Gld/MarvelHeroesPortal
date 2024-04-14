import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Page404 = () => {
    return (
        <div style={{ 'textAlign': 'center' }}>
            <ErrorMessage />
            <p><b>Page doesn't exist</b></p>
            <br />
            <Link style={{ 'textDecoration': 'underline' }} to="/">
                <b>Back to main page</b>
            </Link>
        </div >
    )
}

export default Page404;