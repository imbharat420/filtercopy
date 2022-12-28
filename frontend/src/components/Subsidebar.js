import styled from 'styled-components';
const SubSidebar = () => {
  return (
    <Wrapper className="effects-zone">
      <ul>
        <li className="zone-item">
          <img
            src="https://i.ibb.co/0nQqQZp/Artistic.png"
            alt="Artistic"
            border="0"
          />
          <span>Filters</span>
        </li>
        <li className="zone-item">
          <img
            src="https://i.ibb.co/0nQqQZp/Artistic.png"
            alt="Artistic"
            border="0"
          />
          <span>Filters</span>
        </li>
        <li className="zone-item">
          <img
            src="https://i.ibb.co/0nQqQZp/Artistic.png"
            alt="Artistic"
            border="0"
          />
          <span>Filters</span>
        </li>
        <li className="zone-item">
          <img
            src="https://i.ibb.co/0nQqQZp/Artistic.png"
            alt="Artistic"
            border="0"
          />
          <span>Filters</span>
        </li>
        <li className="zone-item">
          <img
            src="https://i.ibb.co/0nQqQZp/Artistic.png"
            alt="Artistic"
            border="0"
          />
          <span>Filters</span>
        </li>
        <li className="zone-item">
          <img
            src="https://i.ibb.co/0nQqQZp/Artistic.png"
            alt="Artistic"
            border="0"
          />
          <span>Filters</span>
        </li>
      </ul>
    </Wrapper>
  );
};

export default SubSidebar;
const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #5e6268;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 1.7rem;
      img {
        // position: absolute;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 80px;
        width: 128px;
        top: 7px;
        left: 10px;
        margin: 0;
        margin-bottom: 1rem;
      }
      span {
        font-size: 0.8rem;
        color: #fff;
      }
    }
  }
`;
