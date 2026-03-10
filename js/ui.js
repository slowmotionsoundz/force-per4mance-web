/**
 * FORCE PER4MANCE — UI Utilities
 * Handle dynamic loading of shared components.
 */
import { monitorAuthState, logoutUser } from './auth.js';

/**
 * Inject a component into a container
 * @param {string} componentPath - Path to the .html file
 * @param {string} containerId - ID of the element to inject into
 * @param {function} callback - Optional callback after load
 */
export async function loadComponent(componentPath, containerId, callback) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Could not load ${componentPath}`);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    if (callback) callback();
  } catch (error) {
    console.error("Component Loading Error:", error);
  }
}

/**
 * Initialize global UI elements
 */
export function initGlobalUI() {
  loadComponent('components/navbar.html', 'navbar-container', () => {
    console.log("Navbar Loaded");

    const loginBtn = document.getElementById('navLoginBtn');
    const mobileLoginBtn = document.querySelector('.nav-mobile a[href="login.html"]');
    const navElement = document.getElementById('navbar');

    // Scroll Logic for Dynamic Navbar
    if (navElement) {
      window.addEventListener('scroll', () => {
        navElement.classList.toggle('scrolled', window.scrollY > 40);
      });
      // Initial check in case page is already scrolled
      navElement.classList.toggle('scrolled', window.scrollY > 40);
    }

    if (loginBtn || mobileLoginBtn) {
      monitorAuthState((user) => {
        if (user) {
          // User is signed in
          if (loginBtn) {
            loginBtn.textContent = 'Sign Out';
            loginBtn.href = '#';
            loginBtn.onclick = (e) => {
              e.preventDefault();
              logoutUser();
            };
          }
          if (mobileLoginBtn) {
            mobileLoginBtn.textContent = 'Sign Out';
            mobileLoginBtn.href = '#';
            mobileLoginBtn.onclick = (e) => {
              e.preventDefault();
              logoutUser();
            };
          }
        } else {
          // User is signed out
          if (loginBtn) {
            loginBtn.textContent = 'Sign In';
            loginBtn.href = 'login.html';
            loginBtn.onclick = null;
          }
          if (mobileLoginBtn) {
            mobileLoginBtn.textContent = 'Sign In';
            mobileLoginBtn.href = 'login.html';
            mobileLoginBtn.onclick = null;
          }
        }
      });
    }

    // Dispatch custom event if needed
    document.dispatchEvent(new CustomEvent('navbarLoaded'));
  });

  loadComponent('components/footer.html', 'footer-container');
}
