import PropTypes from 'prop-types';
import Title from '../styles/tiitle/Title'

function Header(props) {
  const { data } = props;
  const showMe = () => {
    alert("hello  dog jane");
  };

  let comPonent = <></>;
  if (data) {
    comPonent = data.map((item) => {
      return (
        <div key={item.id}>
          <h1>
            {item.id} - {item.name}
          </h1>
        </div>
      );
    });
  }
  return (
    <div>
      <Title>REDDDD</Title>
      <h1 style={style.title}>Hello Header2</h1>
      <button onClick={showMe}>Click</button>
      {comPonent}
    </div>
  );
}

const style = {
  title:{
    color:"red"
  }
}

Header.propTypes = {
  data: PropTypes.array
};
export default Header;
