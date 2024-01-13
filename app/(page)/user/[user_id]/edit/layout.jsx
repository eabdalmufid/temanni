// Metadata
export async function generateMetadata() {
    return {
      title: `Edit Profile`,
      description: "Edit User Profile",
    };
};

const Layout = async ({ children }) => {
    return (
        <>
            {children}
        </>
    )
};

export default Layout;