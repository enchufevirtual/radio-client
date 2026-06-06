import { MutableRefObject, useEffect, useRef } from 'react';

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  startLeft: number;
  startTop: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  rafId: number | null;
}

const getPointerPosition = (event: MouseEvent | TouchEvent | PointerEvent) => {
  if ('touches' in event) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  return { x: event.clientX, y: event.clientY };
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const useDraggable = (
  targetRef: MutableRefObject<HTMLDivElement | null>,
  targetAllowed: string,
  parentRef?: MutableRefObject<HTMLDivElement | null>
): void => {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
    rafId: null,
  });

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return undefined;

    const getContainer = () =>
      parentRef?.current || (target.offsetParent as HTMLElement) || target.parentElement || document.documentElement;

    const updateBounds = (container: HTMLElement) => {
      const containerRect = container.getBoundingClientRect();
      dragStateRef.current.minX = 0;
      dragStateRef.current.minY = 0;
      dragStateRef.current.maxX = Math.max(0, containerRect.width - target.offsetWidth);
      dragStateRef.current.maxY = Math.max(0, containerRect.height - target.offsetHeight);
    };

    const setTargetPosition = (left: number, top: number) => {
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
    };

    const handleMove = (e: MouseEvent | TouchEvent | PointerEvent) => {
      if (!dragStateRef.current.isDragging) return;

      if ('touches' in e && e.touches.length === 0) return;
      if (e.cancelable) e.preventDefault();

      const { x, y } = getPointerPosition(e);
      const { startX, startY, startLeft, startTop, minX, maxX, minY, maxY } = dragStateRef.current;
      const deltaX = x - startX;
      const deltaY = y - startY;
      const nextLeft = clamp(startLeft + deltaX, minX, maxX);
      const nextTop = clamp(startTop + deltaY, minY, maxY);

      if (dragStateRef.current.rafId !== null) {
        cancelAnimationFrame(dragStateRef.current.rafId);
      }

      dragStateRef.current.rafId = requestAnimationFrame(() => {
        setTargetPosition(nextLeft, nextTop);
      });
    };

    const releasePointerCapture = (event: PointerEvent) => {
      if (target.releasePointerCapture && event.pointerId !== undefined) {
        try {
          target.releasePointerCapture(event.pointerId);
        } catch {
          // ignore unsupported pointer release
        }
      }
    };

    const endDrag = (event?: MouseEvent | TouchEvent | PointerEvent) => {
      dragStateRef.current.isDragging = false;
      if (dragStateRef.current.rafId !== null) {
        cancelAnimationFrame(dragStateRef.current.rafId);
        dragStateRef.current.rafId = null;
      }
      document.body.style.userSelect = '';
      target.style.cursor = '';
      target.style.touchAction = '';
      if (event && 'pointerId' in event) {
        releasePointerCapture(event as PointerEvent);
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('pointermove', handleMove as EventListener);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchend', endDrag);
      document.removeEventListener('pointerup', endDrag);
      document.removeEventListener('pointercancel', endDrag);
    };

    const handleDown = (event: MouseEvent | TouchEvent | PointerEvent) => {
      const isMouseEvent = event.type === 'mousedown';
      const isPointerEvent = event.type === 'pointerdown';
      if (isMouseEvent || isPointerEvent) {
        const mouseEvent = event as MouseEvent | PointerEvent;
        if (mouseEvent.button !== 0) return;
      }

      if ('touches' in event && event.touches.length > 1) return;

      const rawTarget = (event.target as HTMLElement) || null;
      const targetElement = rawTarget?.closest(`.${targetAllowed}`) as HTMLElement | null;
      if (!targetElement) return;

      const isTouchEvent = 'touches' in event;
      const isPointerTouchEvent =
        !isTouchEvent && 'pointerType' in event && event.pointerType === 'touch';

      if ((isTouchEvent || isPointerTouchEvent) && event.cancelable) {
        event.preventDefault();
      }

      const container = getContainer();
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      updateBounds(container);

      const initialLeft = clamp(targetRect.left - containerRect.left, dragStateRef.current.minX, dragStateRef.current.maxX);
      const initialTop = clamp(targetRect.top - containerRect.top, dragStateRef.current.minY, dragStateRef.current.maxY);

      target.style.transform = 'none';
      setTargetPosition(initialLeft, initialTop);
      dragStateRef.current.isDragging = true;
      dragStateRef.current.startX = getPointerPosition(event).x;
      dragStateRef.current.startY = getPointerPosition(event).y;
      dragStateRef.current.startLeft = initialLeft;
      dragStateRef.current.startTop = initialTop;

      document.body.style.userSelect = 'none';
      target.style.cursor = 'grabbing';
      target.style.touchAction = 'none';

      if (window.PointerEvent && 'pointerId' in event) {
        try {
          target.setPointerCapture(event.pointerId);
        } catch {
          // ignore unsupported capture
        }
        document.addEventListener('pointermove', handleMove as EventListener, {
          passive: false,
        });
        document.addEventListener('pointerup', endDrag);
        document.addEventListener('pointercancel', endDrag);
      } else {
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
      }
    };

    if (window.PointerEvent) {
      target.addEventListener('pointerdown', handleDown as EventListener, {
        passive: false,
      });
    } else {
      target.addEventListener('mousedown', handleDown as EventListener);
      target.addEventListener('touchstart', handleDown as EventListener, { passive: false });
    }

    const handleResize = () => {
      const container = getContainer();
      updateBounds(container);
      const left = parseFloat(target.style.left || '0');
      const top = parseFloat(target.style.top || '0');
      setTargetPosition(clamp(left, dragStateRef.current.minX, dragStateRef.current.maxX), clamp(top, dragStateRef.current.minY, dragStateRef.current.maxY));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (window.PointerEvent) {
        target.removeEventListener('pointerdown', handleDown as EventListener);
      } else {
        target.removeEventListener('mousedown', handleDown as EventListener);
        target.removeEventListener('touchstart', handleDown as EventListener);
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('pointermove', handleMove as EventListener);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchend', endDrag);
      document.removeEventListener('pointerup', endDrag);
      document.removeEventListener('pointercancel', endDrag);
      window.removeEventListener('resize', handleResize);
    };
  }, [targetRef, parentRef, targetAllowed]);
};
