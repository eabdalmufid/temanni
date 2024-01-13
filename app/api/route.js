export async function GET(req) {
    try {
        return Response.json({ success: true, message: "Halo!" }, { status: 200 });
    } catch (err) {
        console.log("Error: " + err.message);
        return Response.json({ success: false, message: "Something Went Wrong!" }, { status: 500 });
    };
};