import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [step, setStep] = useState("role"); // Tracks current step: 'role', 'login', or 'register'
  const [accountType, setAccountType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Handle role selection
  const handleRoleSelect = (role) => {
    setAccountType(role);
    setStep("login");
  };

  // Reset fields when going back
  const handleBack = () => {
    setStep("role");
    setAccountType("");
    setUsername("");
    setPassword("");
    setEmail("");
    setAge("");
    setDob("");
    setRole("");
    setError("");
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.accountType === accountType
    );

    if (user) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials or account type!");
    }
  };

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (users.some((u) => u.username === username || u.email === email)) {
      setError("User already exists!");
      return;
    }

    if (!username || !password || !email || !age || !dob || !role) {
      setError("All fields are required!");
      return;
    }

    const newUser = { username, password, email, age, dob, role, accountType };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registration successful! Please log in.");
    setStep("login");
    setUsername("");
    setPassword("");
    setEmail("");
    setAge("");
    setDob("");
    setRole("");
    setError("");
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep("role");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="auth-page">
          {step === "role" && (
            <div className="role-select">
              <h1>Select Your Role</h1>
              <div className="role-options">
                <button onClick={() => handleRoleSelect("cashier")}>
                  Cashier
                </button>
                <button onClick={() => handleRoleSelect("manager")}>
                  Manager
                </button>
              </div>
            </div>
          )}
          {(step === "login" || step === "register") && (
            <div className="auth-container">
              <div className="auth-content">
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
                <div className="auth-form">
                  {step === "login" && (
                    <>
                      <h1>Login as {accountType}</h1>
                      <form onSubmit={handleLogin}>
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button type="submit">Login</button>
                      </form>
                      <p>
                        Don't have an account?{" "}
                        <button onClick={() => setStep("register")}>
                          Register
                        </button>
                      </p>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </>
                  )}
                  {step === "register" && (
                    <>
                      <h1>Register as {accountType}</h1>
                      <form onSubmit={handleRegister}>
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date of Birth"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Role in Company"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          required
                        />
                        <button type="submit">Register</button>
                      </form>
                      <p>
                        Already have an account?{" "}
                        <button onClick={() => setStep("login")}>Login</button>
                      </p>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="dashboard">
          <h1>Welcome, {username}!</h1>
          <h2>You are logged in as: {accountType.toUpperCase()}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
