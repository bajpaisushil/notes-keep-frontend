import React from "react";
import "./home.css";
import notesImage from '../images/notes-keeping.png';

function Home() {
  return (
    <div className="home-page">
      <div className="home-about-notes">
        <p className="home-about-text">
          Our Notes Keeping App is a powerful and user-friendly tool designed to
          help you organize and manage your notes in a seamless and efficient
          way. Whether you're a student, professional, or simply someone who
          loves jotting down thoughts, our app is here to simplify your life and
          keep your ideas well-organized.
          </p>
          <p className="home-about-text">
            With an intuitive and elegant user interface, creating, editing, and
            deleting notes has never been easier. You can add labels to your
            notes for quick categorization, making it effortless to find what
            you need when you need it. Plus, our app allows you to search for
            notes based on titles, content, labels, and even date and time!
          </p>
          <p className="home-about-text">
            Privacy and security are our top priorities. Your data is encrypted
            and stored securely, ensuring that only you have access to your
            precious notes. We do not compromise on your data's safety, and our
            app adheres to the highest industry standards.
          </p>
          <p className="home-about-text">
            Whether you're using a desktop computer, tablet, or mobile phone,
            our app is fully responsive, providing a seamless experience across
            all devices.
          </p>
      </div>
      <div className="home-about-image">
        <img className="notes-keeping-image" src={notesImage} alt="Notes Keeping App Image" />
      </div>
    </div>
  );
}

export default Home;
