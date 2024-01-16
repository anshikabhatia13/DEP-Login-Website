import { Link } from 'react-router-dom';
import logo from '.././logo1.png';
import './header.css'; 

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#"
}) {
  return (
    <div className="header-container flex flex-col items-center" >
      <div className="header-logo flex justify-center">
        <img src={logo} alt="Logo" />
      </div>
      <h2 className="header-heading mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="header-paragraph mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph} {' '}
        <Link to={linkUrl} className="header-link font-medium text-purple-600 hover:text-purple-500">
          {linkName}
        </Link>
      </p>
    </div>
  )
}
