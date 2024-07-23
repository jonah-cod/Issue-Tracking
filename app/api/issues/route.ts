import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title:z.string().min(1).max(255),
    description:z.string().min(1)
})
export async function POST (request:NextRequest){
    let body = await request.json()
    let validatedIssue = createIssueSchema.safeParse(body)
    if(!validatedIssue.success){
        let errors = validatedIssue.error.errors.map(error=>({path:error.path, message:error.message}))
        return NextResponse.json(errors, {status:400})
    }

   try {
    const newIssue = await prisma.issue.create({
        data:{title: body.title, description:body.description}
    })

    return NextResponse.json(newIssue, {status:201})
   } catch (error) {
    console.log(error)
   }

}