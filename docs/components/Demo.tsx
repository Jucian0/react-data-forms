import Iframe from 'react-iframe';

const styles = {
  width: '100%',
  padding: '10px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  h1: {
    fontSize: '3em',
    fontFamily: "'Roboto',sans-serif",
    color: '$primary',
    padding: '20px',
  },

  div: {
    width: '100%',
    padding: '2px',
    iframe: {
      width: '100%',
      height: 700,
      border: 'none',
      borderRadius: '8px',
      boxShadow: '$sm',
      position: 'relative',
    },
  },
};

export default function Demo(props) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="w-full">
        <iframe className="w-full h-128" src={props.url} />
      </div>
    </div>
  );
}
