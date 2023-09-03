import logoLight from '../assets/img/light.svg';
import logoDark from '../assets/img/dark.svg';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Header() {
  const { _id } = useParams(); // Get the user ID from the URL
  const isAuthenticated = false; // Replace this with your actual authentication check (from local storage, Redux, etc.)

  const handleTutorial = async () => {
    if (!isAuthenticated) {
      // If the user is not authenticated, do nothing or display a message.
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login first',
      }); // Or you can show a message to prompt the user to log in
    }
  };
  return (
    <header className="header-global" id="home">
      <nav id="navbar-main" aria-label="Primary navigation" className="navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-light navbar-theme-secondary">
        <div className="container position-relative">
          <a className="navbar-brand mr-lg-4" href="./index.html">
            <img className="navbar-brand-dark" src={logoLight} alt="Logo light" />
            <img className="navbar-brand-light" src={logoDark} alt="Logo dark" />
          </a>
          <div className="navbar-collapse collapse mr-auto" id="navbar_global">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="./index.html">
                    <img src={logoDark} alt="Logo dark" />
                  </a>
                </div>
                <div className="col-6 collapse-close">
                  <a href="#navbar_global" className="fas fa-times" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" title="close" aria-label="Toggle navigation"></a>
                </div>
              </div>
            </div>
            <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
              <li className="nav-item">
                <a href="http://127.0.0.1:5173/Tutorials" className="nav-link">
                  Tutorials
                </a>
              </li>
              <li className="nav-item">
                <a href={`http://127.0.0.1:5173/UserTutorials/${_id}`} onClick={handleTutorial} className="nav-link">
                  My Tutorials
                </a>
              </li>
              <li className="nav-item">
                <a href="#faq" className="nav-link">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a href="#download" className="nav-link">
                  Download
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <a href="http://127.0.0.1:5173/login" className="btn btn-outline-soft d-none d-md-inline mr-md-3 animate-up-2">Sign In</a>

            <a href="http://127.0.0.1:5173/SignUp" className="btn btn-md btn-tertiary text-white d-none d-md-inline animate-up-2">Sign Up</a>
            <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
