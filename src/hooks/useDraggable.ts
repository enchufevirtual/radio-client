import { MutableRefObject, useEffect } from 'react';

export const useDraggable = (targetRef: MutableRefObject<HTMLDivElement>, targetAllowed: string): void => {

  useEffect(() => {
    const target: HTMLElement = targetRef.current;

    let prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        docuLeft: number,
        docuTop: number;

    const handleMove = (e: MouseEvent | TouchEvent) => {

      e.preventDefault();
      const moveEvent = e.type === "mousemove" ? (e as MouseEvent) : (e as TouchEvent).touches[0];
      newX = prevX - moveEvent.clientX;
      newY = prevY - moveEvent.clientY;

      docuLeft = parseFloat(window.getComputedStyle(target).getPropertyValue("left").split("px")[0]);
      docuTop = parseFloat(window.getComputedStyle(target).getPropertyValue("top").split("px")[0]);

      target.style.left = `${docuLeft - newX}px`;
      target.style.top = `${docuTop - newY}px`;

      prevX = moveEvent.clientX;
      prevY = moveEvent.clientY;
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {

      const startEvent = e.type === "mousedown" ? (e as MouseEvent) : (e as TouchEvent).touches[0];
      prevX = startEvent.clientX;
      prevY = startEvent.clientY;

      const targetElement = startEvent.target as HTMLElement;
      if (!targetElement.classList.contains(targetAllowed)) {
        return;
      }

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove, { passive: false });
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };

    target.addEventListener("mousedown", handleDown);
    target.addEventListener("touchstart", handleDown, { passive: false });
    target.addEventListener("mouseup", handleUp);
    target.addEventListener("touchend", handleUp);

    return () => {
      target.removeEventListener("mousedown", handleDown);
      target.removeEventListener("touchstart", handleDown);
      target.removeEventListener("mouseup", handleUp);
      target.removeEventListener("touchend", handleUp);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [targetRef.current]);
};
