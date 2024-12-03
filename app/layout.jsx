import "../styles/globals.css";

// export const metadata = {
//   title: "vconnect",
//   description:
//     "Welcome to Our Virtual Connect Platform, We're excited to have you here!",
// };

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* <Provider> */}
          {/* <div className="bg-white">
            <div className="bg-white" />
          </div> */}

          {/* <main className=""> */}
            
            {children}
          {/* </main> */}
          
        {/* </Provider> */}
      </body>
    </html>
  );
};

export default RootLayout;
