
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <div>
    <button><Link to={"api/auth/signup"}>SignUp</Link></button>

    <button><Link to={"api/auth/login"}>Login</Link></button>
    </div>
    </>
  )
}

export default Home