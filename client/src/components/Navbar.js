import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-wrapper flex items-center p-3 justify-between">
        <div className="brand-wrapper w-1/2">
          <Link to="/">
            <img
              src="data:image/png;base64,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"
              alt="logo-img"
            />
          </Link>
        </div>
        <div>
          <ul className="flex items-center">
            <li className="mr-20">
              <a href="/workpage">U qanday ishlaydi</a>
            </li>
            <li className="mr-20">
              <a href="/featurepage">Xususiyat</a>
            </li>
            <li className="mr-8">
              <button className="bg-main border-2 border-main inline-block box-border text-white rounded-lg hover:bg-white hover:text-main hover:border-2 hover:border-main duration-100">
                <Link to="/loginpage" className="w-full block py-3 px-6">
                  Kirish
                </Link>
              </button>
            </li>
            <li className="mr-2">
              <button className="bg-transparent border-2 box-border inline-block border-main text-black  rounded-lg hover:bg-main hover:text-white duration-100">
                <Link to="/register-page" className="w-full block py-3 px-6">
                  Ro'yxatdan o'tish
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
