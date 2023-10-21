import * as colors from '../img/colors.jsx'

export function Button(props) {
    return ( 
        <>
            <button style={buttonStyle}>{props.text}</button>
            
        </>
     );
}
//TODO: исправить ошибку в пропсах, но и так все воркает
const buttonStyle = {
    borderRadius: '2rem',
    backgroundColor: colors.YELLOW,
    border: 'none',
    height: '3.5rem',
    width: '11rem',
    maxWidht: '20rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    fontSize: '1.2rem',
    paddingRight: '-1rem',
    cursor: 'pointer',
    outline: 'none',
  };

export function SmallButton(props) {
    return ( 
        <>
            <button style={smallButtonStyle}>{props.text}</button>
        </>
     );
}

const smallButtonStyle = {
    borderRadius: '2rem',
    backgroundColor: colors.YELLOW,
    border: 'none',
    height: '3.5rem',
    width: '11rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    paddingRight: '-1rem',
    outline: 'none',
  };

  export function ButtonReg({text, ...props}) {
    return ( 
        <>
            <button {...props} style={buttonStyleR}>{text}</button>
            
        </>
     );
}
const buttonStyleR = {
    borderRadius: '2rem',
    backgroundColor: colors.YELLOW,
    border: 'none',
    height: '3.5rem',
    width: '20rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    fontSize: '1.2rem',
    paddingRight: '-1rem',
    cursor: 'pointer',
    outline: 'none',
  };