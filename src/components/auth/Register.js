import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Login.css"


const Register = props => {
    const email = useRef()
    const userName = useRef()
    const lastName = useRef()
    const password = useRef()
    const firstName = useRef()
    const address = useRef()
    const phoneNumber = useRef()
    const verifyPassword = useRef()
    const { register } = useSimpleAuth()

    const handleRegister = (e) => {
        e.preventDefault()

        const newUser = {
            "username": userName.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value,
            "address": address.current.value,
            "phone_number": phoneNumber.current.value,
            "email": email.current.value,
            "password": password.current.value
        }

        //I believe I now need to get all the user data and search for the user whose name matches the one just created by this component.
        // fetch all, find the one that, set the localStorage to the ID of that object

        register(newUser)
                .then(() => APImanager.all("users"))
                .then(r => r.find(user => user.username === this.state.username))
                .then(matchedUserInfo => localStorage.setItem("userId", matchedUserInfo.id))
                .then(() => this.setState({userId: localStorage.getItem("userId")}))
                .then(() => {
                    props.history.push({
                        pathname: "/"
                    })
                })
    }

    const UsersList = props => {
        const [users, setUsers] = useState([])
        //When evoked getProducts perform a fetch, server Django responds with
        // a json string, convert it to an object then send the data to setProducts. The products
        // state variable is now updated and the state of the component has been changed.
      
        const getUsers = () => {
          fetch(`http://localhost:8000/users`, {
            method: "GET",
            headers: {
              // gives you back the format you request data
              Accept: "application/json",
            }
          })
            .then(response => response.json())
            .then(setUsers)
        }
      
        useEffect(getUsers, [])

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register for Bangazon</h1>
                <fieldset>
                    <label htmlFor="userName"> Username </label>
                    <input ref={userName} type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        placeholder="Address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input ref={phoneNumber} type="number"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="###-###-####"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}
export default withRouter(Register)