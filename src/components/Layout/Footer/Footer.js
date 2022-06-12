


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";

// Common footer component
const Footer = (props) => {

  const history = useHistory();

  
  
    return (
      <>
        <ToastContainer />
        <footer class="footer">
            <div class="container">
                <div class="row">
                        <div class="copy-right">
                            <p>© All Copy right reserved by Start-UP HUB</p>
                            <p>Design and develped by Blue Screen</p>

                        </div>
                </div>
            </div>
        </footer>
      </>
    );
  };
  
  export default Footer;
  