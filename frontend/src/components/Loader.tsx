const Loader = () => {
  return (
    <div
      className="m-5 w-12 aspect-square rounded-full animate-spin relative"
      style={{
        background: `
          radial-gradient(farthest-side,#ffa516 94%,#0000) top/0.5rem 0.5rem no-repeat,
          conic-gradient(#0000 30%,#ffa516)
        `,
        WebkitMask:
          "radial-gradient(farthest-side,#0000 calc(100% - 0.5rem),#000 0)",
      }}
    ></div>
  );
};

export default Loader;
