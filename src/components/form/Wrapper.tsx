import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Wrapper = (props: Props) => {
  return (
    <div className="bg-primary min-h-screen h-fit w-full grid place-items-center p-4">
      <div className="bg-white bg-opacity-50 p-12 h-fit w-fit rounded-md shadow-lg">
        {props.title && (
          <p className="text-center mb-4 text-3xl font-bold capitalize">
            {props.title}
          </p>
        )}
        {props.children}
      </div>
    </div>
  );
};
export default Wrapper;
