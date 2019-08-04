const Navigation = () => {
  return (
    <div className="nav">
      <img src="./images/logo.jpg"/>
      <ul>
        <li><NavLink exact to="/">Home           </NavLink></li>   
        <li><NavLink exact to="/history">History </NavLink></li>     
        <li><NavLink exact to="/about">About     </NavLink></li>  
        <li><NavLink exact to="/contact">Contact </NavLink></li>                   
      </ul>
    </div>
  )
}