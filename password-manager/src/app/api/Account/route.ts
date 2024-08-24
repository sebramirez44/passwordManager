import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log("AAAAAAAAA");
    return NextResponse.json({username: "seb", userid: "123"});
}