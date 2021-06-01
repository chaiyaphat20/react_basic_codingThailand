
import useHover from '../hooks/UseHover'
function Menu() {
  const [ hover,attrs ] = useHover()
  return (
    <div>
      <h1>Menu</h1>
      {
        hover ? <h3>Hover</h3> : null
      }
      <div
        onMouseOver={()=>attrs.mouseOver(2)}
        onMouseOut={attrs.mouseOut}
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      ></div>
    </div>
  );
}

export default Menu;
