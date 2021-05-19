import styles from './Header.module.css';
import withMousePosition from './withMousePosition';


function Header(props) {

  const paralaxStyle = {
    transform: `translate(
      ${props.mouseX / -20}px,
      ${props.mouseY / 90}px
    )`
  };

  return (
    <header className={`${styles.header} relative`}>
      <div className={styles.headerImage} style={paralaxStyle}>
      </div>
        <span className='mr-3 py-1 px-2 text-light'>X: {props.mouseX}</span>
        <span className='mr-3 py-1 px-2 text-light'>Y: {props.mouseY}</span>  
        {props.children}
        
    {/* ewentualnie tak: {[styles.header, 'container'].join(' ')} */}
    </header>
  );
}

export default withMousePosition(Header);