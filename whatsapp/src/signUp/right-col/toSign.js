import { Link } from 'react-router-dom'
function ToSign() {
    return (
        <span id="register-button">
            <p id="register-text">
                Registered?&nbsp;
                <Link to="/">
                    Click here
                </Link>&nbsp;to sign in.
            </p>
        </span>
    )
}
export default ToSign