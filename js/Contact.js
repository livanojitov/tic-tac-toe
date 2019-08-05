const Contact = () => {

  const [contact] = useState({
    author:   'Livan Ojito Villanueva',
    email :   'livanojito@gmail.com',
    github:   'https://github.com/livanojitov',
    linkedin: 'https://ca.linkedin.com/in/livan-ojito-villanueva'
  });

  return (
    <div className="contact">
      <p>
          <span>Author : </span><span className="me">{contact.author}</span>
      </p>
      <p>
          <span>Email : </span><span className="me">{contact.email}</span>
      </p>                  
      <p>
          <span>Github: </span>
          <a target="_blank" href={contact.github}>{contact.github}</a>
      </p>        
      <p>
          <span>LinkedIn: </span>
          <a target="_blank" href={contact.linkedin}>{contact.linkedin}</a>
      </p>    
      <p>
          <span>Hire me! </span>
      </p>                  
    </div>
  )
} 