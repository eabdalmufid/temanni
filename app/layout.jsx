import "@/styles/globals.css";
import Provider from "@/components/SessionProvider";

export const metadata = {
  title: {
    template: '%s | Temanni',
    default: 'Temanni - Find a Community',
  },
  description: "Find your partner to learn together",
};

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
