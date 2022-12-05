import s from "./Layout.module.scss"
import Link from "next/link"
import logo from "./logo.svg"
import { useSession, signOut } from "next-auth/react"

const Layout = ({ children }) => {
  const session = useSession()

  const signedIn = session.status === "authenticated"

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="app-header">
        <div className="app-header__container container">
          <Link href="/">
            <svg width="435" height="201" viewBox="0 0 435 201" fill="none">
              <path
                d="M16.08 154.346L57.38 83.0161C57.4075 82.9684 57.4467 82.9287 57.494 82.9007C57.5413 82.8727 57.595 82.8573 57.65 82.856C57.7067 82.8555 57.7624 82.8701 57.8116 82.8982C57.8608 82.9263 57.9017 82.967 57.93 83.0161L95.12 147.256L67.68 194.656C46.4709 187.341 28.311 173.154 16.08 154.346M184.08 154.046L143 83.0161C142.972 82.967 142.931 82.9263 142.882 82.8982C142.832 82.8701 142.777 82.8555 142.72 82.856C142.665 82.8573 142.611 82.8727 142.564 82.9007C142.517 82.9287 142.477 82.9684 142.45 83.0161L105.26 147.256L132.64 194.556C153.837 187.161 171.954 172.891 184.11 154.016M76.35 197.186C92.0025 200.986 108.34 200.959 123.98 197.106L100.18 156.016L76.35 197.186ZM200 100.016C199.989 115.741 196.275 131.243 189.16 145.266L143.75 66.8161C143.648 66.6399 143.503 66.4929 143.328 66.3895C143.152 66.2862 142.953 66.2298 142.75 66.2261C142.547 66.2317 142.349 66.2889 142.174 66.3921C141.999 66.4952 141.853 66.6411 141.75 66.8161L100.26 138.496L58.69 66.8161C58.5841 66.6356 58.4329 66.486 58.2514 66.382C58.0698 66.278 57.8642 66.2233 57.655 66.2233C57.4458 66.2233 57.2402 66.278 57.0586 66.382C56.8771 66.486 56.7259 66.6356 56.62 66.8161L11 145.596C4.10234 132.132 0.34921 117.279 0.0232233 102.155C-0.302764 87.0306 2.80689 72.0295 9.11802 58.2811C15.4292 44.5327 24.7773 32.3953 36.4585 22.7829C48.1397 13.1705 61.8496 6.3336 76.5557 2.78701C91.2619 -0.759588 106.581 -0.923433 121.36 2.30781C136.138 5.53905 149.991 12.0812 161.875 21.4415C173.76 30.8019 183.365 42.7365 189.969 56.3468C196.573 69.9571 200.002 84.8883 200 100.016M116.88 51.956C116.934 49.7385 116.545 47.5325 115.734 45.4679C114.923 43.4033 113.707 41.5218 112.157 39.9342C110.608 38.3465 108.757 37.0849 106.713 36.2235C104.669 35.3621 102.473 34.9183 100.255 34.9183C98.0368 34.9183 95.841 35.3621 93.7969 36.2235C91.7528 37.0849 89.9017 38.3465 88.3525 39.9342C86.8034 41.5218 85.5875 43.4033 84.7764 45.4679C83.9654 47.5325 83.5756 49.7385 83.63 51.956C83.63 60.166 96.87 82.3261 99.53 86.6861C99.6044 86.813 99.7112 86.9178 99.8395 86.9898C99.9678 87.0619 100.113 87.0985 100.26 87.0961C100.406 87.0978 100.549 87.0607 100.676 86.9887C100.802 86.9166 100.907 86.8122 100.98 86.6861C103.64 82.3261 116.88 60.166 116.88 51.956M100.26 43.306C97.9667 43.3087 95.7681 44.2209 94.1464 45.8425C92.5248 47.4641 91.6126 49.6627 91.61 51.956C91.61 53.956 94.32 61.1361 100.26 72.0461C106.2 61.1361 108.9 54.016 108.9 51.956C108.897 49.6645 107.987 47.4674 106.367 45.846C104.748 44.2247 102.552 43.3113 100.26 43.306"
                fill="white"
              />
              <path
                d="M248.42 5.21605H238V91.576H280.4V82.306H248.4L248.42 5.21605ZM375.63 47.606L357.08 36.016C355.479 34.9946 354.158 33.5899 353.236 31.9292C352.314 30.2685 351.822 28.4041 351.802 26.5049C351.783 24.6057 352.237 22.7316 353.125 21.0524C354.012 19.3731 355.304 17.9417 356.884 16.8878C358.464 15.8338 360.282 15.1905 362.174 15.0163C364.065 14.842 365.97 15.1422 367.716 15.8896C369.462 16.6371 370.994 17.8082 372.173 19.297C373.353 20.7858 374.142 22.5453 374.47 24.416L384.9 22.676C382.58 10.506 371.57 2.97605 359.4 4.67605C353.704 5.81179 348.662 9.09017 345.313 13.8349C341.963 18.5797 340.563 24.4289 341.4 30.176C341.925 33.2277 343.07 36.1393 344.764 38.7313C346.458 41.3232 348.666 43.5404 351.25 45.246L369.8 56.836C371.52 58.0464 372.973 59.5964 374.07 61.3903C375.167 63.1842 375.886 65.1839 376.18 67.266C376.391 70.7499 375.233 74.1783 372.953 76.8211C370.673 79.4638 367.452 81.112 363.975 81.4145C360.498 81.7169 357.04 80.6498 354.338 78.4404C351.636 76.231 349.904 73.0539 349.51 69.586L339.08 70.166C339.347 73.325 340.233 76.4005 341.688 79.217C343.143 82.0334 345.139 84.5357 347.561 86.5809C349.983 88.6261 352.785 90.1742 355.805 91.1368C358.826 92.0994 362.006 92.4576 365.165 92.191C368.324 91.9245 371.399 91.0383 374.216 89.5831C377.032 88.128 379.535 86.1323 381.58 83.7101C383.625 81.2879 385.173 78.4865 386.136 75.466C387.098 72.4455 387.457 69.265 387.19 66.106C386.918 62.3045 385.719 58.6274 383.699 55.3956C381.679 52.1639 378.898 49.4758 375.6 47.566M328.5 24.466C330.24 40.3452 330.24 56.3669 328.5 72.246C327.973 77.3031 325.729 82.027 322.143 85.6313C318.557 89.2357 313.844 91.503 308.79 92.056C296.04 93.806 285.03 84.486 283.29 72.246C281.55 56.3669 281.55 40.3452 283.29 24.466C283.827 19.4157 286.075 14.7008 289.66 11.1032C293.245 7.50557 297.952 5.24136 303 4.68605C315.75 2.94605 326.76 12.266 328.5 24.506M318.1 25.766C317.1 19.636 311.94 15.016 306.1 15.016C305.467 15.0172 304.834 15.0707 304.21 15.176C301.513 15.4599 298.997 16.6655 297.086 18.5893C295.175 20.5132 293.986 23.0374 293.72 25.736C291.995 40.7834 291.995 55.9787 293.72 71.026C294.72 77.156 299.89 81.776 305.72 81.776C306.353 81.7749 306.985 81.7214 307.61 81.616C310.312 81.327 312.831 80.1145 314.742 78.1833C316.653 76.252 317.839 73.7205 318.1 71.016C319.83 55.9689 319.83 40.7732 318.1 25.726M391.56 15.616H408.13V91.616H418.53V15.616H435V5.18605H391.56V15.616ZM341.41 127.756C343.15 143.639 343.15 159.664 341.41 175.546C340.881 180.602 338.637 185.325 335.051 188.929C331.465 192.533 326.754 194.801 321.7 195.356C308.95 197.106 297.94 187.786 296.2 175.546C294.46 159.664 294.46 143.639 296.2 127.756C296.729 122.701 298.971 117.98 302.555 114.376C306.139 110.772 310.848 108.503 315.9 107.946C328.66 106.196 339.67 115.526 341.41 127.756M331 129.016C330 122.886 324.84 118.266 319 118.266C318.367 118.267 317.734 118.32 317.11 118.426C314.41 118.713 311.893 119.924 309.983 121.854C308.074 123.784 306.889 126.314 306.63 129.016C304.905 144.063 304.905 159.259 306.63 174.306C307.63 180.426 312.8 185.046 318.63 185.046C319.263 185.044 319.895 184.994 320.52 184.896C323.218 184.603 325.732 183.391 327.641 181.462C329.549 179.534 330.736 177.006 331 174.306C332.721 159.258 332.721 144.064 331 129.016ZM349.52 108.436V118.866H366.09V194.866H376.48V118.866H393V108.446L349.52 108.436ZM281.29 127.946C282.229 135.805 282.727 143.711 282.78 151.626C282.726 159.541 282.229 167.447 281.29 175.306C279.55 187.366 271.93 194.836 258.36 194.836H238.01V108.436H258.36C271.93 108.436 279.55 115.906 281.29 127.966M272.34 151.646C272.281 144.144 271.79 136.652 270.87 129.206C270.424 126.316 268.98 123.674 266.787 121.739C264.595 119.804 261.793 118.699 258.87 118.616H248.39V184.676H258.88C261.803 184.593 264.605 183.488 266.797 181.553C268.99 179.618 270.434 176.976 270.88 174.086C271.8 166.64 272.291 159.148 272.35 151.646"
                fill="white"
              />
            </svg>
          </Link>

          <nav className="app-header__nav">
            <Link href="/">Our races</Link>
            <Link href="/">Past races</Link>
            {signedIn ? (
              <>
                <span>Firstname Surname</span>
                <a href="#" onClick={() => signOut()}>
                  Sign out
                </a>
              </>
            ) : (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </nav>
        </div>
      </header>

      <main id="main-content">
        <div className="container">{children}</div>
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner container">
          <div className="app-footer__statement">
            Lost Dot Ltd run self supported ultra distance cycling races
          </div>
          <nav>
            <Link href="#">Contact us</Link>
            <Link href="#">Our inclusion & climate commitment</Link>
            <Link href="#">Press releases</Link>
            <Link href="#">Sponsors</Link>
            <Link href="#">Privacy</Link>
          </nav>

          <nav>
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Komoot</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default Layout
