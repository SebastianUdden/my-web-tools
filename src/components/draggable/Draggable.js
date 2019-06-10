import React from 'react';
import styled, { css } from 'styled-components';

export default class Draggable extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0,
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleTouchStart = (e, axis) => {
    if (!e.touches[0]) return;
    e.stopPropagation();
    e.preventDefault();
    window.addEventListener('touchmove', e => this.handleTouchMove(e, axis));
    window.addEventListener('touchend', this.handleTouchEnd);

    if (this.props.onDragStart) {
      // console.log(e.touches[0]);
      this.props.onDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }

    this.setState({
      originalX: e.touches[0].clientX,
      originalY: e.touches[0].clientY,
      isDragging: true,
    });
  };

  moveAlongAxis = (e, axis) => {
    const { onDrag } = this.props;

    this.setState(
      prevState => ({
        ['translate' + axis]:
          e.touches[0]['client' + axis] -
          prevState['original' + axis] +
          prevState['lastTranslate' + axis],
      }),
      () => {
        if (onDrag) {
          onDrag({
            [axis.toLowerCase()]: this.state['translate' + axis],
            ['lastTranslate' + axis]: this.state['lastTranslate' + axis],
            ['original' + axis]: this.state['original' + axis],
          });
        }
      }
    );
  };

  handleTouchMove = (e, axis) => {
    if (!e.touches[0]) return;
    e.stopPropagation();
    e.preventDefault();
    const { isDragging } = this.state;

    if (!isDragging) {
      return;
    }

    switch (axis) {
      case 'X':
        this.moveAlongAxis(e, 'X');
        break;
      case 'Y':
        this.moveAlongAxis(e, 'Y');
        break;
      default:
        this.moveAlongAxis(e, 'X');
        this.moveAlongAxis(e, 'Y');
        return;
    }
  };

  handleTouchEnd = e => {
    e.stopPropagation();
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        lastTranslateX: 0,
        lastTranslateY: 0,
        isDragging: false,
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd({
            x: this.state.lastTranslateX,
            y: this.state.lastTranslateY,
          });
        }
      }
    );
  };

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(
      prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY,
      }),
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY,
          });
        }
      }
    );
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false,
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  };

  render() {
    const { children, draggableStyle } = this.props;
    const { translateX, translateY, isDragging } = this.state;
    return (
      <Container
        onMouseDown={this.handleMouseDown}
        onTouchStart={e => {
          this.handleTouchStart(e, 'Y');
        }}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
        style={draggableStyle}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div.attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
})`
  padding: 0 !important;
  margin: 0;
  touch-action: none;
  cursor: grab;
  transition: color 0.3s ease-out;
  transition: opacity 0.3s ease-out;

  ${({ isDragging }) =>
    isDragging
      ? css`
          position: relative;
          z-index: 2500;
          color: orange;
          opacity: 0.8;
          cursor: grabbing;
        `
      : css`
          z-index: 40;
        `};
`;
