import React from 'react';
import PropTypes from 'prop-types';
import { Image, Popup, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [
  (x - window.innerWidth) / 5,
  (y - window.innerHeight) / 5
];
const trans0 = (x, y) => `translate3d(${x / 12}px,${y / 12}px,0)`;
const trans1 = (x, y) => `translate3d(${x / 7 + -200}px,${y / 7 - -200}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 6 - 95}px,${y / 6 - 340}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 9 + 40}px,${y / 9 - 160}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 8 + -150}px,${y / 8 - -100}px,0)`;
const trans5 = (x, y) => `translate3d(${x / 8 + -170}px,${y / 8 - -90}px,0)`;
const trans6 = (x, y) => `translate3d(${x / 8 + -190}px,${y / 8 - -110}px,0)`;

const Card1 = ({ selectId, cardId, themeName }) => {
  const [p, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 5, tension: 550, friction: 140 }
  }));

  const pStyle = {
    fontSize: '1.2em'
  };

  const data = selectId({ name: 'space', id: cardId });

  return (
    <div
      className="discovery--space"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <animated.div
        className="discovery--space--pic1"
        style={{ transform: p.xy.interpolate(trans0) }}
      />
      <animated.div
        className="discovery--space--pic2"
        style={{ transform: p.xy.interpolate(trans1) }}
      >
        <Popup
          header={data.pics[1].name}
          content={data.pics[1].desc}
          trigger={
            <Image
              className="discovery--space--pic2"
              src={data.pics[1].image_url}
            />
          }
          style={pStyle}
        />
      </animated.div>

      <animated.div
        className="discovery--space--pic3"
        style={{ transform: p.xy.interpolate(trans2) }}
      >
        <Popup
          header="Soleil"
          content="Hello"
          trigger={
            <Image
              className="discovery--space--pic3"
              src="https://image.flaticon.com/icons/svg/1164/1164954.svg"
            />
          }
          style={pStyle}
        />
      </animated.div>
      <animated.div
        className="discovery--space--pic4"
        style={{ transform: p.xy.interpolate(trans3) }}
      >
        <Popup
          header={data.pics[2].name}
          content={data.pics[2].desc}
          trigger={
            <Image
              className="discovery--space--pic4"
              src={data.pics[2].image_url}
            />
          }
          style={pStyle}
        />
      </animated.div>

      <animated.div
        className="discovery--space--pic4-1"
        style={{ transform: p.xy.interpolate(trans4) }}
      >
        <Popup
          header={data.pics[3].name}
          content={data.pics[3].desc}
          trigger={
            <Image
              className="discovery--space--pic4-1"
              src={data.pics[3].image_url}
            />
          }
          style={pStyle}
        />
      </animated.div>
      <animated.div
        className="discovery--space--pic4-2"
        style={{ transform: p.xy.interpolate(trans5) }}
      >
        <Popup
          header={data.pics[3].name}
          content={data.pics[3].desc}
          trigger={
            <Image
              className="discovery--space--pic4-1"
              src={data.pics[3].image_url}
            />
          }
          style={pStyle}
        />
      </animated.div>
      <animated.div
        className="discovery--space--pic4-3"
        style={{ transform: p.xy.interpolate(trans6) }}
      >
        <Popup
          header={data.pics[3].name}
          content={data.pics[3].desc}
          trigger={
            <Image
              className="discovery--space--pic4-1"
              src={data.pics[3].image_url}
            />
          }
          style={pStyle}
        />
      </animated.div>

      <Link to="/discovery">
        <Button
          className="back-button"
          icon="left chevron"
          style={{ color: '#0b0900', backgroundColor: '#ffdd57' }}
        >
          Retour
        </Button>
      </Link>
      <Link to={`/discovery/${themeName}&card=${cardId + 1}`}>
        <Button
          className="forward-button"
          icon="right chevron"
          style={{ color: '#0b0900', backgroundColor: '#ffdd57' }}
        >
          Continer
        </Button>
      </Link>
    </div>
  );
};

Card1.propTypes = {
  selectId: PropTypes.func.isRequired,
  cardId: PropTypes.number.isRequired
};

export default Card1;
