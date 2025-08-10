import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import "./2DPhysics.css";

export default function TwoDPhysics({
  shape,
  amount = 20,
  colors = [
    "#ff6f61",
    "#6fa8dc",
    "#93c47d",
    "#ffd966",
    "#c27ba0",
    "#76a5af",
    "#a4c2f4",
  ],
}) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const parent = sceneRef.current.parentElement;
    let width = parent.clientWidth;
    let height = parent.clientHeight;

    const engine = Matter.Engine.create();
    const world = engine.world;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    // create boundaries
    const createBoundaries = () => [
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }),
      Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
        isStatic: true,
      }),
    ];

    let boundaries = createBoundaries();
    Matter.World.add(world, boundaries);

    const createShape = () => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height - 100) + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];

      let bodyType = shape?.toLowerCase();

      if (bodyType === "random") {
        const types = ["circle", "rectangle", "polygon"];
        bodyType = types[Math.floor(Math.random() * types.length)];
      }

      switch (bodyType) {
        case "circle":
          return Matter.Bodies.circle(x, y, 30 + Math.random() * 20, {
            restitution: 0.8,
            render: { fillStyle: color },
          });
        case "rectangle":
          return Matter.Bodies.rectangle(
            x,
            y,
            60 + Math.random() * 40,
            40 + Math.random() * 20,
            {
              restitution: 0.8,
              render: { fillStyle: color },
            }
          );
        case "polygon":
          return Matter.Bodies.polygon(
            x,
            y,
            3 + Math.floor(Math.random() * 5),
            30 + Math.random() * 20,
            {
              restitution: 0.8,
              render: { fillStyle: color },
            }
          );
        default:
          return Matter.Bodies.circle(x, y, 30 + Math.random() * 20, {
            restitution: 0.8,
            render: { fillStyle: color },
          });
      }
    };

    // spawn the shapes
    const bodies = [];
    for (let i = 0; i < amount; i++) {
      bodies.push(createShape());
    }
    Matter.World.add(world, bodies);

    // handle mouse drag
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.6,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);
    render.mouse = mouse;

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // handle resize
    const handleResize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;

      Matter.World.remove(world, boundaries);
      boundaries = createBoundaries();
      Matter.World.add(world, boundaries);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [shape]);

  return <div ref={sceneRef} className="main-2d-physics-container" />;
}
