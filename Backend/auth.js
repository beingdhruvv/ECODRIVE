// ================= AUTH UTILITIES =================
const API_BASE_URL = "https://ecodrive-backend.onrender.com/"; // 🔴 CHANGE THIS

const authUtils = {
  // ---------------- CHECK AUTH ----------------
  checkAuth() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return {
        isLoggedIn: !!user,
        user
      };
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("user");
      return { isLoggedIn: false, user: null };
    }
  },

  // ---------------- LOGIN ----------------
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!data.success) {
        return { success: false, error: data.error || "Invalid credentials" };
      }

      const userData = {
        id: data.user.id,
        fullname: data.user.fullname,
        email: data.user.email,
        created_at: data.user.created_at
      };

      localStorage.setItem("user", JSON.stringify(userData));
      this.updateNavigation();

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Server error during login" };
    }
  },

  // ---------------- SIGNUP ----------------
  async signup(name, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: name,
          email,
          password
        })
      });

      const data = await response.json();
      return data.success
        ? { success: true }
        : { success: false, error: data.error || "Signup failed" };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "Server error during signup" };
    }
  },

  // ---------------- LOGOUT ----------------
  logout() {
    localStorage.removeItem("user");
    this.updateNavigation();
    window.location.replace("/login.html");
  },

  // ---------------- NAV UPDATE ----------------
  updateNavigation() {
    const { isLoggedIn } = this.checkAuth();
    const navMenu = document.querySelector(".nav-menu");

    if (!navMenu) return;

    const loginItem = navMenu.querySelector('a[href="/login.html"]')?.parentElement;
    const profileItem = navMenu.querySelector('a[href="/profile.html"]')?.parentElement;

    if (isLoggedIn) {
      if (loginItem) loginItem.style.display = "none";
      if (!profileItem) {
        const li = document.createElement("li");
        li.innerHTML = '<a href="/profile.html">Profile</a>';
        navMenu.appendChild(li);
      }
    } else {
      if (loginItem) loginItem.style.display = "block";
      if (profileItem) profileItem.remove();
    }
  }
};

// Init on load
document.addEventListener("DOMContentLoaded", () => {
  authUtils.updateNavigation();
});

window.authUtils = authUtils;
