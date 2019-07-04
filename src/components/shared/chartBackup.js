const [changeCounter, setChangeCounter] = useState(0);

const checkForChanges = id => {
  const element = document.getElementById(id);
  let timerID = undefined;
  setChangeCounter(0);
  const pressHoldEvent = new CustomEvent('pressHold');

  const pressHoldDuration = 10;

  const pressingDown = e => {
    // Start the timer
    requestAnimationFrame(timer);

    e.preventDefault();

    console.log('Pressing!');
  };

  const notPressingDown = e => {
    // Stop the timer
    cancelAnimationFrame(timerID);
    setChangeCounter(0);

    console.log('Not pressing!');
    // element.removeEventListener('mousedown', pressingDown);
    // element.removeEventListener('mouseup', notPressingDown);
    element.removeEventListener('touchstart', pressingDown);
    element.removeEventListener('touchend', notPressingDown);
    // element.removeEventListener('mouseleave', notPressingDown);
    // element.removeEventListener('pressHold', doSomething);
  };

  const timer = () => {
    if (changeCounter < pressHoldDuration) {
      console.log('Timer tick!');
      timerID = requestAnimationFrame(timer);
      setChangeCounter(changeCounter + 1);
    } else {
      console.log('Press threshold reached!');
      element.dispatchEvent(pressHoldEvent);
    }
  };

  const doSomething = e => {
    console.log('pressHold event fired!');
  };

  // Listening for the mouse and touch events
  element.addEventListener('mousedown', pressingDown, false);
  element.addEventListener('mouseup', notPressingDown, false);
  element.addEventListener('mouseleave', notPressingDown, false);

  element.addEventListener('touchstart', pressingDown, false);
  element.addEventListener('touchend', notPressingDown, false);

  // Listening for our custom pressHold event
  element.addEventListener('pressHold', doSomething, false);
};

useEffect(() => {
  checkForChanges('one-down');
  setSelectedPoint(oneDown(selectedPoint));
}, [changeCounter]);
