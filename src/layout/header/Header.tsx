import { Link } from "react-router-dom";
import './header.css'
function Header() {
  return (
    <div className="header">
         <Link to={'home'} className="link logo">CompanyLogo</Link>
         <Link to={'home'} className="link logo">Home</Link>
         <Link to={'list'} className="link logo">List</Link>
    </div>
  )
}

export default Header