import React, { useContext } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import "./Contact.scss";

const Contact = () => {
  const { dictionary } = useContext(DictionaryContext);

  const contact = {
    author: "Livan Ojito Villanueva",
    email: "livanojito@gmail.com",
    github: "https://github.com/lojito",
    linkedin: "https://ca.linkedin.com/in/lov",
  };

  return dictionary ? (
    <div className="contact" data-testid="contact">
      <p>
        <span data-testid="authorDescription">{dictionary.AUTHOR} </span>
        <span data-testid="author" className="me">
          {contact.author}
        </span>
      </p>
      <p>
        <span data-testid="emailDescription">{dictionary.EMAIL} </span>
        <span data-testid="email" className="me">
          {contact.email}
        </span>
      </p>
      <p>
        <span data-testid="githubDescription">{dictionary.GITHUB} </span>
        <a
          data-testid="github"
          target="_blank"
          href={contact.github}
          rel="noopener noreferrer"
        >
          {contact.github}
        </a>
      </p>
      <p>
        <span data-testid="linkedinDescription">{dictionary.LINKEDIN} </span>
        <a
          data-testid="linkedin"
          target="_blank"
          href={contact.linkedin}
          rel="noopener noreferrer"
        >
          {contact.linkedin}
        </a>
      </p>
    </div>
  ) : (
    <div className="loading" data-testid="loading">
      Loading the Contact page...
    </div>
  );
};

export default Contact;
