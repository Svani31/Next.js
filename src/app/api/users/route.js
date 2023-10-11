import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb"
import Users from "../../../../models/users";


export async function POST(request){
    const {username,email,password} = await request.json()
    await connectMongoDB();
    await console.log(username,email,password)
    await Users.create({username,email,password})
    return NextResponse.json({Users},{message:"User Created"},{status:201})
}

export async function GET(request,{params}){
    // const id = params
    await connectMongoDB();
    // const userById = await Users.findOne({_id:id})
    const userById = await Users.find()
    return NextResponse.json({userById},{message:"userCreadedSucces"},{status:200})
}

// export async function DELETE(request){
//     const id = request.nextUrl.searchParams.get("id")
//     await connectMongoDB();
//     await Users.findByIdAndDelete(id)
//     return NextResponse.json({message:"Deleted"},{status:200})
    
// }