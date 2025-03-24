"use client";
import Button from "@/components/button";
import HeaderTerms from "@/components/header-small";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type CanvasPosition = {
  x: number;
  y: number;
};

const TermsAndConditions = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState<CanvasPosition | null>(
    null
  );
  const [lastPos, setLastPos] = useState<CanvasPosition | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);

  function preventTouch(ev: TouchEvent) {
    if (canvasRef.current && ev.target === canvasRef.current) {
      ev.preventDefault();
    }
  }

  function preventMouse(ev: MouseEvent) {
    if (canvasRef.current && ev.target === canvasRef.current) {
      ev.preventDefault();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("touchstart", preventTouch, {
      passive: false,
    });
    canvas.addEventListener("touchend", preventTouch, {
      passive: false,
    });
    canvas.addEventListener("touchmove", preventTouch, {
      passive: false,
    });
    canvas.addEventListener("mousedown", preventMouse, {
      passive: false,
    });
    canvas.addEventListener("mouseup", preventMouse, {
      passive: false,
    });
    canvas.addEventListener("mousemove", preventMouse, {
      passive: false,
    });

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 4;
    }

    return () => {
      if (!canvas) return;
      canvas.removeEventListener("touchstart", preventTouch);
      canvas.removeEventListener("touchend", preventTouch);
      canvas.removeEventListener("touchmove", preventTouch);
      canvas.removeEventListener("mousedown", preventMouse);
      canvas.removeEventListener("mouseup", preventMouse);
      canvas.removeEventListener("mousemove", preventMouse);
    };
  }, []);

  const renderCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      currentPosition: CanvasPosition,
      lastPos: CanvasPosition
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx || !drawing) return;
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(currentPosition.x, currentPosition.y);
      ctx.stroke();
    },
    [drawing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!drawing || !canvas || !currentPosition || !lastPos) {
      if (drawing && currentPosition && !lastPos) {
        setLastPos(currentPosition);
      }
      return;
    }
    renderCanvas(canvas, currentPosition, lastPos);
    setLastPos({ ...currentPosition });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition, drawing, renderCanvas]);

  function getCanvasPoint(pos: CanvasPosition | null): CanvasPosition | null {
    if (!pos || !canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }

  function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function startDrawing(pos: CanvasPosition | null) {
    setDrawing(true);
    if (pos) setCurrentPosition(pos);
  }

  function stopDrawing() {
    setDrawing(false);
    setCurrentPosition(null);
    setLastPos(null);
  }

  function draw(pos: CanvasPosition | null) {
    if (pos) setCurrentPosition(pos);
  }

  function mousePosition(
    ev: React.MouseEvent<HTMLCanvasElement>
  ): CanvasPosition {
    return { x: ev.clientX, y: ev.clientY };
  }

  function touchPosition(
    ev: React.TouchEvent<HTMLCanvasElement>
  ): CanvasPosition | null {
    if (ev.touches.length) {
      return { x: ev.touches[0].pageX, y: ev.touches[0].pageY };
    }
    return null;
  }

  return (
    <div className="relative h-screen bg-white flex flex-col">
      <HeaderTerms />
      <div className="flex-1 overflow-y-auto p-6 box-border">
        <h1 className="text-2xl font-[550] leading-[100%]">
          Terms and Conditions
        </h1>
        <div className="flex flex-col gap-10 mt-3">
          <p className="text-primary text-base leading-[164%] font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-primary text-base leading-[164%] font-normal">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="text-primary text-base leading-[164%] font-normal">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full bg-white shadow-top-only px-6 pb-6">
        <div className="w-full flex items-end justify-end">
          <canvas
            ref={canvasRef}
            className="h-28 w-full border-b border-gray-300"
            onMouseDown={(ev) =>
              startDrawing(getCanvasPoint(mousePosition(ev)))
            }
            onMouseUp={stopDrawing}
            onMouseMove={(ev) => draw(getCanvasPoint(mousePosition(ev)))}
            onTouchStart={(ev) =>
              startDrawing(getCanvasPoint(touchPosition(ev)))
            }
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            onTouchMove={(ev) => draw(getCanvasPoint(touchPosition(ev)))}
          />
          {canvasRef.current && (
            <p
              className="text-primary font-medium text-lg cursor-pointer self-end"
              onClick={() =>
                canvasRef.current && clearCanvas(canvasRef.current)
              }
            >
              Clear
            </p>
          )}
        </div>
        <div className="w-full flex flex-col items-center mt-4">
          <Button
            text="Accept & sign"
            onClick={() => router.push("/data-plans")}
          />
        </div>
        <p className="mt-4 text-primary font-[550] leading-[26px] text-base cursor-pointer">
          I disagree
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
