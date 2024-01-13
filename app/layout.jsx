import "@/styles/globals.css";
import Provider from "@/components/SessionProvider";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
