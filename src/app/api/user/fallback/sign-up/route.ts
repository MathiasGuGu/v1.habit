import { NextRequest } from "next/server";

const handler = (req: NextRequest) => {
    return {
        status: 200,
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        message: "Hello from the API!",
        }),
    };
};

export { handler as GET, handler as POST };