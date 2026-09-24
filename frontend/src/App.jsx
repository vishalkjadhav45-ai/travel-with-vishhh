import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "/api/travelers";

/* =========================================
   FEATURED PACKAGES
========================================= */

const packages = [
  {
    title: "Sahyadri Escape",
    places: "Kalsubai • Harishchandragad • Bhandardara",
    destination: "Kalsubai • Harishchandragad • Bhandardara",
    price: 2999,
    priceDisplay: "₹2,999",
    duration: "2 Days / 1 Night",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "Braj Spiritual Journey",
    places: "Mathura • Vrindavan • Barsana",
    destination: "Mathura • Vrindavan • Barsana",
    price: 4000,
    priceDisplay: "₹4,000",
    duration: "3 Days / 2 Nights",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "Banaras Diaries",
    places: "Varanasi • Ganga Ghats • Sarnath",
    destination: "Varanasi • Ganga Ghats • Sarnath",
    price: 3000,
    priceDisplay: "₹3,000",
    duration: "2 Days / 1 Night",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
  },
];

/* =========================================
   APP
========================================= */

function App() {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  /* =========================================
     FORM STATE

     IMPORTANT:
     These keys MUST match server.js
  ========================================= */

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travelers: 1,
    packagePrice: 0,
    message: "",
  });

  /* =========================================
     GET TRAVELERS
  ========================================= */

  const fetchTravelers = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch travelers");
      }

      const data = await response.json();

      setTravelers(data);
      setMessage("");
    } catch (error) {
      console.error("Fetch travelers error:", error);

      setMessage(
        "Unable to connect to Travel With Vishhh API."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    fetchTravelers();
  }, []);

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =========================================
     PACKAGE SELECTION
  ========================================= */

  const handlePackageChange = (e) => {
    const selectedTitle = e.target.value;

    const selectedPackage = packages.find(
      (pkg) => pkg.title === selectedTitle
    );

    if (!selectedPackage) {
      setForm((current) => ({
        ...current,
        destination: "",
        packagePrice: 0,
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      destination: selectedPackage.destination,
      packagePrice: selectedPackage.price,
    }));
  };

  /* =========================================
     SUBMIT TRAVELER
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    /* Safety validation */

    if (!form.packagePrice || Number(form.packagePrice) <= 0) {
      setMessage("Please select a travel package.");
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        destination: form.destination.trim(),
        travelDate: form.travelDate,
        travelers: Number(form.travelers),
        packagePrice: Number(form.packagePrice),
        message: form.message.trim(),
      };

      console.log("Sending traveler data:", payload);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          "Unable to enroll traveler"
        );
      }

      /* Add new database record immediately */

      setTravelers((current) => [
        data,
        ...current,
      ]);

      /* Reset form */

      setForm({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
        travelers: 1,
        packagePrice: 0,
        message: "",
      });

      setMessage(
        "Your journey has been added successfully ✦"
      );

      /* Scroll to traveler database */

      setTimeout(() => {
        document
          .getElementById("travelers")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);

    } catch (error) {
      console.error("Create traveler error:", error);

      setMessage(
        error.message ||
        "Something went wrong while adding traveler."
      );
    }
  };

  /* =========================================
     DELETE TRAVELER
  ========================================= */

  const deleteTraveler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this traveler?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setTravelers((current) =>
        current.filter(
          (traveler) =>
            traveler._id !== id
        )
      );

      setMessage(
        "Traveler entry removed successfully."
      );

    } catch (error) {
      console.error(
        "Delete traveler error:",
        error
      );

      setMessage(
        "Unable to delete traveler."
      );
    }
  };

  /* =========================================
     SEARCH
  ========================================= */

  const filteredTravelers = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    if (!keyword) {
      return travelers;
    }

    return travelers.filter((traveler) =>
      [
        traveler.name,
        traveler.email,
        traveler.phone,
        traveler.destination,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(keyword)
        )
    );
  }, [travelers, search]);

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="app">

      {/* =====================================
          NAVBAR
      ===================================== */}

      <nav className="navbar">

        <div className="brand">

          <div className="brand-icon">
            📷
          </div>

          <div>
            <strong>
              Travel With Vishhh
            </strong>

            <span>
              Explore life in frames.
            </span>
          </div>

        </div>

        <div className="nav-links">
          <a href="#home">
            Home
          </a>

          <a href="#packages">
            Journeys
          </a>

          <a href="#enroll">
            Enroll
          </a>

          <a href="#travelers">
            Travelers
          </a>
        </div>

        <a
          href="#enroll"
          className="nav-button"
        >
          Start Journey
        </a>

      </nav>


      {/* =====================================
          HERO
      ===================================== */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-tag">
            ✦ CURATED TRAVEL EXPERIENCES
          </div>

          <h1>
            Collect moments.
            <br />
            <span>Not things.</span>
          </h1>

          <p>
            Discover beautiful places, chase
            unforgettable sunsets, and turn every
            journey into a story worth remembering.
          </p>

          <div className="hero-actions">

            <a
              href="#packages"
              className="primary-button"
            >
              Explore Journeys →
            </a>

            <a
              href="#enroll"
              className="secondary-button"
            >
              Plan My Trip
            </a>

          </div>

        </div>

        <div className="hero-bottom">

          <span>
            INDIA • 2026
          </span>

          <span>
            TRAVEL • EXPERIENCE • REMEMBER
          </span>

        </div>

      </section>


      {/* =====================================
          INTRO
      ===================================== */}

      <section className="intro">

        <div>

          <span className="small-label">
            THE JOURNEY STARTS HERE
          </span>

          <h2>
            Go somewhere
            <br />
            <i>you've never been.</i>
          </h2>

        </div>

        <p>
          From mountain trails to ancient cities,
          we create simple, memorable travel
          experiences for people who would rather
          experience the world than just watch it.
        </p>

      </section>


      {/* =====================================
          PACKAGES
      ===================================== */}

      <section
        className="packages-section"
        id="packages"
      >

        <div className="section-head">

          <div>

            <span className="small-label">
              FEATURED JOURNEYS
            </span>

            <h2>
              Where will we go next?
            </h2>

          </div>

          <span className="section-count">
            {packages.length} EXPERIENCES
          </span>

        </div>


        <div className="package-grid">

          {packages.map((pkg) => (

            <article
              className="package-card"
              key={pkg.title}
            >

              <div
                className="package-image"
                style={{
                  backgroundImage:
                    `url(${pkg.image})`,
                }}
              >

                <span className="package-duration">
                  {pkg.duration}
                </span>

              </div>


              <div className="package-content">

                <span className="package-label">
                  SIGNATURE JOURNEY
                </span>

                <h3>
                  {pkg.title}
                </h3>

                <p>
                  {pkg.places}
                </p>

                <div className="package-bottom">

                  <div>

                    <span>
                      FROM
                    </span>

                    <strong>
                      {pkg.priceDisplay}
                    </strong>

                  </div>

                  <a href="#enroll">
                    Explore →
                  </a>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================
          ENROLLMENT
      ===================================== */}

      <section
        className="enroll-section"
        id="enroll"
      >

        <div className="enroll-info">

          <span className="small-label">
            YOUR NEXT CHAPTER
          </span>

          <h2>
            Tell us where
            <br />
            you're going.
          </h2>

          <p>
            Fill in your travel details and become
            part of the Travel With Vishhh community.
          </p>

          <div className="quote">
            <span>“</span>
            Life is short and the world is wide.
          </div>

        </div>


        {/* =================================
            FORM
        ================================= */}

        <form
          className="travel-form"
          onSubmit={handleSubmit}
        >

          <div className="form-heading">

            <span>
              TRAVELER ENROLLMENT
            </span>

            <strong>
              01
            </strong>

          </div>


          {/* NAME + EMAIL */}

          <div className="form-row">

            <div className="input-group">

              <label>
                YOUR NAME
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Vishal Jadhav"
                required
              />

            </div>


            <div className="input-group">

              <label>
                EMAIL
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

            </div>

          </div>


          {/* PHONE + PACKAGE */}

          <div className="form-row">

            <div className="input-group">

              <label>
                PHONE
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />

            </div>


            <div className="input-group">

              <label>
                TRAVEL PACKAGE
              </label>

              <select
                value={
                  packages.find(
                    (pkg) =>
                      pkg.price ===
                      Number(form.packagePrice)
                  )?.title || ""
                }
                onChange={handlePackageChange}
                required
              >

                <option value="">
                  Select your journey
                </option>

                {packages.map((pkg) => (

                  <option
                    key={pkg.title}
                    value={pkg.title}
                  >
                    {pkg.title} — {pkg.priceDisplay}
                  </option>

                ))}

              </select>

            </div>

          </div>


          {/* DATE + TRAVELERS */}

          <div className="form-row">

            <div className="input-group">

              <label>
                TRAVEL DATE
              </label>

              <input
                type="date"
                name="travelDate"
                value={form.travelDate}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                TRAVELERS
              </label>

              <input
                type="number"
                name="travelers"
                min="1"
                value={form.travelers}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* MESSAGE */}

          <div className="input-group">

            <label>
              MESSAGE
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us anything about your journey..."
              rows="3"
            />

          </div>


          {/* PRICE */}

          {form.packagePrice > 0 && (
            <div className="selected-package">

              <span>
                SELECTED PACKAGE
              </span>

              <strong>
                ₹{Number(form.packagePrice).toLocaleString("en-IN")}
              </strong>

            </div>
          )}


          {/* SUBMIT */}

          <button
            className="submit-button"
            type="submit"
          >
            Reserve My Journey
            <span>↗</span>
          </button>


          {/* RESPONSE MESSAGE */}

          {message && (
            <div className="form-message">
              {message}
            </div>
          )}

        </form>

      </section>


      {/* =====================================
          TRAVELER DATABASE
      ===================================== */}

      <section
        className="travelers-section"
        id="travelers"
      >

        <div className="section-head">

          <div>

            <span className="small-label">
              TRAVEL COMMUNITY
            </span>

            <h2>
              Who's coming along?
            </h2>

          </div>

          <div className="traveler-count">
            {travelers.length} TRAVELERS
          </div>

        </div>


        {/* SEARCH */}

        <div className="search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search by name, email, phone or destination..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* DATABASE */}

        {loading ? (

          <div className="empty-state">
            Loading traveler database...
          </div>

        ) : filteredTravelers.length === 0 ? (

          <div className="empty-state">
            No traveler records found.
          </div>

        ) : (

          <div className="traveler-list">

            {filteredTravelers.map(
              (traveler, index) => (

                <div
                  className="traveler-row"
                  key={traveler._id}
                >

                  <div className="traveler-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>


                  <div className="traveler-avatar">

                    {traveler.name
                      ?.charAt(0)
                      .toUpperCase() || "?"}

                  </div>


                  <div className="traveler-main">

                    <strong>
                      {traveler.name}
                    </strong>

                    <span>
                      {traveler.email}
                    </span>

                  </div>


                  <div className="traveler-detail">

                    <small>
                      DESTINATION
                    </small>

                    <strong>
                      {traveler.destination || "—"}
                    </strong>

                  </div>


                  <div className="traveler-detail">

                    <small>
                      TRAVELERS
                    </small>

                    <strong>
                      {traveler.travelers || 1}
                    </strong>

                  </div>


                  <div className="traveler-detail">

                    <small>
                      PACKAGE
                    </small>

                    <strong>
                      ₹
                      {Number(
                        traveler.packagePrice || 0
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>


                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      deleteTraveler(
                        traveler._id
                      )
                    }
                    title="Delete traveler"
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer>

        <div className="footer-brand">

          <div className="brand-icon">
            📷
          </div>

          <div>

            <strong>
              Travel With Vishhh
            </strong>

            <span>
              Explore life in frames.
            </span>

          </div>

        </div>


        <div className="footer-right">

          <span>
            Built for explorers.
          </span>

          <span>
            React • Node.js • MongoDB
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;
